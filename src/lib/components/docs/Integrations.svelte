<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { docsConfig } from '$lib/config/docs.js';

	let sidebar = docsConfig.sidebarNav;
	let integrations = sidebar.find((item) => item.title === 'Integrations')?.items || [];

	let lspPowered = ['Sublime Text', 'VS Code', 'Zed', 'Neovim'];
</script>

<ul>
	{#each integrations as item}
		<li>
			<a href={item.href}>{item.title}</a>
			{#if lspPowered.includes(item.title)}
				<Badge>LSP</Badge>
			{/if}
		</li>
	{/each}
</ul>
