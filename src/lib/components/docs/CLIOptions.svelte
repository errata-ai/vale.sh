<script lang="ts">
	import * as Table from '$lib/components/ui/table';

	let options = [
		{
			name: 'sync',
			params: 'N/A',
			type: 'command',
			usage: `$ vale sync`,
			description:
				'Download and install packages. See <a class="underline" href="/docs/keys/packages">Packages</a> for more information.'
		},
		{
			name: 'ls-config',
			params: 'N/A',
			type: 'command',
			usage: `$ vale ls-config`,
			description: 'Print the current configuration options as JSON.'
		},
		{
			name: 'ls-metrics',
			params: 'string',
			type: 'command',
			usage: `$ vale ls-metrics path/to/file`,
			description:
				'Print the computed metrics for the given file. See <a class="underline" href="/docs/ext/metric">metric</a> for more information.'
		},
		{
			name: 'ls-dirs',
			params: 'N/A',
			type: 'command',
			usage: `$ vale ls-dirs`,
			description: 'Print the location of default configuration directories.'
		},
		{
			name: 'ls-vars',
			params: 'N/A',
			type: 'command',
			usage: `$ vale ls-vars`,
			description: 'Print the supported environment variables.'
		},
		{
			name: '--config',
			params: 'string',
			type: 'flag',
			usage: `$ vale --config='path/to/.vale.ini' README.md`,
			description: 'Override the default configuration search process.'
		},
		{
			name: '--ext',
			params: 'string',
			type: 'flag',
			usage: `$ echo "*This* is Markdown" | vale --ext='.md'`,
			description: 'Assign a file extension to stdin.'
		},
		{
			name: '--filter',
			params: 'string',
			type: 'flag',
			usage: `$ vale --filter='"heading" in .Scope' test.md`,
			description:
				'An expression to filter rules by. See <a class="underline" href="/docs/filters">Filters</a> for more information.'
		},
		{
			name: '--glob',
			params: 'string',
			type: 'flag',
			usage: `$ vale --glob='*.md' some-dir`,
			description:
				'A glob pattern to match files against. See <a class="underline" href="/docs/guides/glob">Globbing</a> for more information.'
		},
		{
			name: '--ignore-syntax',
			params: 'N/A',
			type: 'flag',
			usage: `$ vale --ignore-syntax README.md`,
			description: 'Treat all input as plain text.'
		},
		{
			name: '--no-exit',
			params: 'N/A',
			type: 'flag',
			usage: `$ vale --no-exit README.md`,
			description: 'Do not return a non-zero exit code if there are errors.'
		},
		{
			name: '--no-wrap',
			params: 'N/A',
			type: 'flag',
			usage: `$ vale --no-wrap README.md`,
			description: 'Do not wrap output.'
		},
		{
			name: '--output',
			params: 'JSON|line|path',
			type: 'flag',
			usage: `$ vale --output=JSON README.md`,
			description:
				'Change the output format. See <a class="underline" href="/docs/templates">Templates</a> for more information.'
		},
		{
			name: '--version',
			params: 'N/A',
			type: 'flag',
			usage: `$ vale --version`,
			description: 'Print the version of Vale.'
		}
	];
</script>

<Table.Root class="my-0">
	<Table.Header>
		<Table.Row>
			<Table.Head>Name</Table.Head>
			<Table.Head>Type</Table.Head>
			<Table.Head>Description</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each options as opt}
			<Table.Row>
				<Table.Cell><code>{opt.name}</code></Table.Cell>
				<Table.Cell><code>{opt.type}</code></Table.Cell>
				<Table.Cell>
					{@html opt.description}
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
