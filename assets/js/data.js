var sources = [
{{- range $id, $post := .Site.Data.users.posts -}}
  {
    id: {{ $id }},
    title: "{{ $post.title }}",
    href: "{{ $post.url }}",
    year: "{{ $post.year }}",
    author: "{{ $post.author }}",
    {{ if $post.tags -}}
    tags: "{{ delimit $post.tags ", " }}"
    {{ else }}
    tags: ""
    {{- end }}
  },
{{ end -}}
];
