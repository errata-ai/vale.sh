import { highlightAll } from '$lib/server/highlight';
import type { PageServerLoad } from './$types';

// Prerendered, so every snippet on the page is highlighted once per build.
// The Views and templates are the ones the docs walk through, unchanged.
export const load: PageServerLoad = async () => {
	const html = await highlightAll({
		openapiView: {
			lang: 'yaml',
			code: `# <StylesPath>/config/views/OpenAPI.yml
engine: dasel
scopes:
  - name: title
    expr: info.title

  - name: description
    expr: search(has("description")).map(description)
    type: md`
		},
		openapiIni: {
			lang: 'ini',
			code: `[*.{json,yml,yaml}]
BasedOnStyles = Vale, House
View = OpenAPI`
		},
		notebookView: {
			lang: 'yaml',
			code: `# <StylesPath>/config/views/Notebook.yml
engine: dasel
scopes:
  - name: cell
    expr: cells.all().filter(equal(cell_type,markdown)).source
    join: ""
    type: md`
		},
		notebookIni: {
			lang: 'ini',
			code: `[*.ipynb]
BasedOnStyles = Vale
View = Notebook`
		},
		commitView: {
			lang: 'yaml',
			code: `# <StylesPath>/config/views/Commit.yml
engine: textfsm
template: |
  Value Subject (.+)
  Value List Body (.*)
  Value List Trailer ((?:BREAKING CHANGE|[A-Z][\\w-]+): .+)

  Start
    ^\${Subject} -> Body

  Body
    ^# -> Next
    ^\${Trailer}
    ^\${Body}
scopes:
  - name: subject
    expr: Subject

  - name: body
    expr: Body
    type: md

  - name: trailer
    expr: Trailer`
		},
		commitIni: {
			lang: 'ini',
			code: `[COMMIT_EDITMSG]
BasedOnStyles = Vale, House
View = Commit`
		},
		subjectRule: {
			lang: 'yaml',
			code: `# <StylesPath>/House/Subject.yml
extends: occurrence
message: "Keep the subject line to twelve words."
level: error
scope: subject
max: 12
token: \\b\\w+\\b`
		},
		transcriptView: {
			lang: 'yaml',
			code: `engine: textfsm
template: |
  Value List Assistant (.*)
  Value List User (.*)

  Start
    ^assistant: \${Assistant} -> Assistant
    ^user: \${User} -> User

  Assistant
    ^(?:user|assistant): -> Continue.Record
    ^assistant: \${Assistant}
    ^user: \${User} -> User
    ^\${Assistant}

  User
    ^(?:user|assistant): -> Continue.Record
    ^user: \${User}
    ^assistant: \${Assistant} -> Assistant
    ^\${User}
scopes:
  - name: assistant
    expr: Assistant
    type: md`
		},
		transcriptOut: {
			lang: 'console',
			code: ` transcript.txt
 3:6   error  'worth noting' hedges, and this is the model's turn.  House.Assistant
 3:42  error  Did you really mean 'occurence'?                      Vale.Spelling`
		},
		docstringView: {
			lang: 'yaml',
			code: `engine: tree-sitter
scopes:
  - expr: (comment)+ @comment

  - name: docstring
    expr: |
      ((function_definition
        body: (block . (expression_statement (string) @docstring)))
      (#offset! @docstring 0 3 0 -3))
    type: md`
		}
	});
	return { html };
};
