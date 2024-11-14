<script lang="ts">
	import Banner from '$lib/components/landing/Banner.svelte';
	import Testimonials from '$lib/components/landing/Testimonials.svelte';
	import Integrations from '$lib/components/landing/Integrations.svelte';
	import FAQ from '$lib/components/landing/FAQ.svelte';
	import CTA from '$lib/components/landing/CTA.svelte';
	import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
	title="Vale: Your style, our editor"
	description="Vale is a command-line tool that brings code-like linting to prose. Vale is cross-platform (Windows, macOS, and Linux), written in Go, and available on GitHub."
	canonical="https://vale.sh"
	openGraph={{
		url: 'https://vale.sh',
		title: 'Vale: Your style, our editor',
		description:
			'Vale is a command-line tool that brings code-like linting to prose. Vale is cross-platform (Windows, macOS, and Linux), written in Go, and available on GitHub.',
		images: [
			{
				url: 'https://camo.githubusercontent.com/380138e374b8196f243f2621e74196ae92a7aba08bc3d2125bf09824238de1f7/68747470733a2f2f76616c652e73682f696d616765732f76616c652f6d61632e706e67',
				width: 800,
				height: 600,
				alt: 'Example Vale output'
			}
		]
	}}
/>

<Banner />
<Integrations />
<FAQ />
<Testimonials />
<CTA />
