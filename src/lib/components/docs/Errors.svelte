<script lang="ts">
	import * as Table from '$lib/components/ui/table';

	let options = [
		{
			code: 0,
			description: 'No error(s) were found.'
		},
		{
			code: 1,
			description:
				'Linting error(s) were found. Useful for failing CI builds; can be disabled with <code>--no-exit</code>.'
		},
		{
			code: 2,
			description: 'Runtime error(s) occurred.'
		}
	];
</script>

<Table.Root class="mt-4">
	<Table.Header>
		<Table.Row>
			<Table.Head>Code</Table.Head>
			<Table.Head>Description</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each options as opt}
			<Table.Row>
				<Table.Cell><code>{opt.code}</code></Table.Cell>
				<Table.Cell>{@html opt.description}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
