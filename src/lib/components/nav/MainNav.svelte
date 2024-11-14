<script lang="ts">
	import { Icons } from '../icons';
	import { page } from '$app/stores';
	import { siteConfig } from '$lib/config/site.js';
	import { docsConfig } from '$lib/config/docs.js';
	import { cn } from '$lib/utils.js';
</script>

<div class="mr-4 hidden md:flex">
	<a href="/" class="mr-6 flex items-center space-x-2">
		<Icons.logo class="h-6 w-6" />
		<span class="hidden font-bold lg:inline-block">
			{siteConfig.name}
		</span>
	</a>
	<nav class="flex items-center gap-6 text-sm">
		{#each docsConfig.mainNav as { href, title }, i}
			<a
				{href}
				class={cn(
					'transition-colors hover:text-foreground/80',
					$page.url.pathname === href ? 'text-foreground' : 'text-foreground/60'
				)}
			>
				{title}
			</a>
		{/each}
	</nav>
</div>
