<script lang="ts">
	import {
		getPlansList,
		type CurriculumData,
		type Plan,
		getSubject,
		getNode,
		type CoursePlan
	} from '$lib/types/curriculum';
	import { Accordion, AccordionItem, modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;
	const curriculumData: CurriculumData | undefined = data?.data;

	const plansList = getPlansList(curriculumData);

	let selectedPlanCode: string | undefined = undefined;
	let planData: Plan | undefined;
	$: planData = curriculumData?.Curriculum.Plans.Plan.find(
		(pn) => pn._attributes.scheme === selectedPlanCode
	);

	// Table
	let tableData: CurriculumTableData = {
		years: {},
		rows: {}
	};

	$: {
		// Reset When Plan Changed
		let _tableData = { ...tableData };
		_tableData.years = {};
		_tableData.rows = {};

		let totalCols = 0;
		planData?.YearSem.forEach((yr) => {
			if (!_tableData.years[yr._attributes.year])
				_tableData.years[yr._attributes.year] = { semester: [] };

			_tableData?.years[yr._attributes.year].semester.push(yr._attributes.sem);
			totalCols += 1;
		});
		_tableData.totalCols = totalCols;

		let yearCounter = 1;
		planData?.YearSem.forEach((yr) => {
			let counter = 1;
			(Array.isArray(yr.Course) ? yr.Course : [yr.Course]).forEach((sj) => {
				if (!_tableData.rows[counter]) _tableData.rows[counter] = {};

				_tableData.rows[counter][yearCounter] = sj;
				counter += 1;
			});

			yearCounter += 1;
		});

		tableData = _tableData;
	}

	console.log(tableData);

	interface CurriculumTableData {
		years: {
			[year: string]: {
				semester: string[];
			};
		};
		rows: {
			[rowsNum: string]: {
				[colsNum: string]: CoursePlan;
			};
		};
		totalCols: number;
	}

	function onClickSubject(subjectCode: string) {
		const subject = getSubject(curriculumData, subjectCode);
		if (!subject) {
			const modal: ModalSettings = {
				type: 'alert',
				title: `ไม่พบข้อมูลวิชา ${subjectCode}`
			};
			modalStore.trigger(modal);
			return;
		}

		const modal: ModalSettings = {
			type: 'alert',
			// Data
			title: `${subjectCode} - ${subject?.NameThai._text} ${subject?.Crd_Lec._text}(${subject?.Crd_Lec._text}-${subject?.Crd_Lab._text})`,
			body: `- ${subject.NameEng._text} (${subject.ShrtName._text})\n\n- ${subject.DescThai._text}\n\n- ${subject.DescEng._text}`
		};
		modalStore.trigger(modal);
	}
</script>

<a href="/" class="absolute top-2 left-2 z-20"
	><button class="btn variant-filled-primary underline"> Back to Search</button>
</a>

<main class="font-noto w-11/12 mx-auto max-w-[92rem] py-24 pb-48">
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

	<div class="table-container my-8">
		<h2 class="mb-2 text-2xl font-bold">Flow Sheets</h2>
		<table class="table bg-transparent">
			<thead>
				<tr class="[&>*:first-child]:border-l-0 [&>*:last-child]:border-r-0">
					{#each Object.keys(tableData.years) || [] as yr}
						<th
							class="text-center border-b-4 border-x-4 border-surface-50"
							colspan={tableData.years[yr].semester.length}
						>
							ปี {yr}
						</th>
					{/each}
				</tr>
				<tr class="[&>*:first-child]:border-l-0 [&>*:last-child]:border-r-0">
					{#each Object.keys(tableData.years) || [] as yr}
						{#each tableData.years[yr].semester || [] as sem}
							<th class="text-center border-x-4 border-b-4 border-surface-50" colspan="1">
								เทอม {sem}
							</th>
						{/each}
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each Object.keys(tableData.rows) as rw}
					<tr
						class="[&>*:first-child]:border-l-0 [&>*:last-child]:border-r-0 !border-b-transparent"
					>
						{#each Object.keys(tableData.rows[rw]) as cl}
							{@const sj = tableData.rows[rw][cl]}
							<td
								class="card border-b-4 border-x-4 border-surface-50 min-w-[11rem] w-[calc(100%_/_8)] hover:bg-primary-200"
							>
								<button
									on:click={(e) => onClickSubject(sj._attributes.code)}
									class="hover:cursor-pointer text-left w-full h-full"
								>
									<p class="font-bold">
										{sj._attributes.code}
									</p>
									<p class="italic max-w-[15rem] whitespace-normal">
										{#if getSubject(curriculumData, sj._attributes.code)}
											{@const subjectData = getSubject(curriculumData, sj._attributes.code)}
											{subjectData?.NameThai._text}
											{subjectData?.Crd_Lec._text}({subjectData?.Crd_Lec._text}-{getSubject(
												curriculumData,
												sj._attributes.code
											)?.Crd_Lab._text})
										{:else}
											{getNode(curriculumData, sj.Block._text)?.NameThai._text}
										{/if}
									</p>
								</button>
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">แผนการศึกษา</h2>

		<!-- Each Year -->
		{#each planData?.YearSem || [] as yr (`${selectedPlanCode}-${yr._attributes.year}-${yr._attributes.sem}`)}
			<h3 class="font-bold my-2 text-xl ml-8 w-fit pt-2">
				ปี {yr._attributes.year} เทอม {yr._attributes.sem} ({yr._attributes.crd} หน่วยกิต)
				<div class="h-[2px] w-full bg-primary-500 rounded-full" />
			</h3>
			<!-- Each Subject  -->
			<div class="flex flex-col gap-2">
				{#each Array.isArray(yr.Course) ? yr.Course : [yr.Course] as sj}
					<div class="card p-2">
						<p class="font-bold">
							{sj._attributes.code}
						</p>
						<p class="italic">
							{#if getSubject(curriculumData, sj._attributes.code)}
								{@const subjectData = getSubject(curriculumData, sj._attributes.code)}
								{subjectData?.NameThai._text}
								{subjectData?.Crd_Lec._text}({subjectData?.Crd_Lec._text}-{getSubject(
									curriculumData,
									sj._attributes.code
								)?.Crd_Lab._text})
							{:else}
								{getNode(curriculumData, sj.Block._text)?.NameThai._text}
							{/if}
						</p>
					</div>
					<!-- <pre class="pre mt-52">{JSON.stringify(sj, null, 4)}</pre> -->
				{/each}
			</div>
		{/each}
	</div>

	<div class="my-8">
		<h2 class="mb-2 text-2xl font-bold">Data Source</h2>
		<Accordion>
			<AccordionItem>
				<svelte:fragment slot="lead">-</svelte:fragment>
				<svelte:fragment slot="summary"><span class="font-bold">JSON</span></svelte:fragment>
				<svelte:fragment slot="content">
					<pre class="pre">{JSON.stringify(curriculumData, null, 4)}</pre>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</div>
</main>
