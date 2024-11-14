<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
</script>

{#snippet command(pkg: string, cmd: string, arg: string)}
	{@const shell = pkg === 'choco' ? 'powershell' : 'bash'}
	{@const token = pkg === 'choco' ? '>' : '$'}
	<pre
		class="shiki shiki-themes github-light slack-dark"
		style="background-color:#fff;--shiki-dark-bg:#222222;color:#24292e;--shiki-dark:#E6E6E6"
		tabindex="0"><div class="pre-header"><div class="wrapper-copy-code"><div
					class="code-block-title">{shell}</div><button
					class="copy-code"
					onclick={() => {
						navigator.clipboard.writeText([pkg, cmd, arg].join(' '));
						const button = document.querySelector('.copy-code');
						if (!button) return;
						button.textContent = 'Copied!';
						setTimeout(() => {
							button.textContent = 'Copy';
						}, 1000);
					}}>Copy</button
				></div></div><code
			><span class="line"
				><span style="color:#6F42C1;--shiki-dark:#DCDCAA">{token} {pkg}</span><span
					style="color:#032F62;--shiki-dark:#CE9178"> {cmd}</span
				><span style="color:#032F62;--shiki-dark:#CE9178"> {arg}</span></span
			></code
		></pre>
{/snippet}

<Tabs.Root value="win" class="">
	<Tabs.List>
		<Tabs.Trigger value="win">Windows</Tabs.Trigger>
		<Tabs.Trigger value="mac">macOS</Tabs.Trigger>
		<Tabs.Trigger value="linux">Linux</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="win">
		{@render command('choco', 'install', 'vale')}
	</Tabs.Content>
	<Tabs.Content value="mac">
		{@render command('brew', 'install', 'vale')}
	</Tabs.Content>
	<Tabs.Content value="linux">
		{@render command('snap', 'install', 'vale')}
	</Tabs.Content>
</Tabs.Root>
