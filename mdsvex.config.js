import { escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import { h } from "hastscript";

const themes = [
    'github-light',
    'slack-dark',
];

const transformerMeta = () => ({
    name: "transformer-meta",
    pre() {
        const metaRaw = this.options.meta?.__raw;
        let meta = {};
        if (metaRaw) {
            const parts = metaRaw.split(/\s+/);
            for (const part of parts) {
                const [key, value] = part.split("=");
                if (key && value) {
                    meta[key] = value;
                }
            }
        }
        this.meta = meta;
    },
});

const transformerCreateCodeBlockHeader = () => ({
    name: "transformer-create-code-block-header",
    pre(node) {
        const preHeaderDiv = h("div", {
            class: "pre-header",
        });
        node.children.unshift(preHeaderDiv);
    },
});

const transformerCopyButton = () => ({
    name: "transformer-color-lines",
    pre(node) {
        const preHeaderDiv = node.children[0];

        let lang = this.options.lang;
        let code = this.source;

        if (lang === 'coffeescript') {
            // tengo is not supported by shiki
            lang = 'tengo';
        } else if (lang === 'properties') {
            lang = 'org';
        } else if (lang === 'git-rebase') {
            lang = 'gitignore';
        }

        if (lang === 'bash') {
            code = this.source
                .split('\n')
                .map(line => line.startsWith('$') ? line.slice(1).trim() : line)
                .join('\n');
        } else if (lang === 'powershell') {
            code = this.source
                .split('\n')
                .map(line => line.startsWith('>') ? line.slice(1).trim() : line)
                .join('\n');
        }

        let copyCodeButton = h(
            "div",
            {
                class: "wrapper-copy-code",
            },
            h(
                "div",
                {
                    class: "code-block-title",
                },
                lang
            ),
        );

        if (lang !== 'console') {
            // Add copy button; we don't show it for console output.
            copyCodeButton = h(
                "div",
                {
                    class: "wrapper-copy-code",
                },
                h(
                    "div",
                    {
                        class: "code-block-title",
                    },
                    lang
                ),
                h(
                    "button",
                    {
                        class: "copy-code",
                        "data-code": code,
                        onclick: `
                  navigator.clipboard.writeText(this.dataset.code);
                  this.textContent = 'Copied!';
                  setTimeout(() => this.textContent = 'Copy', 1000)
              `,
                    },
                    "Copy"
                )
            );
        }

        preHeaderDiv.children.push(copyCodeButton);
    },
});

const highlighter = await createHighlighter({
    themes: themes,
    langs: [
        // Commands and output
        'bash',
        'console',
        'powershell',

        // Data and configuration
        'json',
        'yaml',
        'ini',

        // Markup
        'markdown',
        'plaintext',
        'mdx',
        'adoc',
        'rst',
        'html',
        'properties', // Org

        // Programming languages
        'rust',
        'go',
        'coffeescript', // Tengo

        // Other
        'dockerfile',
        'regex',
        'git-rebase', // .gitignore
    ]
});


/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
    extensions: ['.md'],
    highlight: {
        highlighter: async (code, lang = 'text') => {
            const html = escapeSvelte(highlighter.codeToHtml(code, {
                lang,
                themes: {
                    light: themes[0],
                    dark: themes[1],
                },
                transformers: [
                    transformerMeta(),
                    transformerCreateCodeBlockHeader(),
                    transformerCopyButton(),
                ],
            }));
            return `{@html \`${html}\` }`;
        }
    },
    layout: './src/lib/mdsvex/wrapper.svelte'
};

export default mdsvexOptions;
