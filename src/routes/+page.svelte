<script lang="ts">
	import { goto } from '$app/navigation';
	import { courseList } from '$lib/courseList';

	function onSubmit(e: any) {
		const courseId = e?.target?.courseId?.value;

		goto(`/c/${courseId}`);
	}
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center font-noto">
	<form on:submit|preventDefault={onSubmit}>
		<label>
			<span class="font-bold">คณะ</span>
			<select class="select">
				<option value="NONE" selected disabled>- - - เลือกคณะ - - -</option>
				{#each Object.keys(courseList).sort() as c}
					<option value={c}>{courseList[c].name}</option>
				{/each}
			</select>
		</label>

		<div class="relative">
			<div
				class="h-[2px] -z-10 w-full bg-primary-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
			/>
			<p class="text-center w-fit mx-auto bg-surface-50 px-2">หรือ</p>
		</div>

		<label>
			<span class="font-bold">รหัสหลักสูตร</span>
			<input class="input px-4 py-3" type="text" name="courseId" placeholder="64046034" />
		</label>

		<button type="submit" class="btn variant-ghost-primary w-full font-bold tracking-widest mt-4"
			>ค้นหา</button
		>
	</form>
</div>
