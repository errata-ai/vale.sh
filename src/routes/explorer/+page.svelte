<script lang="ts">
	import PlusCircled from 'svelte-radix/PlusCircled.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import * as Tabs from '$lib/components/ui/tabs';
	import ResourceList from '$lib/components/docs/ResourceList.svelte';
</script>

<div class="col-span-3 lg:col-span-4 lg:border-l">
	<div class="h-full px-4 py-6 lg:px-8">
		<Tabs.Root value="music" class="h-full space-y-6">
			<div class="space-between flex items-center">
				<Tabs.List>
					<Tabs.Trigger value="music" class="relative">Packages</Tabs.Trigger>
					<Tabs.Trigger value="podcasts" disabled>Rules</Tabs.Trigger>
				</Tabs.List>
				<div class="ml-auto mr-4">
					<Button>
						<PlusCircled class="mr-2 h-4 w-4" />
						Add your own
					</Button>
				</div>
			</div>
			<Tabs.Content value="music" class="border-none p-0 outline-none">
				<div class="mx-auto max-w-7xl py-6">
					<ResourceList />
				</div>
			</Tabs.Content>
			<Tabs.Content
				value="podcasts"
				class="h-full flex-col border-none p-0 data-[state=active]:flex"
			>
				<div class="flex items-center justify-between">
					<div class="space-y-1">
						<h2 class="text-2xl font-semibold tracking-tight">New Episodes</h2>
						<p class="text-sm text-muted-foreground">Your favorite podcasts. Updated daily.</p>
					</div>
				</div>
				<Separator class="my-4" />
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>
