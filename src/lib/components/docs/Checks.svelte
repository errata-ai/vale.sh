<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { docsConfig } from '$lib/config/docs';

	let navItems = docsConfig.sidebarNav.filter((item) => item.title === 'Checks');
	let checks = navItems[0].items;
</script>

<Table.Root class="my-0">
	<Table.Header>
		<Table.Row>
			<Table.Head>Name</Table.Head>
			<Table.Head>Description</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each checks as check}
			<Table.Row>
				<Table.Cell><a href="/docs/ext/{check.title}">{check.title}</a></Table.Cell>
				<Table.Cell>{check.info}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
