<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	const MEASUREMENT_ID = 'G-TK45K6L1T4';

	$: {
		if (typeof gtag !== 'undefined') {
			gtag('config', MEASUREMENT_ID, {
				page_title: document.title,
				page_path: $page.url.pathname
			});

			const isConsent: boolean = localStorage.getItem('consent') === 'true';
		}
	}

	async function consentAccept() {
		localStorage.setItem('consent', 'true');
		gtag('consent', 'update', {
			ad_storage: 'granted',
			analytics_storage: 'granted'
		});
		location.reload();
	}

	async function consentDeny() {
		localStorage.setItem('consent', 'false');
		gtag('consent', 'update', {
			ad_storage: 'denied',
			analytics_storage: 'denied'
		});
		location.reload();
	}
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id={MEASUREMENT_ID}">
	</script>
	{@html `<script>
        const MEASUREMENT_ID = "${MEASUREMENT_ID}";
    </script>`}
	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}

		gtag('js', new Date());
		gtag('config', MEASUREMENT_ID);

		if (localStorage.getItem('consent') === null) {
			console.log('Denied consent');
			gtag('consent', 'default', {
				ad_storage: 'denied',
				analytics_storage: 'denied'
			});
		} else if (localStorage.getItem('consent') === 'true') {
			console.log('Accepted consent');
			gtag('consent', 'default', {
				ad_storage: 'granted',
				analytics_storage: 'granted'
			});
		}
	</script>
</svelte:head>

{#if browser && !localStorage.getItem('consent')}
	<div
		class="font-noto absolute z-50 max-w-[min(36rem,_95%)] card bg-surface-900-50-token text-surface-50-900-token p-2 px-8 bottom-2 left-1/2 -translate-x-1/2 w-full"
	>
		<p class="font-bold">เว็บไซต์นี้ใช้คุกกี้ที่ไม่จำเป็น (non-necessary cookies)</p>
		<p>
			เราใช้คุกกี้เพื่อเพิ่มประสิทธิภาพ และประสบการณ์ที่ดีในการใช้งานเว็บไซต์
			คุณสามารถเลือกตั้งค่าความยินยอมการใช้คุกกี้ได้ <a href="/cookie" class="anchor"
				>เราใช้คุกกี้คุณอย่างไร</a
			>
		</p>
		<div class="py-2">
			<button class="btn variant-ghost-primary" on:click={consentAccept}>ยินยอม 🥺</button>
			<button class="btn variant-ghost-error" on:click={consentDeny}>ไม่ยินยอม</button>
		</div>
	</div>
{/if}
