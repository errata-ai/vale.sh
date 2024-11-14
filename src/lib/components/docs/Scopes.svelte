<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import scopes from '$lib/data/scopes.json';

	function preProcess(str: string): string {
		str = str.replace(/`([^`]+)`/g, `<code>$1</code>`);
		return str;
	}
</script>

<Table.Root class="my-0">
	<Table.Header>
		<Table.Row>
			<Table.Head>Name</Table.Head>
			<Table.Head>Description</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each scopes as scope}
			{@const processedDescription = preProcess(scope.description)}
			<Table.Row>
				<Table.Cell><code>{scope.scope}</code></Table.Cell>
				<Table.Cell>{@html processedDescription}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
