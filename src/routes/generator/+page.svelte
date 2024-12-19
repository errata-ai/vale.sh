<script lang="ts">
	import CopyButton from '$lib/components/CopyButton.svelte';
	import { tick } from 'svelte';
	import { cn, createCopyCodeButton, copyStringToClipboard } from '$lib/utils.js';
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import TextEditor from '$lib/components/TextEditor.svelte';
	import { ConfigIniParser } from 'config-ini-parser';
	import { supplementaryStyles, baseStyles, configs } from './config.js';
	import { clean } from './util.js';

	const { copied, copyCode, codeString, setCodeString } = createCopyCodeButton();

	function handleCopy() {
		tick().then(() => {
			copyCode();
			copyStringToClipboard(value);
		});
	}

	let commentedHeader = `[*.{md}]
# ^ This section applies to only Markdown files.
#
# You can change (or add) file extensions here
# to apply these settings to other file types.
#
# For example, to apply these settings to both
# Markdown and reStructuredText:
#
# [*.{md,rst}]`;

	let value = $state(`StylesPath = styles

MinAlertLevel = suggestion

[*.{md}]
# ^ This section applies to only Markdown files.
#
# You can change (or add) file extensions here
# to apply these settings to other file types.
#
# For example, to apply these settings to both
# Markdown and reStructuredText:
#
# [*.{md,rst}]
BasedOnStyles = Vale`);

	let baseStyle = $state('');
	const baseLabel = $derived(
		baseStyles.find((f) => f.value === baseStyle)?.label ?? 'Select a style guide'
	);

	let selectedStyles = $state(['']);
	let selectedConfigs = $state(['']);

	// Generate the configuration file when any of the options change:
	$effect(() => {
		let pkgs = [];
		let styles = ['Vale'];

		const parser = new ConfigIniParser();

		const base = baseStyles.find((f) => f.value === baseStyle);
		if (base !== undefined) {
			pkgs.push(base.value);
			styles.push(base.value);
		}

		const supplementary = selectedStyles.map((s) => supplementaryStyles.find((f) => f.value === s));
		for (const s of supplementary) {
			if (s !== undefined) {
				pkgs.push(s.value);
				styles.push(s.value);
			}
		}

		const cfgs = selectedConfigs.map((c) => configs.find((f) => f.value === c));
		for (const c of cfgs) {
			if (c !== undefined) {
				pkgs.push(c.value);
			}
		}

		parser.parse(value);
		if (pkgs.length == 0) {
			parser.removeOption(null, 'Packages');
		} else {
			parser.set(null, 'Packages', pkgs.join(','));
		}

		parser.set('*.{md}', 'BasedOnStyles', styles.join(','));
		value = clean(parser.stringify()).replace('[*.{md}]', commentedHeader);
	});
</script>

<div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
	<Card.Root class="m-1">
		<Card.Header class="text-center">
			<Card.Title class="text-4xl">Config Generator</Card.Title>
			<Card.Description
				>Quickly generate comprehensive configuration files for Vale.</Card.Description
			>
		</Card.Header>
		<Card.Content>
			<form>
				<div class="grid w-full items-center gap-4">
					<div class="flex flex-col space-y-1.5">
						<Label for="base">Base style</Label>
						<p class="text-xs text-muted-foreground">
							A 'base' style is a comprehensive style guide that serves as a starting point for an
							in-house style. You generally should only use one at a time.
						</p>
						<Select.Root type="single" bind:value={baseStyle}>
							<Select.Trigger id="base">
								{baseLabel}
							</Select.Trigger>
							<Select.Content>
								{#each baseStyles as base}
									<Select.Item value={base.value} label={base.label} />
								{/each}
							</Select.Content>
						</Select.Root>
					</div>
					<div class="grid grid-cols-1 gap-4">
						<div class="flex flex-col space-y-1.5">
							<div>
								<Label for="supplementary">Supplementary styles</Label>
								<p class="text-xs text-muted-foreground">
									A 'supplementary' style is a smaller, more specific style that can be used
									alongside a base style.
								</p>
							</div>
							<div class="space-y-2">
								{#each supplementaryStyles as item, i}
									{@const checked = selectedStyles.includes(item.value)}
									<div class="flex flex-row items-start space-x-3">
										<Checkbox
											id="style-{i}"
											{checked}
											value={item.value}
											onCheckedChange={(v) => {
												if (v) {
													selectedStyles = [...selectedStyles, item.value];
												} else {
													selectedStyles = selectedStyles.filter((s) => s !== item.value);
												}
											}}
										/>
										<Label
											for="style-{i}"
											class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											{item.label}
										</Label>
									</div>
								{/each}
							</div>
						</div>
						<div class="flex flex-col space-y-1.5">
							<div>
								<Label for="supplementary">Configurations</Label>
								<p class="text-xs text-muted-foreground">
									These are format- and library-specific configurations for Vale (typically handling
									details like non-standard markup).
								</p>
							</div>
							<div class="space-y-2">
								{#each configs as item, i}
									{@const checked = selectedConfigs.includes(item.value)}
									<div class="flex flex-row items-start space-x-3">
										<Checkbox
											id="config-{i}"
											{checked}
											value={item.value}
											onCheckedChange={(v) => {
												if (v) {
													selectedConfigs = [...selectedConfigs, item.value];
												} else {
													selectedConfigs = selectedConfigs.filter((s) => s !== item.value);
												}
											}}
										/>
										<Label
											for="config-{i}"
											class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											{item.label}
										</Label>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="w-100 border-t-2 border-solid p-0">
			<div class="relative w-full">
				<TextEditor bind:value mode="ini" readonly={true} />
				<CopyButton
					copied={$copied}
					copyCode={handleCopy}
					className={cn('pre-copy-btn absolute right-4 top-4')}
				/>
			</div>
		</Card.Footer>
	</Card.Root>
	<div class="pt-2 text-sm text-muted-foreground">
		<p>
			<b>Tip</b>: After creating your <code>.vale.ini</code> file using the above config, run
			<code>vale sync</code> from the command line to initialize it. Check out the
			<a class="underline" href="/explorer">Package Explorer</a> for more information on the available
			styles and configurations.
		</p>
	</div>
</div>
