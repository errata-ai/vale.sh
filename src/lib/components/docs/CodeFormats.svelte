<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import langs from '$lib/data/code.json';

	function preProcess(str: string): string {
		str = str.replace(/`([^`]+)`/g, `<code>$1</code>`);
		return str;
	}
</script>

<Table.Root class="my-0">
	<Table.Header>
		<Table.Row>
			<Table.Head>Language</Table.Head>
			<Table.Head>Extensions</Table.Head>
			<Table.Head>Scopes</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each langs as lang}
			{@const pScopes = preProcess(lang.scopes)}
			{@const pExt = preProcess(lang.extensions)}
			<Table.Row>
				<Table.Cell>{lang.language}</Table.Cell>
				<Table.Cell>{@html pExt}</Table.Cell>
				<Table.Cell>{@html pScopes}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
