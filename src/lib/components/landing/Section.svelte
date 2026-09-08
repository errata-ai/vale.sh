<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		id,
		eyebrow,
		title,
		lede,
		accent = false,
		editorial = false,
		children
	}: {
		id?: string;
		/** Small kicker above the title. */
		eyebrow?: string;
		title: string;
		/** Plain copy, or a snippet when the lede carries its own markup. */
		lede?: string | Snippet;
		/** Tint the eyebrow lime. Reserve it for the one or two sections that
		    should carry the accent; the rest stay monochrome. */
		accent?: boolean;
		editorial?: boolean;
		children: Snippet;
	} = $props();
</script>

<!--
	The landing page's rhythm: full-bleed band, hairline rule underneath, one
	container width. Sections differ in their body, never in their frame.

	`scroll-mt` clears the sticky header: without it a jump to #id puts the
	heading underneath the bar, which reads as having landed in the wrong
	place.
-->
<section {id} class="scroll-mt-20 border-b border-border/60">
	<div
		class={cn(
			'mx-auto max-w-6xl border-border/60 px-6 py-12 sm:py-16 lg:px-8 lg:py-20',
			!editorial && 'lg:border-x'
		)}
	>
		<div class={editorial ? 'editorial-heading' : 'mx-auto max-w-2xl text-center'}>
			{#if eyebrow}
				<p
					class="text-sm font-medium leading-7 {accent
						? 'text-accent-foreground'
						: 'text-muted-foreground'}"
				>
					{eyebrow}
				</p>
			{/if}

			<!--
				The visible title is the heading; the eyebrow is not.

				A section with an id is linkable, so its heading is the link:
				the `#` appears on hover the way it does in the docs, and the
				whole title stays clickable for a reader who wants the URL.
			-->
			<h2
				class={cn(
					'mt-2 text-4xl sm:text-5xl',
					editorial ? 'font-medium tracking-tight' : 'font-semibold'
				)}
			>
				{#if id}
					<a
						href="#{id}"
						class="group/anchor relative rounded-sm no-underline hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
					>
						{title}
						<span
							aria-hidden="true"
							class="absolute ml-2 text-2xl text-muted-foreground opacity-0 transition-opacity group-hover/anchor:opacity-100 group-focus-visible/anchor:opacity-100"
							>#</span
						>
					</a>
				{:else}
					{title}
				{/if}
			</h2>

			{#if typeof lede === 'string'}
				<p class="mt-6 text-pretty text-lg leading-8 text-foreground/85">{lede}</p>
			{:else if lede}
				<p class="mt-6 text-pretty text-lg leading-8 text-foreground/85">{@render lede()}</p>
			{/if}
		</div>

		<div class="mt-10">
			{@render children()}
		</div>
	</div>
</section>

<style>
	.editorial-heading {
		display: grid;
		gap: 12px 48px;
		align-items: end;
	}
	.editorial-heading > :global(p:first-child:not(:last-child)) {
		margin: 0;
	}
	.editorial-heading > :global(p:first-child) {
		grid-column: 1 / -1;
		font:
			500 11px/1.6 ui-monospace,
			monospace;
		text-transform: uppercase;
		letter-spacing: 0.13em;
	}
	.editorial-heading > :global(h2) {
		margin: 0;
		min-width: 0;
		max-width: 640px;
		text-wrap: balance;
		font-size: clamp(2rem, 3.4vw, 2.8rem);
		line-height: 1.12;
		letter-spacing: -0.045em;
	}
	.editorial-heading > :global(p:last-child:not(:first-child)) {
		margin: 0;
		font-size: 15px;
		line-height: 1.8;
		max-width: 440px;
	}
	@media (min-width: 900px) {
		.editorial-heading {
			grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
		}
	}
</style>
