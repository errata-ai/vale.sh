<script lang="ts">
	import Rocket from 'svelte-radix/Rocket.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import type { Snippet } from 'svelte';
	import { mdToHtml } from '$lib/md';

	let { children, level = 'info' }: { children: Snippet; level: 'info' | 'warning' | 'error' } =
		$props();

	let color = {
		info: 'bg-sky-400',
		warning: 'bg-amber-400',
		error: 'bg-red-400'
	}[level];
</script>

<Alert.Root class="mt-4 {color}">
	<Rocket class="h-4 w-4" />
	<Alert.Title>Heads up!</Alert.Title>
	<Alert.Description>{@render children()}</Alert.Description>
</Alert.Root>
