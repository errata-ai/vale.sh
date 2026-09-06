<script lang="ts">
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import BrandIcon from './BrandIcon.svelte';
	import Section from './Section.svelte';
	import { integrationGroups } from '$lib/data/integrations';
</script>

<Section
	editorial
	id="integrations"
	eyebrow="One tool, every app"
	accent
	title="More than just a command-line interface."
	lede="Vale runs where you already write—in your editor, in your notes app, and in CI before anything merges."
>
	<div class="flex flex-col gap-10">
		{#each integrationGroups as group}
			<section>
				<div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-border pt-6">
					<h3 class="text-sm font-semibold tracking-tight">{group.title}</h3>
					<p class="text-sm text-muted-foreground">{group.note}</p>
				</div>

				<ul class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{#each group.items as item}
						<li>
							<a
								href={item.href}
								target="_blank"
								rel="noreferrer"
								class="group flex h-full items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors duration-200 hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500"
							>
								<BrandIcon
									name={item.name}
									slug={item.slug}
									avatar={item.avatar}
									class="text-foreground/70 transition-colors group-hover:text-lime-600 dark:group-hover:text-lime-400"
								/>
								<span class="min-w-0 flex-1">
									<span class="block truncate text-sm font-medium">{item.name}</span>
									<span class="block truncate text-xs text-muted-foreground">{item.detail}</span>
								</span>
								<ArrowUpRight
									class="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-lime-600 dark:group-hover:text-lime-400"
								/>
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>

	<div class="mt-10">
		<a
			href="https://docs.vale.sh/guides/lsp"
			class="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline decoration-lime-500/40 underline-offset-4 transition-colors hover:text-lime-600 dark:hover:text-lime-400"
		>
			Learn more about our integrations
			<ArrowRight class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
		</a>
	</div>
</Section>
