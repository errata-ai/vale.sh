<script lang="ts">
	import Check from 'svelte-radix/Check.svelte';
	import Copy from 'svelte-radix/Copy.svelte';
	import { cn } from '$lib/utils.js';

	let {
		copied = false,
		copyCode = () => {},
		className
	}: { copied: boolean; copyCode: () => void; className: string | undefined | null } = $props();
</script>

<button
	class={cn(
		'absolute right-4 top-4 z-10 inline-flex h-6 w-6 items-center justify-center rounded-md text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-700 hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
		className
	)}
	onclick={() => copyCode()}
>
	<span class="sr-only">Copy</span>
	{#if copied}
		<Check class="h-3 w-3" />
	{:else}
		<Copy class="h-3 w-3" />
	{/if}
</button>
