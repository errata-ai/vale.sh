<script lang="ts">
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import FileText from 'lucide-svelte/icons/file-text';
	import { features } from '$lib/features';
	import { markupFormats } from '$lib/data/markup-formats';
	import { codeLanguages } from '$lib/data/code-languages';
	import { brandColors } from '$lib/data/brand-icons';
	import BrandIcon from './BrandIcon.svelte';
	import Section from './Section.svelte';

	/*
		Four cards. Each carries the claim, a small artifact that stands for the
		evidence, and the link to the argument. The artifacts are lists and
		figures rather than demos: the hero has the one interactive example the
		landing page needs.

		Each card summarizes one /features page, in the order the list gives.
	*/
	const [markup, code, views, speed] = features;

	type Chip = { name: string; slug?: string; ext: string };
	type Card = (typeof features)[number] & { cta: string };

	const cta: Record<string, string> = {
		markup: 'How scopes work',
		code: 'Inside the grammar',
		views: 'How Views work',
		speed: 'What makes it fast'
	};
	const page = (feature: (typeof features)[number]): Card => ({
		...feature,
		cta: cta[feature.slug]
	});

	// The file kinds the docs show a View for, by engine: data, text, code.
	const viewFormats: Chip[] = [
		{ name: 'OpenAPI', slug: 'openapiinitiative', ext: '.yml, .json' },
		{ name: 'Jupyter', slug: 'jupyter', ext: '.ipynb' },
		{ name: 'Commit messages', slug: 'git', ext: 'COMMIT_EDITMSG' },
		{ name: 'Transcripts', ext: '.txt' },
		{ name: 'Docstrings', ext: '.py, .rs, .go' },
		{ name: 'JSON', slug: 'json', ext: '.json' },
		{ name: 'YAML', slug: 'yaml', ext: '.yml' },
		{ name: 'TOML', slug: 'toml', ext: '.toml' }
	];

	const card =
		'group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-lime-500/50 sm:p-7';
	const eyebrow =
		'inline-flex items-center gap-2 text-sm font-medium text-lime-600 dark:text-lime-400';
	const heading = 'mt-3 text-2xl font-medium tracking-tight text-foreground';
	const headingLink = 'hover:text-lime-600 dark:hover:text-lime-400';
	const lede = 'mt-3 text-pretty text-[15px] leading-7 text-foreground/85';
	const artifact = 'mt-6 rounded-xl border border-border bg-muted p-4';
	const caption = 'mb-3 font-mono text-[11px] text-muted-foreground';
	const link =
		'group/link mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-foreground underline decoration-lime-500/40 underline-offset-4 transition-colors hover:text-lime-600 dark:hover:text-lime-400';
</script>

{#snippet header(item: Card, n: string)}
	{@const Icon = item.icon}
	<span class={eyebrow}>
		<span class="font-mono text-xs">{n} /</span>
		<Icon class="h-4 w-4" />
		{item.title}
	</span>
	<h3 class={heading}>
		<a href="/features/{item.slug}" class={headingLink}>{item.tagline}</a>
	</h3>
	<p class={lede}>{item.description}</p>
{/snippet}

<!--
	The count is the argument, so every item is shown. The name stays beside
	each mark because half of these are not recognisable on sight. Marks that
	carry a brand color take it; the text stays neutral.
-->
{#snippet chips(items: Chip[])}
	<ul class="flex flex-wrap gap-1.5">
		{#each items as item (item.name)}
			{@const brand = item.slug ? brandColors[item.slug] : undefined}
			<li
				title="{item.name} ({item.ext})"
				style={brand ? `--brand: ${brand}` : undefined}
				class="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-card px-2 py-1 text-xs text-muted-foreground"
			>
				{#if item.slug}
					<BrandIcon
						name={item.name}
						slug={item.slug}
						size="h-3.5 w-3.5"
						class={brand ? 'text-[--brand]' : 'text-foreground/80'}
					/>
				{:else}
					<FileText class="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden="true" />
				{/if}
				{item.name}
			</li>
		{/each}
	</ul>
{/snippet}

{#snippet more(item: Card)}
	<a href="/features/{item.slug}" class={link}>
		{item.cta}
		<ArrowRight class="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
	</a>
{/snippet}

<Section
	id="features"
	editorial
	eyebrow="Why Vale"
	title="Most tools see text. Vale sees a document."
	lede="A heading, a code block, a comment, and a link URL are not the same thing—and a rule that can't tell them apart is a rule you end up switching off."
	accent
>
	<div class="grid gap-5 lg:grid-cols-2">
		{#each [page(markup), page(code)] as item, i (item.slug)}
			<article class={card}>
				{@render header(item, String(i + 1).padStart(2, '0'))}
				<div class={artifact}>
					{#if i === 0}
						<div class={caption}>{markupFormats.length} formats, each through its own parser</div>
						{@render chips(markupFormats)}
					{:else}
						<div class={caption}>
							{codeLanguages.length} languages, comments lifted out by tree-sitter
						</div>
						{@render chips(codeLanguages)}
					{/if}
				</div>
				{@render more(item)}
			</article>
		{/each}

		<article class={card}>
			{@render header(page(views), '03')}
			<div class={artifact}>
				<div class={caption}>data, plain text, and source, each through its own engine</div>
				{@render chips(viewFormats)}
			</div>
			{@render more(page(views))}
		</article>

		<article class={card}>
			{@render header(page(speed), '04')}
			<!-- Figures, not an illustration: the claim is a measurement. -->
			<div class={artifact}>
				<div class={caption}>GitLab's documentation, one run</div>
				<dl class="grid grid-cols-3 gap-3">
					{#each [{ n: '2,827', l: 'pages of Markdown' }, { n: '82', l: 'rules applied' }, { n: '<20s', l: 'start to finish' }] as stat}
						<div>
							<dt class="font-mono text-2xl font-medium tabular-nums text-foreground">{stat.n}</dt>
							<dd class="mt-1 text-xs leading-snug text-muted-foreground">{stat.l}</dd>
						</div>
					{/each}
				</dl>
			</div>
			{@render more(page(speed))}
		</article>
	</div>
</Section>
