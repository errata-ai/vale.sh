<script lang="ts">
	import { query } from '$lib/api';
	import TextEditor from '$lib/components/TextEditor.svelte';
	import SuperDebug from 'sveltekit-superforms';

	let value1 = $state(`StylesPath = styles

MinAlertLevel = suggestion

[*.md]
BasedOnStyles = Vale`);

	let value2 = $state(`StylesPath = styles

MinAlertLevel = suggestion

[*.md]
BasedOnStyles = Vale`);

	let json = $state({});
	$effect(() => {
		// Post the configs to the API as JSON with CORS enabled:
		query('mock', {
			text: value1,
			code: value2
		})
			.then((res) => {
				let obj = JSON.parse(res);

				// Remove irrelevant keys:
				delete obj['NLPEndpoint'];
				delete obj['RootINI'];
				delete obj['ConfigFiles'];
				delete obj['WordTemplate'];
				delete obj['Stylesheets'];
				delete obj['FormatToLang'];
				delete obj['Paths'];

				json = obj;
			})
			.catch((err) => {
				console.error(err);
			});
	});
</script>

<div class="pb-6">
	<div class="mb-1 mt-4 grid grid-cols-1 gap-1 md:grid-cols-2">
		<div>
			<p class="text-xs text-muted-foreground">Project config</p>
			<TextEditor readonly={false} mode="ini" bind:value={value1} height="190px" />
		</div>
		<div>
			<p class="text-xs text-muted-foreground">Global config</p>
			<TextEditor readonly={false} mode="ini" bind:value={value2} height="190px" />
		</div>
	</div>
	<SuperDebug data={json} status={false} />
</div>
