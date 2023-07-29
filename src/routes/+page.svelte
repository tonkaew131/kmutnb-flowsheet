<script lang="ts">
	import { goto } from '$app/navigation';

	function onSubmit(e: SubmitEvent) {
		const courseId = e?.target?.courseId?.value;

		goto(`/c/${courseId}`);
	}
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center font-noto">
	<form on:submit|preventDefault={onSubmit}>
		<label>
			<span class="font-bold">รหัสหลักสูตร</span>
			<input class="input px-4 py-3" type="text" name="courseId" placeholder="64046034" />
		</label>

		<button type="submit" class="btn variant-ghost-primary w-full font-bold tracking-widest mt-4"
			>ค้นหา</button
		>
	</form>

	<div class="absolute bottom-0 right-0 p-5">
		<a href="/docs" class="underline">Document</a>
	</div>
</div>
