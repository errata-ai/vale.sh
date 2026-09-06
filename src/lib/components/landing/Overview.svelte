<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import type { Stats } from '$lib/types/stats';
	import { assistants } from '$lib/assistants';

	let { stats }: { stats: Stats } = $props();
	const starLabel = $derived(
		new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(
			stats.stars
		)
	);

	/*
		The figure reads top to bottom: a line from a team's writing guide, the
		rule that encodes it, and the alert that rule raises in a doc. The rule
		is a real `substitution` rule and the message is what Vale prints for
		it. One guideline rather than several, because the point is the shape
		of the stage from prose to YAML, not how many steps a guide has.
	*/
</script>

<section class="hero-shell">
	<div class="landing-wrap hero-grid">
		<div class="hero-copy">
			<a class="eyebrow" href="https://github.com/vale-cli/vale"
				>OPEN SOURCE · MIT · {starLabel} STARS <span aria-hidden="true">↗</span></a
			>
			<h1>Your style,<br />our editor.</h1>
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

		<figure
			class="flow"
			aria-label="How a guideline becomes a rule, and a rule becomes an alert: a line from a writing guide, the five-line YAML rule that encodes it, and the error it raises in a Markdown file"
		>
			<div class="stage">
				<div class="stage-label"><span class="n">01</span>Guideline</div>
				<div class="stage-body">
					<p class="guide-kicker">Writing guide · Terminology</p>
					<p class="guide-text">
						The product is <strong>Vale CLI</strong>. Don’t write <s>Vale cli</s> or
						<s>vale-cli</s>.
					</p>
				</div>
			</div>

			<div class="stage">
				<div class="stage-label"><span class="n">02</span>Rule</div>
				<div class="stage-body">
					<p class="file">styles/Docs/Terms.yml</p>
					<pre class="yaml"><b>extends:</b> substitution
<b>message:</b> "Use '%s' instead of '%s'."
<b>level:</b> error
<b>swap:</b>
  Vale cli: Vale CLI</pre>
				</div>
			</div>

			<div class="stage">
				<div class="stage-label"><span class="n">03</span>Every doc</div>
				<div class="stage-body doc">
					<p class="file">docs/install.md</p>
					<ol class="lines">
						<li><span class="src"><span class="syntax">#</span> Installation</span></li>
						<li><span class="src"></span></li>
						<li>
							<span class="src"><mark>Vale cli</mark> runs on macOS, Windows, and Linux.</span>
						</li>
					</ol>
					<div class="alert">
						<span class="sev">error</span>
						<span>Use 'Vale CLI' instead of 'Vale cli'.</span>
						<span class="rule-name">Docs.Terms</span>
					</div>
				</div>
			</div>

			<figcaption>
				Five lines of YAML per guideline. Or start from Microsoft, Google, and fourteen other
				published styles.
			</figcaption>
		</figure>
	</div>
</section>

