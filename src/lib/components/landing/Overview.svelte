<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import Check from 'lucide-svelte/icons/check';
	import SponsorSpotlight from './SponsorSpotlight.svelte';
	import AdopterConfigs from './AdopterConfigs.svelte';

	const config = `StylesPath = styles
MinAlertLevel = suggestion
Packages = Microsoft

[*.md]
BasedOnStyles = Vale, Microsoft`;
	const rule = `extends: substitution
message: "Use '%s' instead of '%s'."
level: warning
swap:
  utilize: use`;
	const features = [
		{
			number: '01',
			title: 'Your style guide, executable.',
			text: 'Choose a published style, add your terminology, or write your own YAML rules. Decide what matters and how strictly to enforce it.',
			link: '/explorer',
			label: 'Explore style packages'
		},
		{
			number: '02',
			title: 'It understands the document.',
			text: 'Check headings, paragraphs, and comments with rules that know the difference. Code blocks and inline code are skipped by default.',
			link: '/features/markup',
			label: 'Explore markup support'
		},
		{
			number: '03',
			title: 'Local. Fast. Yours.',
			text: 'Run on macOS, Windows, or Linux. Lint locally without sending your writing to a service. Open source and MIT-licensed.',
			link: '/features/speed',
			label: 'Meet the command line'
		}
	];
</script>

<section class="hero-shell">
	<div class="landing-wrap hero-grid">
		<div class="hero-copy">
			<a class="eyebrow" href="https://github.com/vale-cli/vale"
				>OPEN SOURCE · BUILT FOR WRITERS <span aria-hidden="true">↗</span></a
			>
			<h1>Your style.<br />Every <span>single doc.</span></h1>
			<p class="intro">
				Vale brings code-like linting to prose. Turn your team’s writing guidelines into checks that
				run in your editor and alongside your code.
			</p>
			<div class="actions">
				<Button size="lg" href="https://docs.vale.sh/topics/quickstart"
					>Get started <ArrowRight data-icon="inline-end" /></Button
				>
				<Button size="lg" variant="outline" href="#how-it-works">See how it works</Button>
			</div>
			<p class="hero-note">Your rules. Your workflow. Entirely offline.</p>
		</div>
		<figure class="document-demo" aria-label="Illustrative Vale style check on a Markdown document">
			<div class="file-bar">
				<span class="file-dot" aria-hidden="true"></span><span>getting-started.md</span><span
					class="example-label">EXAMPLE</span
				>
			</div>
			<div class="document-content">
				<p class="doc-kicker">DOCUMENTATION / QUICKSTART</p>
				<h2>A little clarity goes a long way.</h2>
				<p>You can <mark>utilize</mark> Vale to keep your team’s writing consistent.</p>
				<div class="annotation">
					<span aria-hidden="true">↳</span>
					<div>
						<strong>Prefer the simpler word.</strong><br /><span
							>Use “use” instead of “utilize”.</span
						>
					</div>
				</div>
				<p class="code-caption">Code stays code.</p>
				<code class="code-line">const word = "utilize";</code>
			</div>
			<figcaption>
				<span><Check size={14} aria-hidden="true" /> Prose checked. Code skipped.</span><span
					>1 warning</span
				>
			</figcaption>
		</figure>
	</div>
</section>

<SponsorSpotlight />
<AdopterConfigs />

