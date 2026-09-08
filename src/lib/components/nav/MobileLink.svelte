<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils.js';

	export let href: string;
	export let open: boolean;

	let className: string | undefined | null = undefined;
	export { className as class };

	// A page under the link's path counts as the link, as in MainNav.
	$: current =
		$page.url.pathname === href || (href !== '/' && $page.url.pathname.startsWith(`${href}/`));
</script>

<a
	{href}
	class={cn(current ? 'text-foreground' : 'text-foreground/60', className)}
	on:click={() => (open = false)}
	{...$$restProps}
>
	<slot />
</a>
