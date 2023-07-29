<script lang="ts">
	import type { CurriculumData } from '$lib/types/curriculum';
	import type { PageData } from './$types';

	export let data: PageData;
	const curriculumData: CurriculumData | undefined = data?.data;
</script>

<main class="font-noto w-11/12 mx-auto max-w-[92rem] py-24">
	<h1 class="text-2xl font-bold text-center w-fit mx-auto py-4">
		{curriculumData?.Curriculum.Info.NameThai._text}
		<div class="relative w-full">
			<div class="bg-surface-50 w-fit mx-auto px-2 flex items-center">
				<code class="code text-xl">
					{data.courseId}
				</code>
			</div>
			<div
				class="-z-10 absolute w-full h-[2px] rounded-full bg-primary-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
			/>
		</div>
	</h1>

	<pre class="pre mt-52">{JSON.stringify(curriculumData)}</pre>
</main>
