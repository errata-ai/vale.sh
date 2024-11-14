import type { NavItem, SidebarNavItem } from "$lib/types/nav";

type DocsConfig = {
    mainNav: NavItem[];
    sidebarNav: SidebarNavItem[];
};

export const docsConfig: DocsConfig = {
    mainNav: [
        {
            title: "Docs",
            href: "/docs",
        },
        {
            title: "Studio",
            href: "https://studio.vale.sh",
            external: true,
        },
        {
            title: "Generator",
            href: "/generator",
        },
        {
            title: "Explorer",
            href: "/explorer",
        },
        {
            title: "Library",
            href: "/library",
        },
    ],
    sidebarNav: [
        {
            title: "Topics",
            items: [
                {
                    title: "Introduction",
                    href: "/docs",
                    items: [],
                },
                {
                    title: "Install",
                    href: "/docs/install",
                    items: [],
                },
                {
                    title: ".vale.ini",
                    href: "/docs/vale-ini",
                    items: [],
                },
                {
                    title: "CLI",
                    href: "/docs/cli",
                    items: [],
                },
                {
                    title: "Styles",
                    href: "/docs/styles",
                    items: [],
                },
                {
                    title: "Scopes",
                    href: "/docs/scopes",
                    items: [],
                },
                {
                    title: "Actions",
                    href: "/docs/actions",
                    items: [],
                },
                {
                    title: "Filters",
                    href: "/docs/filters",
                    items: [],
                },
                {
                    title: "Templates",
                    href: "/docs/templates",
                    items: [],
                },
            ],
        },
        {
            title: "Settings",
            items: [
                {
                    title: "StylesPath",
                    href: "/docs/keys/stylespath",
                    items: [],
                },
                {
                    title: "Packages",
                    href: "/docs/keys/packages",
                    items: [],
                },
                {
                    title: "Vocab",
                    href: "/docs/keys/vocab",
                    items: [],
                },
                {
                    title: "MinAlertLevel",
                    href: "/docs/keys/minalertlevel",
                    items: [],
                },
                {
                    title: "IgnoredScopes",
                    href: "/docs/keys/ignoredscopes",
                    items: [],
                },
                {
                    title: "IgnoredClasses",
                    href: "/docs/keys/ignoredclasses",
                    items: [],
                },
                {
                    title: "SkippedScopes",
                    href: "/docs/keys/skippedscopes",
                    items: [],
                },
                {
                    title: "BasedOnStyles",
                    href: "/docs/keys/basedonstyles",
                    items: [],
                },
                {
                    title: "BlockIgnores",
                    href: "/docs/keys/blockignores",
                    items: [],
                },
                {
                    title: "TokenIgnores",
                    href: "/docs/keys/tokenignores",
                    items: [],
                },
                {
                    title: "CommentDelimiters",
                    href: "/docs/keys/commentdelimiters",
                    items: [],
                },
                {
                    title: "Transform",
                    href: "/docs/keys/transform",
                    items: [],
                },
            ]
        },
        {
            title: "Checks",
            items: [
                {
                    title: "existence",
                    info: "Check for the presence of a specific regex pattern.",
                    href: "/docs/ext/existence",
                    items: [],
                },
                {
                    title: "substitution",
                    info: "Replace a regex pattern with a specific string.",
                    href: "/docs/ext/substitution",
                    items: [],
                },
                {
                    title: "occurrence",
                    info: "Ensure the presence of a regex pattern a specific number of times.",
                    href: "/docs/ext/occurrence",
                    items: [],
                },
                {
                    title: "repetition",
                    info: "Avoid repeating a regex pattern a specific number of times.",
                    href: "/docs/ext/repetition",
                    items: [],
                },
                {
                    title: "consistency",
                    info: "Ensure that a regex pattern is used consistently.",
                    href: "/docs/ext/consistency",
                    items: [],
                },
                {
                    title: "conditional",
                    info: "Check for the presence of a regex pattern based on a condition.",
                    href: "/docs/ext/conditional",
                    items: [],
                },
                {
                    title: "capitalization",
                    info: "Ensure that a regex pattern is capitalized in a specific way.",
                    href: "/docs/ext/capitalization",
                    items: [],
                },
                {
                    title: "metric",
                    info: "Check the readability (or other metrics) of your content using custom forumulas.",
                    href: "/docs/ext/metric",
                    items: [],
                },
                {
                    title: "spelling",
                    info: "Spell check using Hunspell-compatible dictionaries.",
                    href: "/docs/ext/spelling",
                    items: [],
                },
                {
                    title: "sequence",
                    info: "Ensure that a regex pattern is used in a specific order. Supports part-of-speech tagging.",
                    href: "/docs/ext/sequence",
                    items: [],
                },
                {
                    title: "script",
                    info: "Run a custom Tengo script to check your content.",
                    href: "/docs/ext/script",
                    items: [],
                },
            ],
        },
        {
            title: "Actions",
            items: [
                {
                    title: "suggest",
                    href: "/docs/actions/suggest",
                    items: [],
                },
                {
                    title: "replace",
                    href: "/docs/actions/replace",
                    items: [],
                },
                {
                    title: "remove",
                    href: "/docs/actions/remove",
                    items: [],
                },
                {
                    title: "edit",
                    href: "/docs/actions/edit",
                    items: [],
                },
            ],
        },
        {
            title: "Formats",
            items: [
                {
                    title: "Markdown",
                    href: "/docs/formats/markdown",
                    items: [],
                },
                {
                    title: "AsciiDoc",
                    href: "/docs/formats/asciidoc",
                    items: [],
                },
                {
                    title: "HTML",
                    href: "/docs/formats/html",
                    items: [],
                },
                {
                    title: "reStructuredText",
                    href: "/docs/formats/rst",
                    items: [],
                },
                {
                    title: "XML",
                    href: "/docs/formats/xml",
                    items: [],
                },
                {
                    title: "Org",
                    href: "/docs/formats/org",
                    items: [],
                },
                {
                    title: "DITA",
                    href: "/docs/formats/dita",
                    items: [],
                },
            ],
        },
        {
            title: "Intergrations",
            items: [
                {
                    title: "CircleCI",
                    href: "https://circleci.com/developer/orbs/orb/circleci/vale",
                    external: true,
                    items: [],
                },
                {
                    title: "Emacs",
                    href: "https://github.com/tpeacock19/flymake-vale",
                    external: true,
                    items: [],
                },
                {
                    title: "GitHub Actions",
                    href: "https://github.com/errata-ai/vale-action",
                    external: true,
                    items: [],
                },
                {
                    title: "Git Hooks",
                    href: "https://pre-commit.com",
                    external: true,
                    items: [],
                },
                {
                    title: "JetBrains",
                    href: "/docs/integrations/jetbrains",
                    items: [],
                },
                {
                    title: "Laravel",
                    href: "https://github.com/beyondcode/laravel-prose-linter",
                    external: true,
                    items: [],
                },
                {
                    title: "Obsidian",
                    href: "https://github.com/marcusolsson/obsidian-vale",
                    external: true,
                    items: [],
                },
                {
                    title: "Oxygen XML",
                    href: "https://www.oxygenxml.com/doc/versions/23.1/ug-editor/topics/vale-linter-addon.html",
                    items: [],
                },
                {
                    title: "Sublime Text",
                    href: "https://packagecontrol.io/packages/LSP-vale-ls",
                    external: true,
                    items: [],
                },
                {
                    title: "Vim/Neovim",
                    href: "https://github.com/dense-analysis/ale",
                    external: true,
                    items: [],
                },
                {
                    title: "VS Code",
                    href: "https://github.com/chrischinchilla/vale-vscode",
                    external: true,
                    items: [],
                },
                {
                    title: "Zed",
                    href: "https://github.com/koozz/zed-vale",
                    external: true,
                    items: [],
                },
            ],
        },
        {
            title: "Guides",
            items: [
                {
                    title: "LSP",
                    href: "/docs/guides/lsp",
                    items: [],
                },
                {
                    title: "Regex",
                    href: "/docs/guides/regex",
                    items: [],
                },
                {
                    title: "Globs",
                    href: "/docs/guides/glob",
                    items: [],
                },
            ],
        },
    ],
};

type Example = {
    name: string;
    href: string;
    label?: string;
    code: string;
};
export const examples: Example[] = [];
