<script lang="ts">
	import * as Table from '$lib/components/ui/table';

	let options = [
		{
			name: 'VALE_CONFIG_PATH',
			description: 'Override the default search process by specifying a .vale.ini file.'
		},
		{
			name: 'VALE_STYLES_PATH',
			description: 'Specify the location of the default StylesPath.'
		}
	];
</script>

<Table.Root class="mt-4">
	<Table.Header>
		<Table.Row>
			<Table.Head>Variable</Table.Head>
			<Table.Head>Description</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each options as opt}
			<Table.Row>
				<Table.Cell><code>{opt.name}</code></Table.Cell>
				<Table.Cell>{opt.description}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
