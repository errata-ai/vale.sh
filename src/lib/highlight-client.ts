/**
 * The blog's highlighting, in the browser, for code that only exists there.
 *
 * `$lib/server/highlight` runs once per build over code a page carries. The
 * generator composes its files as the reader clicks, so the same palette and
 * the same Vale-aware ini grammar are loaded on demand here, with shiki's
 * JavaScript engine rather than the WebAssembly one, and only the two
 * grammars the output needs.
 */
import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import type { LanguageRegistration, ThemeRegistrationRaw } from 'shiki';
import { themes, valeIni } from '$lib/shiki.mjs';

export type Lang = 'ini' | 'yaml';

let instance: Promise<HighlighterCore> | undefined;

function highlighter() {
	instance ??= createHighlighterCore({
		themes: themes as unknown as ThemeRegistrationRaw[],
		langs: [import('shiki/langs/yaml.mjs'), valeIni as LanguageRegistration],
		langAlias: { ini: 'vale-ini' },
		engine: createJavaScriptRegexEngine()
	});
	return instance;
}

/**
 * Renders code as highlighted HTML, light and dark themes both, with the
 * blog's line numbers: `numbered` on the code element, which code.css turns
 * into CSS counters, so a copy stays clean of them.
 */
export async function highlight(code: string, lang: Lang): Promise<string> {
	const h = await highlighter();
	return h.codeToHtml(code, {
		lang,
		themes: { light: 'vale-light', dark: 'vale-dark' },
		transformers: [
			{
				name: 'line-numbers',
				code(node) {
					this.addClassToHast(node, 'numbered');
				}
			}
		]
	});
}
