<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import { AppShell } from '@skeletonlabs/skeleton';

	import Analytics from '$lib/analytics.svelte';
</script>

<Analytics />
<AppShell>
	<slot />
</AppShell>

<div class="absolute bottom-0 right-0 p-5 flex gap-4">
	<a href="/docs" class="underline">Document</a>
	<a href="https://github.com/tonkaew131/kmutnb-flowsheet" class="underline">Source</a>
	<a href="/cookie" class="underline">Cookie Policy</a>
</div>
