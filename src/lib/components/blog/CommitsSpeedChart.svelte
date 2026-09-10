<script lang="ts">
	// One message, every tool, on one linear scale. The two Vale bars carry
	// the accent; every other tool's bar is neutral, so the chart reads as
	// "ours against the field" without a legend to decode. The number beside
	// each bar carries the value; the bar carries the gap.
	import { timings } from '$lib/data/commits';

	import Figure from './Figure.svelte';

	let { caption }: { caption?: string } = $props();

	const slowest = Math.max(...timings.map((t) => t.seconds));
	const barWidth = (s: number) => Math.max((s / slowest) * 100, 1.5);
	const fmt = (s: number) => `${Math.round(s * 1000)} ms`;
</script>

<Figure {caption}>
	<div
		class="space-y-4"
		role="img"
		aria-label="Wall-clock time to lint one commit message, per tool"
	>
		{#each timings as t (t.label)}
			<div>
				<div class="flex items-baseline justify-between gap-4 text-sm">
					<span class={t.ours ? 'font-medium' : ''}>{t.label}</span>
					<span class="font-mono tabular-nums text-muted-foreground">{fmt(t.seconds)}</span>
				</div>
				<div class="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-muted">
					<div
						class="h-full rounded-full {t.ours ? 'bg-lime-500' : 'bg-muted-foreground/60'}"
						style="width: {barWidth(t.seconds)}%"
					></div>
				</div>
				<p class="mt-1 text-xs text-muted-foreground/80">{t.detail}</p>
			</div>
		{/each}
	</div>
</Figure>
