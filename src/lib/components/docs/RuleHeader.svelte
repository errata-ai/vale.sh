<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { docsConfig } from '$lib/config/docs';
	import Separator from '../ui/separator/separator.svelte';

	let navItems = docsConfig.sidebarNav;

	let rules = navItems.filter((item) => item.title === 'Checks');
	let names = rules[0].items.map((rule) => rule.title);

	let options = [
		{
			name: 'extends',
			type: 'string',
			required: true,
			default: 'N/A',
			info: 'extends: existence',
			description:
				'The name of the check to extend in the particular rule. See <a class="underline" href="/docs/ext/existence">Rules</a> for more information.'
		},
		{
			name: 'message',
			type: 'string',
			required: true,
			default: 'N/A',
			info: `message: "Don't use '%s' headings."`,
			description:
				'The message to display when the rule is triggered. Each extension point has different formatting options.'
		},
		{
			name: 'level',
			type: 'string',
			required: false,
			default: 'suggestion',
			info: `level: warning`,
			description:
				'The severity of the rule. The available options are `suggestion`, `warning`, and `error`.'
		},
		{
			name: 'scope',
			type: 'string',
			required: false,
			default: 'text',
			info: `scope: heading`,
			description:
				'The scope of the rule. See <a class="underline" href="/docs/scopes">Scopes</a> for more information.'
		},
		{
			name: 'link',
			type: 'string',
			required: false,
			default: 'N/A',
			info: `link: https://example.com`,
			description:
				'A URL to associate with the rule. This is useful for providing more information about the rule.'
		},
		{
			name: 'limit',
			type: 'number',
			required: false,
			default: 'N/A',
			info: `limit: 3`,
			description: 'The maximum number of times the rule can be triggered in a single file.'
		},
		{
			name: 'vocab',
			type: 'boolean',
			required: false,
			default: 'true',
			info: `vocab: false`,
			description: 'If set to false, any active vocabularies will be disabled for the rule.'
		}
	];
</script>

<Table.Root class="my-0">
	<Table.Header>
		<Table.Row>
			<Table.Head>Name</Table.Head>
			<Table.Head>Description</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each options as opt}
			<Table.Row>
				<Table.Cell><code>{opt.name}</code></Table.Cell>
				<Table.Cell>
					{@html opt.description}
					<div class="flex h-5 items-center space-x-4 text-sm">
						<div>
							<span class="text-muted-foreground">Required: {opt.required ? 'Yes' : 'No'}</span>
						</div>
						<Separator orientation="vertical" />
						<div><span class="text-muted-foreground">Type: <code>{opt.type}</code></span></div>
						<Separator orientation="vertical" />
						<div>
							<span class="text-muted-foreground">Default: <code>{opt.default}</code></span>
						</div>
					</div>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
