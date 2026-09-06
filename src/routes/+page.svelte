<script lang="ts">
	import Overview from '$lib/components/landing/Overview.svelte';
	import Integrations from '$lib/components/landing/Integrations.svelte';
	import CTA from '$lib/components/landing/CTA.svelte';
	import { MetaTags } from 'svelte-meta-tags';

	const description =
		'Vale is a command-line tool that brings code-like linting to prose. Cross-platform, written in Go, and run by teams at AWS, NVIDIA, Microsoft, GitLab, and Red Hat.';
</script>

<MetaTags
	title="Vale: Your style, our editor"
	{description}
	canonical="https://vale.sh"
	openGraph={{
		url: 'https://vale.sh',
		title: 'Vale: Your style, our editor',
		description,
		images: [
			{
				url: '/media/mac.png',
				width: 800,
				height: 600,
				alt: 'Example Vale output'
			}
		]
	}}
/>

<main>
	<Overview />
	<div class="py-16 sm:py-20"><Integrations /></div>
	<CTA />
</main>
