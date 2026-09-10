// The measurements behind the Commits announcement.
//
// `timings` is one commit message linted from a file the way a commit-msg
// hook does it, with hyperfine, 30 runs after 3 warm-ups, on an Apple
// Silicon Mac; each tool ran its default Conventional Commits check, and Vale
// ran the styles that match. The setup lives in the package repository under
// script/bench.
export const timings = [
	{
		label: 'committed',
		seconds: 0.0032,
		ours: false,
		detail: 'Rust. The header regex, subject and line lengths.'
	},
	{
		label: 'cocogitto',
		seconds: 0.0044,
		ours: false,
		detail: 'Rust. The header, parsed and nothing more.'
	},
	{
		label: 'Vale, Commits + Conventional + Commitlint',
		seconds: 0.0119,
		ours: true,
		detail: 'The View, the body as Markdown, 34 rules.'
	},
	{
		label: 'conventional-pre-commit',
		seconds: 0.0576,
		ours: false,
		detail: 'Python. The header regex.'
	},
	{
		label: 'Vale, with spelling on',
		seconds: 0.0846,
		ours: true,
		detail: 'The same, plus a dictionary and a pass over the body.'
	},
	{ label: 'gitlint', seconds: 0.1125, ours: false, detail: 'Python. 22 rules.' },
	{
		label: 'conform',
		seconds: 0.1461,
		ours: false,
		detail: 'Go. 7 checks, with a part-of-speech tagger.'
	},
	{ label: 'commitizen', seconds: 0.2102, ours: false, detail: 'Python. The header regex.' },
	{
		label: 'commitlint, config-conventional',
		seconds: 0.2278,
		ours: false,
		detail: 'Node. 12 rules.'
	}
];

// Rules per style, and the document each style transcribes.
export const styles = [
	{ name: 'Commitlint', rules: 22, from: "commitlint's rules reference" },
	{ name: 'Gitlint', rules: 10, from: "gitlint's built-in rules" },
	{ name: 'Kernel', rules: 8, from: 'Submitting patches' },
	{ name: 'Committed', rules: 8, from: "committed's defaults" },
	{ name: 'Conventional', rules: 7, from: 'the specification' },
	{ name: 'Conform', rules: 7, from: "conform's commit policy" },
	{ name: 'Angular', rules: 6, from: "Angular's guidelines" },
	{ name: 'SevenRules', rules: 5, from: 'How to Write a Git Commit Message' },
	{ name: 'Go', rules: 5, from: "Go's contribution guide" },
	{ name: 'Commits', rules: 4, from: 'the core, on by default' },
	{ name: 'Gitmoji', rules: 2, from: 'the gitmoji specification' },
	{ name: 'EmojiLog', rules: 2, from: 'the Emoji-Log README' },
	{ name: 'Commitizen', rules: 1, from: "cz check's schema" },
	{ name: 'Jira', rules: 1, from: 'an issue key' }
];
