<script lang="ts">
	import { getPlansList, type CurriculumData, type Plan, getSubject } from '$lib/types/curriculum';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;
	const curriculumData: CurriculumData | undefined = data?.data;

	const plansList = getPlansList(curriculumData);

	let selectedPlanCode: string | undefined = undefined;
	let planData: Plan | undefined;
	$: planData = curriculumData?.Curriculum.Plans.Plan.find(
		(pn) => pn._attributes.scheme === selectedPlanCode
	);
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

	<div class="flex flex-col">
		<p class="font-bold">แผนการศึกษา</p>
		<select class="select w-fit" bind:value={selectedPlanCode}>
			{#each plansList as pn}
				<option value={pn.planCode}>
					{pn.planeNameThai}
				</option>
			{/each}
		</select>
	</div>

	<div>
		<!-- Each Year -->
		{#each planData?.YearSem || [] as yr}
			<h3 class="font-bold py-2 text-xl indent-8">
				ปี {yr._attributes.year} เทอม {yr._attributes.sem} ({yr._attributes.crd} หน่วยกิต)
			</h3>
			<!-- Each Subject -->
			{#each yr.Course as sj}
				<div class="card p-2">
					<p class="font-bold">
						{getSubject(curriculumData, sj._attributes.code)?._attributes.code}
					</p>
					<p class="italic">{getSubject(curriculumData, sj._attributes.code)?.NameThai._text}</p>
				</div>
				<!-- <pre class="pre mt-52">{JSON.stringify(
						getSubject(curriculumData, sj._attributes.code),
						null,
						4
					)}</pre> -->
			{/each}
		{/each}
	</div>

	<pre class="pre mt-52">{JSON.stringify(curriculumData, null, 4)}</pre>
</main>
