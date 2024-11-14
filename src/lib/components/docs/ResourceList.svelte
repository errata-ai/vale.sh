<script lang="ts">
	import ResourceCard from '$lib/components/docs/ResourceCard.svelte';
	import { onMount } from 'svelte';

	const library =
		'https://raw.githubusercontent.com/errata-ai/packages/refs/heads/master/library.json';

	let data = [];
	onMount(async () => {
		const response = await fetch(library);
		data = await response.json();
	});
</script>

{#if data.length === 0}
	<p>Loading...</p>
{:else}
	<ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each data as item}
			<li
				class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-secondary text-center shadow"
			>
				<ResourceCard
					name={item.name}
					link={item.homepage}
					info={item.description}
					logo={item.logo}
				/>
			</li>
		{/each}
	</ul>
{/if}
