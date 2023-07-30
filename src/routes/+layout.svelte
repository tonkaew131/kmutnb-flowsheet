<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import { AppShell } from '@skeletonlabs/skeleton';

	import Analytics from '$lib/analytics.svelte';
</script>

<svelte:head>
	<title>KMUTNB Flowsheet by @tonkaew131</title>
	<meta name="description" content="KMUTNB Flowsheet ดูแผนการเรียน by @tonkaew131" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#f77100" />

	<link rel="icon" type="image/x-icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" href="/favicon.png" />
	<!-- <link rel="manifest" href="/manifest.json" /> -->

	<meta property="og:title" content="KMUTNB Flowsheet by @tonkaew131" />
	<meta property="og:description" content="KMUTNB Flowsheet by @tonkaew131" />
	<meta property="og:image" content="/favicon.png" />
	<meta property="og:url" content="https://kmutnb-flowsheet.vercel.app/" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<Analytics />
<AppShell>
	<slot />
</AppShell>

<div class="absolute bottom-0 right-0 p-5 flex gap-4">
	<a href="/docs" class="underline">Document</a>
	<a href="https://github.com/tonkaew131/kmutnb-flowsheet" class="underline">Source</a>
	<a href="/cookie" class="underline">Cookie Policy</a>
</div>
