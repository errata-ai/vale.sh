<script lang="ts">
	import * as Table from '$lib/components/ui/table';

	let options = [
		{
			platform: 'macOS',
			pkg: 'Homebrew',
			command: 'brew install vale',
			source: 'https://formulae.brew.sh/formula/vale'
		},
		{
			platform: 'Windows',
			pkg: 'Chocolatey',
			command: 'choco install vale',
			source: 'https://chocolatey.org/packages/vale'
		},
		{
			platform: 'Linux',
			pkg: 'Snapcraft',
			command: 'snap install vale',
			source: 'https://snapcraft.io/vale'
		}
	];
</script>

<Table.Root class="my-0">
	<Table.Header>
		<Table.Row>
			<Table.Head>Platform</Table.Head>
			<Table.Head>Command</Table.Head>
			<Table.Head>Documentation</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each options as opt}
			<Table.Row>
				<Table.Cell>{opt.platform}</Table.Cell>
				<Table.Cell><code>{opt.command}</code></Table.Cell>
				<Table.Cell><a href={opt.source}>{opt.pkg}</a></Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
