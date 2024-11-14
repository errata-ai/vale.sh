<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { properties } from '@codemirror/legacy-modes/mode/properties';
	import { StreamLanguage, LanguageSupport } from '@codemirror/language';
	import { yaml } from '@codemirror/lang-yaml';
	import { EditorView } from '@codemirror/view';
	import { bespin, tomorrow } from 'thememirror';
	import { mode as colorMode } from 'mode-watcher';

	const ini = new LanguageSupport(StreamLanguage.define(properties));

	let {
		mode,
		height,
		value = $bindable(),
		readonly
	}: { mode: 'yaml' | 'ini'; value: string; readonly: boolean; height: string } = $props();
	let language = mode === 'yaml' ? yaml() : ini;

	// Custom theme to disable line highlighting
	const noLineHighlightTheme = EditorView.theme({
		'.cm-line': {
			backgroundColor: 'transparent !important'
		},
		'.cm-content': {
			fontSize: '14px' // Set the desired font size here
		},
		'.cm-scroller': {
			overflow: 'auto',
			'min-height': height,
			'max-height': height
		}
	});
</script>

{#if $colorMode === 'dark'}
	<CodeMirror
		bind:value
		lang={language}
		theme={[bespin, noLineHighlightTheme]}
		{readonly}
		class="h-full"
	/>
{:else}
	<CodeMirror
		bind:value
		lang={language}
		theme={[tomorrow, noLineHighlightTheme]}
		{readonly}
		class="h-full"
	/>
{/if}
