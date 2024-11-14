<script lang="ts">
	let { name, link, logo, info }: { name: string; link: string; logo: string; info: string } =
		$props();
</script>

<a href={link} class="flex flex-1 flex-col no-underline">
	<div class="flex flex-1 flex-col p-8">
		<img class="mx-auto size-32 shrink-0" src={logo} alt={info} />
		<h3 class="mt-6 text-sm font-medium">{name}</h3>
		<dl class="mt-1 flex grow flex-col justify-between">
			<dt class="sr-only">Title</dt>
			<dd class="text-sm text-muted-foreground">{info}</dd>
			<!--
			<dt class="sr-only">Tags</dt>
			<dd class="mt-3">
				<span
					class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
					>Admin</span
				>
			</dd>-->
		</dl>
	</div>
</a>
