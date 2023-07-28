<script lang="ts">
	import type { ActionData } from './$types';
	import { clipboard } from '@skeletonlabs/skeleton';

	let tisText = '';

	export let form: ActionData;
</script>

<main class="prose py-36 mx-auto">
	<h1>TIS-640 to UTF-8</h1>

	<form method="POST">
		<label>
			TIS-640
			<textarea bind:value={tisText} id="input" name="input" class="input px-2" />
		</label>

		<button class="btn variant-filled-primary">Convert!</button>
	</form>

	<div class="pt-8">
		<div class="flex items-center gap-1 py-2">
			UTF-8
			<button class="btn variant-ghost-primary" use:clipboard={form?.data || ''}>Copy</button>
		</div>
		<pre class="m-0" data-clipboard="output">{form?.data || '( ´･･)ﾉ(._.`)'}</pre>
	</div>
</main>
