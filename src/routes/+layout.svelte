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
