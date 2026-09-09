---
title: 'Linting commit messages'
description: 'A commit message has a subject, a body, and trailers, but no markup. A TextFSM View gives each part a name, so a rule can reach the subject the way it reaches a heading.'
date: '2026-09-09'
motif: 'commit'
imageAlt: 'A commit message with its subject, body, and trailers each highlighted as a separate scope, one carrying an alert at its exact column.'
---

A commit message has a shape everyone agrees on. The first line is the subject. A blank line follows, then the body. At the end come the trailers, `Signed-off-by:` and the like, one per line. Teams write rules about each part: the subject doesn't end with a period, the body explains why, a breaking change is called out in a footer.

None of that is markup. There's no `#` in front of the subject and no fence around the trailers, so to a linter the message is a run of lines that all look the same. A rule can say "no line ends with a period," but it can't say "the subject doesn't," and a rule about trailers has nothing to hold on to.

As of v3.21.0, Vale can read a plain-text file through a [TextFSM](https://github.com/google/textfsm/wiki/TextFSM) template and turn what it captures into named parts. This post sets that up for commit messages and wires it into a Git hook.

## The template

A [View](https://docs.vale.sh/topics/views) is a file in `<StylesPath>/config/views` that tells Vale how to read a file. For a commit message, the View is a template: three values to capture, and a small state machine that decides which line is which.

```yaml
# styles/config/views/Commit.yml
engine: textfsm
template: |
  Value Subject (.+)
  Value List Body (.*)
  Value List Trailer ((?:BREAKING CHANGE|[A-Z][\w-]+): .+)

  Start
    ^${Subject} -> Body

  Body
    ^# -> Next
    ^${Trailer}
    ^${Body}
scopes:
  - name: subject
    expr: Subject
  - name: body
    expr: Body
    type: md
  - name: trailer
    expr: Trailer
```

Reading starts in `Start`. Its one rule matches the first line, captures it as `Subject`, and moves to `Body`. From then on, each line is tried against the `Body` rules in order. A line starting with `#` is commentary Git adds and is read past without capturing anything. A line that looks like `Word: text`, or the `BREAKING CHANGE:` line a conventional commit ends with, is a trailer. Anything else is body.

`Body` and `Trailer` are `List` values, so they keep every line they capture rather than the last one. Consecutive body lines are joined into one block, and the body has `type: md`, so it's parsed as Markdown: a rule scoped to `body` sees paragraphs and inline code the way it does in a `.md` file.

Vale runs the template itself. Nothing needs installing, and the patterns use the same [regex dialect](https://docs.vale.sh/guides/regex) as every rule.

## The rules

With the parts named, a rule reaches one by its scope. A subject line doesn't end with a period:

```yaml
# styles/House/SubjectPeriod.yml
extends: existence
message: "A subject line doesn't end with '%s'."
level: error
scope: subject
raw:
  - '\.$'
```

Every commit is signed off. This is an [`occurrence`](https://docs.vale.sh/checks/occurrence) rule with a minimum: it counts `Signed-off-by:` lines in the trailers and reports when there are none. A trailer block holds several lines joined together, so the pattern needs `(?m)` for `^` to match at the start of each:

```yaml
# styles/House/SignedOff.yml
extends: occurrence
message: "Sign the commit off: git commit -s."
level: error
scope: trailer
token: '(?m)^Signed-off-by: '
min: 1
```

A subject marked with `!` needs a `BREAKING CHANGE:` trailer. That's a fact about two parts of the message at once, which is what a [`conditional`](https://docs.vale.sh/checks/conditional) is for. `first` is matched in the rule's own scope, and `in` names the scope `second` is looked for in:

```yaml
# styles/House/Breaking.yml
extends: conditional
message: "A '!' in the subject needs a 'BREAKING CHANGE:' trailer."
level: error
scope: subject
first: '^\w+(?:\([^)]*\))?!:'
second: '^BREAKING CHANGE: '
in: trailer
```

The alert lands on the subject's `!`, which is where the promise was made.

## Wiring it up

Sections in `.vale.ini` match by path, so a file with no extension is fine:

```ini
StylesPath = styles
MinAlertLevel = suggestion

[COMMIT_EDITMSG]
BasedOnStyles = Vale, House
View = Commit
```

`Vale` brings spelling along, and because the body has `type: md`, a code span in it is skipped the way it would be anywhere else.

Here is a message that gets most of it wrong:

```
fix!: report the shortfall at the scope that fell short.

Zero matches leave no occurence to point at, but the scope has a
position of its own.

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
```

```console
$ vale --path=COMMIT_EDITMSG < .git/COMMIT_EDITMSG

 COMMIT_EDITMSG
 1:1   error  A '!' in the subject needs a 'BREAKING CHANGE:' trailer.  House.Breaking
 1:1   error  Sign the commit off: git commit -s.                       House.SignedOff
 1:56  error  A subject line doesn't end with '.'.                      House.SubjectPeriod
 3:23  error  Did you really mean 'occurence'?                          Vale.Spelling
```

That's real output. Each alert points into the message at the line and column of the text it's about: the period at column 56 of the subject, the misspelling on line 3. The two trailer alerts sit on line 1 because there are no trailers to point at. A value the template never fills is still a scope, one empty value at the top of the file, and that's where a rule reports that it's missing. The comment lines Git adds were never seen by any rule.

Fix the four things and the message passes:

```
fix!: report the shortfall at the scope that fell short

Zero matches leave no occurrence to point at, but the scope has a
position of its own.

BREAKING CHANGE: the alert now lands on the scope's first line.
Signed-off-by: Jane Doe <jane@example.com>
```

## The hook

A `commit-msg` hook receives the path of the message file as its first argument. `--path` tells Vale which section applies, since the file it reads on stdin has no name of its own:

```sh
#!/bin/sh
# .git/hooks/commit-msg
vale --path=COMMIT_EDITMSG < "$1"
```

Vale exits non-zero on an error-level alert, so the commit stops with the alerts on screen. Because the message is read from stdin, the same command works in CI against `git log --format=%B -1`, or against a pull request's description.

## Seeing what a template captured

A template can be right and still surprise you, because a line no rule matches vanishes without a word. The quickest way to see what a scope holds is a rule that reports every line of it:

```yaml
extends: existence
message: "captured '%s'"
level: suggestion
scope: body
nonword: true
raw:
  - '(?m)^.+$'
```

Run with `--output=line`, and each captured line is listed at its position. Delete the rule once the template does what you expect.

The same approach reads anything with a shape and no markup: subtitle files, transcripts where only one side is yours to lint, changelogs, `.po` files. The [TextFSM guide](https://docs.vale.sh/guides/textfsm) walks through the template language and two more of those.
