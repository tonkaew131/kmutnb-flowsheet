<script>
	import { page } from '$app/stores';

	import '../tailwind.postcss';
</script>

<div class="text-4xl text-center h-screen flex flex-col items-center justify-center font-noto font-bold text-primary-500">
	<h1 class="">
		{$page?.error?.message || 'Something went wrong! Please contact @tonkaew131'}
	</h1>
    <h2 class="font-black text-black tracking-widest">{$page.status}</h2>
</div>
