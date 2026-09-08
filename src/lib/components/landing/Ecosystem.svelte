<script lang="ts">
	import type { Stats } from '$lib/types/stats';
	import Counter from './Counter.svelte';
	import BrandIcon from './BrandIcon.svelte';
	import { brandColors } from '$lib/data/brand-icons';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import Section from './Section.svelte';

	let { stats }: { stats: Stats } = $props();

	const n = (v: number) => v.toLocaleString('en-US');

	/*
		Three figures up top, then one card per registry. The registries count
		different windows -- GitHub and Docker report lifetime totals, Homebrew
		a trailing year, PyPI six months -- so each card names its own window
		and the headline sums only the lifetime ones. The channels that publish
		no count at all share the last card, listed by version instead.
	*/
	const headline = $derived([
		{
			value: stats.lifetime.value,
			label: 'downloads to date',
			detail: `${stats.lifetime.sources.join(', ')} · the channels reporting a lifetime total`
		},
		{ value: stats.stars, label: 'stars on GitHub', detail: 'vale-cli/vale' },
		{ value: stats.contributors, label: 'contributors', detail: 'across the main repository' }
	]);

	const card =
		'group flex h-full flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:border-lime-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500';
	// A mark takes its brand color where it has one; the rest stay neutral.
	const brand = (slug?: string) => (slug ? brandColors[slug] : undefined);
	const glyph = (slug?: string) => (brand(slug) ? 'text-[--brand]' : 'text-foreground/80');
	const iconColor =
		'text-foreground/70 transition-colors group-hover:text-lime-600 dark:group-hover:text-lime-400';
</script>

<Section
	editorial
	id="stats"
	eyebrow="Distribution"
	accent
	title="Where Vale is downloaded"
	lede="Seven registries publish a download count, and each counts a different window, so they sit side by side here rather than in one total."
>
	<dl
		class="grid gap-y-8 border-y border-border py-8 sm:grid-cols-3 sm:gap-y-0 sm:divide-x sm:divide-border"
	>
		{#each headline as figure, i (figure.label)}
			<div class={i === 0 ? 'sm:pr-8' : 'sm:px-8'}>
				<dd
					class="text-5xl font-medium tabular-nums tracking-tight {i === 0
						? 'text-lime-600 dark:text-lime-400 sm:text-6xl'
						: 'text-foreground'}"
				>
					<Counter value={figure.value} />
				</dd>
				<dt class="mt-2 text-sm font-medium text-foreground">{figure.label}</dt>
				<dd class="mt-1 text-xs leading-5 text-muted-foreground">{figure.detail}</dd>
			</div>
		{/each}
	</dl>

	<ul class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
		{#each stats.channels as channel (channel.name)}
			<li>
				<a
					href={channel.source}
					target="_blank"
					rel="noreferrer"
					title="{n(channel.value)} {channel.unit ??
						'downloads'} — {channel.name}, {channel.window}"
					style={brand(channel.icon) ? `--brand: ${brand(channel.icon)}` : undefined}
					class={card}
				>
					<span class="flex items-center gap-2.5">
						<BrandIcon
							name={channel.name}
							slug={channel.icon}
							size="h-4 w-4"
							class={glyph(channel.icon)}
						/>
						<span class="min-w-0 flex-1 truncate text-sm font-medium text-foreground"
							>{channel.name}</span
						>
						<ArrowUpRight class="h-4 w-4 shrink-0 text-muted-foreground/50 {iconColor}" />
					</span>
					<span
						class="mt-4 font-mono text-2xl font-medium tabular-nums tracking-tight text-foreground"
					>
						<Counter value={channel.value} />
					</span>
					<span class="mt-1 text-xs text-muted-foreground">
						<!-- The section counts downloads; a card counting something else says so. -->
						{channel.unit ? `${channel.unit} · ` : ''}{channel.window}{channel.note
							? ` · ${channel.note}`
							: ''}
					</span>
				</a>
			</li>
		{/each}

		<!-- The channels that publish no count, listed by what they do publish. -->
		<li class="flex flex-col rounded-xl border border-dashed border-border p-4">
			<span class="text-sm font-medium text-foreground">Also ships on</span>
			<ul class="mt-3 flex flex-col gap-2">
				{#each stats.availability as channel (channel.name)}
					<li>
						<a
							href={channel.source}
							target="_blank"
							rel="noreferrer"
							style={brand(channel.icon) ? `--brand: ${brand(channel.icon)}` : undefined}
							class="group flex items-center gap-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500"
						>
							<BrandIcon
								name={channel.name}
								slug={channel.icon}
								size="h-3.5 w-3.5"
								class={glyph(channel.icon)}
							/>
							<span class="text-foreground group-hover:text-lime-600 dark:group-hover:text-lime-400"
								>{channel.name}</span
							>
							<span class="ml-auto font-mono text-xs text-muted-foreground">{channel.detail}</span>
						</a>
					</li>
				{/each}
			</ul>
		</li>
	</ul>

	<p class="mt-6 text-xs leading-6 text-muted-foreground">
		Sources: GitHub, Docker Hub, PyPI, npm, conda-forge, Homebrew, Chocolatey, WinGet, Snapcraft,
		and Repology · updated {stats.updated}
	</p>
</Section>