<div class="agent-strip landing-wrap">
	<div>
		<span>Setting up with an agent?</span>{#each assistants as assistant}<a
				href={assistant.href}
				target="_blank"
				rel="noreferrer">{assistant.label} ↗</a
			>{/each}<a href="/skills">Agent skills →</a>
	</div>
	<p>
		Thanks to <a href="https://claude.com/contact-sales/claude-for-oss">Claude for Open Source</a>.
	</p>
</div>

<style>
	.landing-wrap {
		max-width: 1152px;
		margin-inline: auto;
		padding-inline: 32px;
	}
	.hero-shell {
		border-bottom: 1px solid hsl(var(--border));
		background: radial-gradient(ellipse at 80% 30%, hsl(var(--primary) / 0.09), transparent 60%);
	}
	.hero-grid {
		display: grid;
		grid-template-columns: 1fr 1.15fr;
		gap: 64px;
		align-items: center;
		padding-block: 72px;
	}
	.hero-copy {
		max-width: 500px;
	}
	.eyebrow {
		font:
			600 11px/1.5 ui-monospace,
			monospace;
		letter-spacing: 0.12em;
		color: hsl(var(--muted-foreground));
	}
	h1 {
		font-size: clamp(3.5rem, 5.8vw, 5rem);
		font-weight: 500;
		line-height: 1.04;
		letter-spacing: -0.055em;
		margin-block: 24px;
	}
	.intro {
		max-width: 460px;
		font-size: 18px;
		line-height: 1.75;
		color: hsl(var(--foreground) / 0.85);
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
	a:hover {
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	a:focus-visible {
		outline: 2px solid hsl(var(--ring));
		outline-offset: 3px;
	}

	/* The figure: three steps stacked in one card. */
	.flow {
		--error: #ef4444;
		min-width: 0;
		border: 1px solid hsl(var(--border));
		border-radius: 16px;
		background: hsl(var(--card));
		box-shadow: 0 24px 60px -25px hsl(var(--foreground) / 0.2);
		overflow: hidden;
	}
	.stage {
		display: grid;
		grid-template-columns: 116px minmax(0, 1fr);
	}
	.stage + .stage {
		border-top: 1px solid hsl(var(--border));
	}
	.stage-label {
		display: flex;
		gap: 8px;
		padding: 18px 16px;
		border-right: 1px solid hsl(var(--border));
		background: hsl(var(--muted));
		font:
			500 11px/1.6 ui-monospace,
			monospace;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: hsl(var(--muted-foreground));
	}
	.stage-label .n {
		color: hsl(var(--primary));
	}
	.stage-body {
		min-width: 0;
		padding: 16px 20px;
	}
	.file {
		margin-bottom: 8px;
		font:
			11px/1.5 ui-monospace,
			monospace;
		color: hsl(var(--muted-foreground));
	}

	/* 01: a paragraph as it reads in a wiki. */
	.guide-kicker {
		font:
			500 11px/1.5 system-ui,
			sans-serif;
		letter-spacing: 0.04em;
		color: hsl(var(--muted-foreground));
	}
	.guide-text {
		margin-top: 6px;
		font:
			16px/1.6 Georgia,
			'Times New Roman',
			serif;
		color: hsl(var(--foreground));
	}
	.guide-text strong {
		font-weight: 700;
	}
	.guide-text s {
		color: hsl(var(--muted-foreground));
		text-decoration-color: var(--error);
	}

	/* 02: the YAML, keys muted so the pair at the bottom reads first. */
	.yaml {
		margin: 0;
		padding: 0;
		border: 0;
		border-radius: 0;
		background: none;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
		font:
			12.5px/1.75 ui-monospace,
			monospace;
		color: hsl(var(--foreground));
	}
	.yaml b {
		font-weight: 400;
		color: hsl(var(--muted-foreground));
	}

	/* 03: three lines of an editor and the diagnostic under them. */
	.doc {
		font:
			12.5px/1.75 ui-monospace,
			monospace;
	}
	.lines {
		list-style: none;
		margin: 0;
		padding: 0;
		counter-reset: line;
	}
	.lines li {
		display: grid;
		grid-template-columns: 18px minmax(0, 1fr);
		gap: 12px;
	}
	.lines li::before {
		counter-increment: line;
		content: counter(line);
		text-align: right;
		font-size: 11px;
		color: hsl(var(--muted-foreground) / 0.6);
	}
	.src {
		min-width: 0;
		min-height: 1.75em;
		overflow-wrap: anywhere;
	}
	.syntax {
		color: hsl(var(--muted-foreground));
	}
	mark {
		margin: 0 -2px;
		padding: 0 2px;
		border-bottom: 2px solid var(--error);
		border-radius: 2px;
		background: color-mix(in srgb, var(--error) 12%, transparent);
		color: inherit;
	}
	.alert {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 4px 10px;
		margin-top: 12px;
		padding: 8px 12px;
		border: 1px solid hsl(var(--border));
		border-left: 3px solid var(--error);
		border-radius: 8px;
		background: hsl(var(--muted));
		font:
			12px/1.6 system-ui,
			sans-serif;
	}
	.sev {
		font:
			600 11px/1.6 ui-monospace,
			monospace;
		color: var(--error);
	}
	.rule-name {
		margin-left: auto;
		font:
			11px/1.6 ui-monospace,
			monospace;
		color: hsl(var(--muted-foreground));
	}

	figcaption {
		padding: 12px 20px;
		border-top: 1px solid hsl(var(--border));
		background: hsl(var(--muted));
		font-size: 12px;
		line-height: 1.6;
		color: hsl(var(--muted-foreground));
	}

	/* The line under the hero */
	.agent-strip {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding-block: 20px;
		font-size: 12px;
		color: hsl(var(--muted-foreground));
	}
	.agent-strip > div {
		display: flex;
		flex-wrap: wrap;
		gap: 12px 22px;
	}
	.agent-strip a {
		color: hsl(var(--foreground));
		text-decoration: underline;
		text-underline-offset: 4px;
		text-decoration-color: hsl(var(--border));
	}
	.agent-strip > p {
		font-size: 10px;
	}

	@media (max-width: 900px) {
		.hero-grid {
			grid-template-columns: 1fr;
			gap: 36px;
			padding-block: 56px;
		}
		h1 {
			font-size: clamp(2.5rem, 9vw, 5rem);
			margin-block: 20px;
		}
		.actions {
			margin-top: 28px;
		}
		.hero-note {
			margin-top: 16px;
		}
		.hero-copy {
			max-width: 640px;
			margin-inline: auto;
			text-align: center;
		}
		.intro {
			max-width: none;
		}
		.actions {
			justify-content: center;
		}
	}
	@media (max-width: 700px) {
		.landing-wrap {
			padding-inline: 24px;
		}
		.hero-grid {
			gap: 32px;
			padding-block: 40px;
		}
		.hero-copy {
			max-width: 520px;
		}
		.eyebrow {
			display: inline-block;
			font-size: 10px;
			letter-spacing: 0.08em;
		}
		.stage {
			grid-template-columns: 1fr;
		}
		.stage-label {
			padding: 8px 16px;
			border-right: 0;
			border-bottom: 1px solid hsl(var(--border));
		}
	}
</style>
