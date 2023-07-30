<script>
	import { page } from '$app/stores';

	import '../tailwind.postcss';
</script>

<div
	class="text-4xl text-center h-screen flex flex-col items-center justify-center font-noto font-bold text-primary-500"
>
	<h1 class="">
		{$page?.error?.message || 'Something went wrong! Please contact @tonkaew131'}
	</h1>
	<h2 class="font-black text-black tracking-widest">{$page.status}</h2>

	{#if $page.status == 500}
		<h2 class="text-center text-2xl text-black leading-none pt-8">
			ติดต่อ @tonkaew131
			<br />
			<code class="code"
				>{new Date(Date.now()).toLocaleDateString('en-GB', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
				{new Date(Date.now()).toLocaleTimeString('th-TH')}</code
			>
			<code class="ml-2 code">{$page.url}</code>
		</h2>
	{/if}
</div>
