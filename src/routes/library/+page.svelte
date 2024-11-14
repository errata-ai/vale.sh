<script lang="ts">
	import Rocket from 'svelte-radix/Rocket.svelte';
	import Code from 'svelte-radix/Code.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import * as Popover from '$lib/components/ui/popover';
	import { onMount } from 'svelte';
	import data from '$lib/data/media.json';
	import { search as searchLambda } from '$lib/api';

	function getParts(id: string) {
		let tag = id.match(/title=(.+)&url=(.+)&author=(.+)&year=(.+)&type=(.+)/);
		return {
			title: tag[1],
			url: tag[2],
			author: tag[3],
			year: tag[4],
			type: tag[5]
		};
	}

	onMount(() => {
		const { autocomplete } = window['@algolia/autocomplete-js'];

		autocomplete({
			container: '#autocomplete',
			placeholder: 'Search topics or keywords',
			debug: false,
			defaultActiveItemId: 0,
			getSources({ query }) {
				return searchLambda(query)
					.then((response) => response.json())
					.then((data) => {
						return [
							{
								sourceId: 'predictions',
								getItemUrl({ item }) {
									return getParts(item.ID).url;
								},
								getItems() {
									return data || [];
								},
								templates: {
									noResults({ html }) {
										return html`<div class="prose dark:prose-invert">
											<h3 class="mt-0">No results found.</h3>
											<p>Try adjusting your search with a query string:</p>
											<ul>
												<li class="pb-1 pt-1">
													Faceted search: <code>date:>2021</code> or <code>author:jdkato</code>
												</li>
												<li class="pb-1 pt-1">
													Fuzzy search: <code>term~1</code> or <code>term~2</code>
												</li>
												<li class="pb-1 pt-1">
													Boosted search: <code>text:neovim title:neovim^5</code>
												</li>
												<li class="pb-1 pt-1">
													Regex search: <code>author:/(jdkato|another)/</code>
												</li>
											</ul>
										</div>`;
									},
									item({ item, html, createElement }) {
										const parsed = getParts(item.ID);
										const sample = createElement('p', {
											dangerouslySetInnerHTML: { __html: item.Fragment }
										});
										return html`<div class="prose w-full rounded-lg p-6 dark:prose-invert">
											<a class="no-underline" href="${parsed.url}" target="_blank">
												<h5 class="font-bold tracking-tight underline">${parsed.title}</h5>
												<p class="un text-sm text-muted-foreground">${sample}</p>
												<span
													class="mr-2 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
													><i class="fa-solid fa-tag mr-1"></i> Type: ${parsed.type}</span
												>
												<span
													class="mr-2 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
													><i class="fa-solid fa-calendar-days mr-1"></i> Year: ${parsed.year}</span
												>
												<span
													class="mr-2 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
													><i class="fa-solid fa-person mr-1"></i> Author: ${parsed.author}</span
												>
											</a>
										</div>`;
									}
								}
							}
						];
					});
			}
		});
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css"
		integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	/>
</svelte:head>

<div class="bg-secondary py-6">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
				Go to <span class="underline">anything</span>
				<Rocket class="inline-block h-8 w-8" />
			</h2>
			<form>
				<div class="mt-4">
					<div class="w-full" id="autocomplete"></div>
				</div>
				<p class="mt-2 text-center text-sm">
					The <i>Go to Anything</i> feature allows you to search the Media Library using a variety
					of
					<Popover.Root>
						<Popover.Trigger><span class="underline">search operators</span>.</Popover.Trigger>
						<Popover.Content class="prose prose-sm dark:prose-invert">
							<p>
								The Media Library is indexed daily and supports a variety of advaned search
								operators:
							</p>
							<ul class="list-disc">
								<li>Faceted search: <code>date:>2021</code> or <code>author:jdkato</code></li>
								<li>Fuzzy search: <code>term~1</code> or <code>term~2</code></li>
								<li>Boosted search: <code>text:neovim title:neovim^5</code></li>
								<li>Regex search: <code>author:/(jdkato|another)/</code></li>
							</ul>
						</Popover.Content>
					</Popover.Root>
				</p>
			</form>
		</div>
	</div>
</div>

<div class="py-12">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div
			class="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
		>
			{#each data as media}
				{@const image = media.image === '' ? '/media/fallback.png' : media.image}
				<article class="flex flex-col items-start justify-start">
					<div class="relative w-full">
						<img
							src={image}
							alt=""
							class="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
						/>
						<div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
					</div>
					<div class="max-w-xl">
						<div class="mt-8 flex items-center gap-x-4 text-xs">
							<Badge variant="secondary">{media.year}</Badge>
							<Badge variant="secondary">{media.type}</Badge>
						</div>
						<div class="group relative">
							<h3 class="mt-3 text-lg/6 font-semibold">
								<a class="underline" href={media.url}>
									<span class="absolute inset-0"></span>
									{media.title}
								</a>
							</h3>
							<p class="mt-5 line-clamp-3 text-sm/6 text-muted-foreground">
								{media.description}
							</p>
						</div>
						<div class="relative mt-4 flex items-center gap-x-4">
							<div class="text-sm/6">
								<p class="font-semibold text-muted-foreground">
									<span class="absolute inset-0"></span>
									{media.author}
								</p>
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</div>

<sytle> </sytle>
