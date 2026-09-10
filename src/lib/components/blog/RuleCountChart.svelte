<script lang="ts">
	// Rules per style, one hue: a magnitude, not a set of identities. The
	// name and the count are text; the bar is the only thing that wears the
	// color, and the source of each style rides underneath.
	import { styles } from '$lib/data/commits';

	import Figure from './Figure.svelte';

	let { caption }: { caption?: string } = $props();

	const most = Math.max(...styles.map((s) => s.rules));
	const barWidth = (n: number) => Math.max((n / most) * 100, 2);
	const total = styles.reduce((sum, s) => sum + s.rules, 0);
</script>

<Figure {caption}>
	<div class="space-y-3" role="img" aria-label="Rules per style, {total} in all">
		{#each styles as s (s.name)}
			<div class="grid grid-cols-[7.5rem_1fr_2.5rem] items-center gap-3 text-sm">
				<span class="font-mono text-xs">{s.name}</span>
				<div class="h-2.5 w-full overflow-hidden rounded-full bg-muted">
					<div class="h-full rounded-full bg-lime-500" style="width: {barWidth(s.rules)}%"></div>
				</div>
				<span class="text-right font-mono tabular-nums text-muted-foreground">{s.rules}</span>
			</div>
		{/each}
	</div>
</Figure>
