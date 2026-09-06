<script lang="ts">
	/*
		A multi-select: a button that opens a searchable, grouped list, and
		leaves it open while the reader picks several. What is chosen shows as
		chips under the button, where the page can annotate each one.
	*/
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils.js';
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';

	export type Choice = {
		value: string;
		label: string;
		/** Rows are grouped under this heading when there is more than one. */
		group?: string;
		/** Shown in mono after the label: an extension, a rule count. */
		hint?: string;
		description?: string;
		/** Extra words the search should match. */
		keywords?: string[];
	};

	let {
		id,
		choices,
		selected = $bindable([]),
		placeholder = 'Search…',
		empty = 'Nothing matches.',
		onToggle
	}: {
		id: string;
		choices: Choice[];
		selected: string[];
		placeholder?: string;
		empty?: string;
		/** Called instead of the default toggle, when a pick has side effects. */
		onToggle?: (value: string) => void;
	} = $props();

	let open = $state(false);
	// This bits-ui does not expose the anchor's width, so it is measured.
	let width = $state(0);

	const groups = $derived([...new Set(choices.map((c) => c.group ?? ''))]);
	const chosen = $derived(selected.map((v) => choices.find((c) => c.value === v)).filter(Boolean));

	function toggle(value: string) {
		if (onToggle) {
			onToggle(value);
			return;
		}
		selected = selected.includes(value)
			? selected.filter((v) => v !== value)
			: [...selected, value];
	}
</script>

<Popover.Root bind:open>
	<div bind:clientWidth={width}>
		<Popover.Trigger
			{id}
			role="combobox"
			aria-expanded={open}
			class={cn(buttonVariants({ variant: 'outline' }), 'w-full justify-between font-normal')}
		>
			<span class="truncate">
				{#if chosen.length === 0}
					<span class="text-muted-foreground">{placeholder}</span>
				{:else}
					{chosen.map((c) => c!.label).join(', ')}
				{/if}
			</span>
			<ChevronsUpDown class="opacity-50" />
		</Popover.Trigger>
	</div>
	<Popover.Content class="w-auto p-0" align="start">
		<!-- The floating layer writes its own inline styles, so the width goes inside. -->
		<div style="width: {width}px">
			<Command.Root>
				<Command.Input {placeholder} />
				<Command.List class="max-h-80">
					<Command.Empty>{empty}</Command.Empty>
					{#each groups as group}
						<Command.Group heading={groups.length > 1 ? group : undefined}>
							{#each choices.filter((c) => (c.group ?? '') === group) as c (c.value)}
								{@const on = selected.includes(c.value)}
								<Command.Item
									value={c.value}
									keywords={[c.label, ...(c.keywords ?? [])]}
									onSelect={() => toggle(c.value)}
								>
									<Check class={cn('self-start', !on && 'text-transparent')} />
									<span class="flex min-w-0 flex-col">
										<span class="flex items-baseline gap-2 whitespace-nowrap">
											<span class="font-medium">{c.label}</span>
											{#if c.hint}<span class="font-mono text-xs text-muted-foreground"
													>{c.hint}</span
												>{/if}
										</span>
										{#if c.description}
											<span class="text-xs text-muted-foreground">{c.description}</span>
										{/if}
									</span>
								</Command.Item>
							{/each}
						</Command.Group>
					{/each}
				</Command.List>
			</Command.Root>
		</div>
	</Popover.Content>
</Popover.Root>