<section id="features" class="landing-wrap feature-section" aria-labelledby="why-vale">
	<div class="section-heading">
		<p class="eyebrow">A SHARED STANDARD</p>
		<h2 id="why-vale">Many authors.<br />One voice.</h2>
		<p>
			Catch the small inconsistencies before review, so your team can focus on what the writing
			says.
		</p>
	</div>
	<div class="feature-grid">
		{#each features as feature}<article>
				<span class="feature-number">{feature.number} /</span>
				<h3>{feature.title}</h3>
				<p>{feature.text}</p>
				<a class="text-link" href={feature.link}
					>{feature.label} <span aria-hidden="true">↗</span></a
				>
			</article>{/each}
	</div>
</section>

<section id="how-it-works" class="workflow-shell">
	<div class="landing-wrap workflow-grid">
		<div class="section-heading">
			<p class="eyebrow">FROM GUIDELINES TO FEEDBACK</p>
			<h2>A few lines of config.<br />A consistent first draft.</h2>
			<p>
				Start with an existing style guide. Keep the configuration in your project so everyone runs
				the same checks.
			</p>
			<a class="text-link" href="https://docs.vale.sh/topics/quickstart"
				>Follow the quickstart <span aria-hidden="true">→</span></a
			>
			<ol class="steps">
				<li>
					<strong>Install Vale.</strong><span>Choose a package for your operating system.</span>
				</li>
				<li>
					<strong>Pick your styles.</strong><span
						>Save this as <code>.vale.ini</code> in your project.</span
					>
				</li>
				<li>
					<strong>Sync, then lint.</strong><span>Download the styles and check your docs.</span>
				</li>
			</ol>
		</div>
		<div class="config-example">
			<div class="file-bar">
				<span>.vale.ini</span><a href="https://docs.vale.sh/topics/quickstart"
					>Config reference ↗</a
				>
			</div>
			<pre><code>{config}</code></pre>
			<div class="command-example">
				<p><span>$</span> vale sync</p>
				<p><span>$</span> vale docs/</p>
			</div>
			<details>
				<summary>Make it your own with a YAML rule <span aria-hidden="true">+</span></summary>
				<pre><code>{rule}</code></pre>
				<a class="text-link rule-link" href="https://docs.vale.sh/topics/styles"
					>Learn to write rules →</a
				>
			</details>
		</div>
	</div>
</section>

<style>
	.landing-wrap {
		max-width: 1200px;
		margin-inline: auto;
		padding-inline: 32px;
	}
	.hero-shell {
		border-bottom: 1px solid hsl(var(--border));
		background: radial-gradient(ellipse at 80% 30%, hsl(var(--primary) / 0.09), transparent 60%);
	}
	.hero-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 64px;
		align-items: center;
		padding-block: 96px;
	}
	.eyebrow {
		font:
			600 11px/1.5 ui-monospace,
			monospace;
		letter-spacing: 0.12em;
		color: hsl(var(--muted-foreground));
	}
	h1 {
		font-size: clamp(3.5rem, 5.7vw, 5.25rem);
		font-weight: 500;
		line-height: 1.04;
		letter-spacing: -0.065em;
		margin-block: 24px;
	}
	h1 span {
		color: hsl(var(--primary));
	}
	.intro {
		max-width: 460px;
		font-size: 18px;
		line-height: 1.75;
		color: hsl(var(--muted-foreground));
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 32px;
	}
	.hero-note {
		margin-top: 20px;
		font-size: 12px;
		color: hsl(var(--muted-foreground));
	}
	.document-demo {
		min-width: 0;
		background: hsl(var(--card));
		border: 1px solid hsl(var(--border));
		border-radius: 12px;
		box-shadow: 0 24px 60px -25px hsl(var(--foreground) / 0.2);
		transform: rotate(1deg);
	}
	.file-bar {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 16px 22px;
		border-bottom: 1px solid hsl(var(--border));
		font:
			12px/1.5 ui-monospace,
			monospace;
		color: hsl(var(--muted-foreground));
	}
	.file-dot {
		width: 7px;
		height: 7px;
		background: hsl(var(--primary));
		border-radius: 50%;
	}
	.example-label {
		margin-left: auto;
		font-size: 9px;
		letter-spacing: 0.1em;
	}
	.document-content {
		padding: 36px 32px;
	}
	.doc-kicker {
		font:
			9px/1.5 ui-monospace,
			monospace;
		letter-spacing: 0.15em;
		color: hsl(var(--muted-foreground));
	}
	.document-content h2 {
		font:
			500 32px/1.2 Georgia,
			serif;
		letter-spacing: -0.02em;
		margin-block: 18px 24px;
	}
	.document-content > p:not(.doc-kicker):not(.code-caption) {
		font:
			18px/1.85 Georgia,
			serif;
	}
	mark {
		background: hsl(var(--primary) / 0.13);
		color: inherit;
		text-decoration: underline wavy hsl(var(--primary));
		text-underline-offset: 5px;
	}
	.annotation {
		display: flex;
		gap: 12px;
		margin-block: 20px 28px;
		padding: 15px;
		background: hsl(var(--accent));
		color: hsl(var(--accent-foreground));
		border-left: 2px solid hsl(var(--primary));
		font-size: 12px;
		line-height: 1.8;
	}
	.code-caption {
		font-size: 12px;
		color: hsl(var(--muted-foreground));
		margin-bottom: 10px;
	}
	.code-line {
		display: block;
		padding: 14px;
		background: hsl(var(--muted));
		font-size: 12px;
		overflow-wrap: anywhere;
	}
	figcaption {
		padding: 14px 20px;
		border-top: 1px solid hsl(var(--border));
		display: flex;
		justify-content: space-between;
		gap: 12px;
		font-size: 10px;
		color: hsl(var(--muted-foreground));
	}
	figcaption span:first-child {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.text-link {
		display: inline-flex;
		gap: 10px;
		align-items: center;
		font-size: 13px;
		font-weight: 500;
	}
	a:hover {
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	a:focus-visible,
	summary:focus-visible {
		outline: 2px solid hsl(var(--ring));
		outline-offset: 5px;
	}
	.feature-section {
		padding-block: 88px;
	}
	.section-heading h2 {
		font-size: clamp(2rem, 3.5vw, 2.9rem);
		font-weight: 500;
		line-height: 1.12;
		letter-spacing: -0.045em;
		margin-block: 18px;
	}
	.section-heading > p:not(.eyebrow) {
		max-width: 450px;
		line-height: 1.8;
		color: hsl(var(--muted-foreground));
	}
	.feature-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 40px;
		margin-top: 48px;
	}
	.feature-grid article {
		border-top: 1px solid hsl(var(--border));
		padding-top: 22px;
	}
	.feature-number {
		font:
			11px ui-monospace,
			monospace;
		color: hsl(var(--primary));
	}
	.feature-grid h3 {
		font-size: 20px;
		letter-spacing: -0.025em;
		margin-block: 22px 12px;
	}
	.feature-grid p {
		color: hsl(var(--muted-foreground));
		font-size: 14px;
		line-height: 1.85;
		margin-bottom: 22px;
	}
	.workflow-shell {
		background: hsl(var(--muted) / 0.5);
		border-block: 1px solid hsl(var(--border));
		scroll-margin-top: 100px;
	}
	.workflow-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 72px;
		padding-block: 80px;
		align-items: start;
	}
	.section-heading > .text-link {
		margin-top: 20px;
	}
	.steps {
		display: flex;
		flex-direction: column;
		gap: 22px;
		margin-top: 36px;
		counter-reset: step;
	}
	.steps li {
		display: grid;
		grid-template-columns: 26px 1fr;
		column-gap: 12px;
		font-size: 13px;
	}
	.steps li::before {
		counter-increment: step;
		content: counter(step, decimal-leading-zero);
		grid-row: span 2;
		font:
			11px/1.8 ui-monospace,
			monospace;
		color: hsl(var(--primary));
	}
	.steps span {
		color: hsl(var(--muted-foreground));
		margin-top: 4px;
		line-height: 1.6;
	}
	.config-example {
		min-width: 0;
		border: 1px solid hsl(var(--border));
		border-radius: 10px;
		background: hsl(var(--card));
		overflow: hidden;
	}
	.config-example .file-bar {
		justify-content: space-between;
	}
	.file-bar a {
		font-size: 10px;
	}
	pre {
		overflow-x: auto;
		padding: 28px;
		font-size: 13px;
		line-height: 2;
	}
	.command-example {
		padding: 20px 28px;
		border-top: 1px solid hsl(var(--border));
		font:
			13px/2 ui-monospace,
			monospace;
	}
	.command-example span {
		color: hsl(var(--primary));
		margin-right: 10px;
	}
	details {
		border-top: 1px solid hsl(var(--border));
	}
	summary {
		cursor: pointer;
		padding: 20px 24px;
		font-size: 12px;
	}
	summary span {
		float: right;
	}
	.rule-link {
		margin: 0 28px 24px;
	}
	@media (max-width: 900px) {
		.hero-grid {
			gap: 32px;
		}
		.workflow-grid {
			gap: 32px;
		}
	}
	@media (max-width: 700px) {
		.landing-wrap {
			padding-inline: 24px;
		}
		.hero-grid,
		.workflow-grid {
			grid-template-columns: 1fr;
			padding-block: 48px;
			gap: 40px;
		}
		.hero-copy {
			max-width: 500px;
		}
		.document-demo {
			transform: none;
		}
		.feature-grid {
			grid-template-columns: 1fr;
			gap: 30px;
		}
		.feature-section {
			padding-block: 56px;
		}
		.document-content {
			padding: 28px 24px;
		}
	}
</style>
