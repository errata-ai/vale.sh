---
title: --output
lead: An output style ("line", "JSON", or a template file).
label: flag
toc: false
---

The `--output` option specifies the format that Vale will use to report its
alerts. There are three built-in styles: "CLI" (the default), "line", and
"JSON".

```shell
vale --output=JSON somefile.md
```

In addition to the three provided output styles, Vale also supports custom
output styles powered by Go's [`text/template`][1] package.

To use a custom format, pass the path to a template file through the
`--output` option:

```shell
vale --output='path/to/my/template.tmpl' somefile.md
```

Template files have access to the following data structures:

```go
type ProcessedFile struct {
    Alerts []core.Alert
    Path   string
}

type Data struct {
    Files       []ProcessedFile
    LintedTotal int
}
```

Where `core.Alert` has the same information as Vale's `--output=JSON` object.

## Template functions

| Name          | Argument(s) | Description                                                                                                  |
|---------------|-------------|--------------------------------------------------------------------------------------------------------------|
| `red`         | `string`    | Returns the given `STRING` with an ANSI-formatted red foreground color.                                      |
| `blue`        | `string`    | Returns the given `STRING` with an ANSI-formatted blue foreground color.                                     |
| `yellow`      | `string`    | Returns the given `STRING` with an ANSI-formatted yellow foreground color.                                   |
| `underline`   | `string`    | Returns the given `STRING` with an ANSI-formatted underline.                                                 |
| `newTable`    | `bool`      | Creates a new [`tablewriter`][2] struct. newTable accepts one boolean value representing [`SetAutoWrapText`][2]. |
| `addRow`      | `[]string`  | Appends the given row to a table.                                                                            |
| `renderTable` | `Table`     | Prints the table-formatted output to `stdout`.                                                               |

## Examples

The following example re-implements Vale's default output style using a
template.

```go-text-template
{{- /* Keep track of our various counts */ -}}

{{- $e := 0 -}}
{{- $w := 0 -}}
{{- $s := 0 -}}
{{- $f := 0 -}}

{{- /* Range over the linted files */ -}}

{{- range .Files}}
{{$table := newTable true}}

{{- $f = add1 $f -}}
{{- .Path | underline | indent 1 -}}

{{- /* Range over the file's alerts */ -}}

{{- range .Alerts -}}

{{- $error := "" -}}
{{- if eq .Severity "error" -}}
    {{- $error = .Severity | red -}}
    {{- $e = add1 $e  -}}
{{- else if eq .Severity "warning" -}}
    {{- $error = .Severity | yellow -}}
    {{- $w = add1 $w -}}
{{- else -}}
    {{- $error = .Severity | blue -}}
    {{- $s = add1 $s -}}
{{- end}}

{{- $loc := printf "%d:%d" .Line (index .Span 0) -}}
{{- $row := list $loc $error .Message .Check | toStrings -}}

{{- $table = addRow $table $row -}}
{{end -}}

{{- $table = renderTable $table -}}
{{end}}
{{- $e}} {{"errors" | red}}, {{$w}} {{"warnings" | yellow}} and {{$s}} {{"suggestions" | blue}} in {{$f}} {{$f | int | plural "file" "files"}}.
```

[1]: https://golang.org/pkg/text/template/
[2]: https://github.com/olekukonko/tablewriter#ascii-table-writer
[3]: https://godoc.org/github.com/olekukonko/tablewriter#Table.SetAutoWrapText
