import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    optimizeDeps: {
        exclude: [
            "svelte-codemirror-editor",
            "codemirror",
            "@codemirror/lang-yaml",
            "@codemirror/language",
            "@codemirror/view",
            "@codemirror/state",
            "@codemirror/legacy-modes",
            "@codemirror/theme-one-dark",
        ],
    },
});
