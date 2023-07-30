<script lang="ts">
	import {
		getPlansList,
		type CurriculumData,
		type Plan,
		getSubject,
		getNode,
		type CoursePlan,
		getSubjectPrerequisite,
		type SubjectPrerequisite
	} from '$lib/types/curriculum';
	import {
		Accordion,
		AccordionItem,
		modalStore,
		type ModalSettings,
		SlideToggle
	} from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;
	const curriculumData: CurriculumData | undefined = data?.data;

	let isThai: boolean = false;

	const plansList = getPlansList(curriculumData);

	let selectedPlanCode: string | undefined = undefined;
	let planData: Plan | undefined;
	$: planData = (
		Array.isArray(curriculumData?.Curriculum.Plans.Plan)
			? curriculumData?.Curriculum.Plans.Plan || []
			: [curriculumData?.Curriculum.Plans.Plan]
	).find((pn) => pn._attributes.scheme === selectedPlanCode);

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
		totalCols?: number;
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

		const subjectPrereq = getSubjectPrerequisite(curriculumData, subjectCode);

		const subjectPrereqStr = `- วิชาบังคับ: ${subjectPrereq?.prerequisite.map((s) => {
			return `${s} ${
				isThai
					? getSubject(curriculumData, s)?.NameThai._text
					: getSubject(curriculumData, s)?.NameEng._text
			}`;
		})}\n`;

		const modal: ModalSettings = {
			type: 'alert',
			// Data
			title: `${subjectCode} - ${subject?.NameThai._text} ${subject?.Crd_Lec._text}(${subject?.Crd_Lec._text}-${subject?.Crd_Lab._text})`,
			body: `- ${subject.NameEng._text} (${subject.ShrtName._text})\n${
				subjectPrereq?.prerequisite.length != 0 ? subjectPrereqStr : ''
			}\n- ${subject.DescThai._text}\n- ${subject.DescEng._text}`
		};
		modalStore.trigger(modal);
	}

	// Optimize a bit
	let subjectPrereqTable: { [key: string]: SubjectPrerequisite } = {};
	function onOverSubject(type: 'enter' | 'leave', subjectCode: string) {
		let subjectReq: SubjectPrerequisite | undefined;

		if (subjectCode in subjectPrereqTable) {
			subjectReq = subjectPrereqTable[subjectCode];
		} else {
			subjectReq = getSubjectPrerequisite(curriculumData, subjectCode, true);
			if (!subjectReq) {
				return;
			}
			subjectPrereqTable[subjectCode] = subjectReq;
		}

		subjectReq.prerequisite.forEach((s) => {
			if (type == 'enter') {
				document.getElementById(s)?.classList.add('!bg-yellow-100');
			} else {
				document.getElementById(s)?.classList.remove('!bg-yellow-100');
			}
		});

		if (subjectReq.prerequisiteSequence) {
			subjectReq.prerequisiteSequence.forEach((s) => {
				if (subjectReq?.prerequisite.includes(s)) return;
				if (type == 'enter') {
					document.getElementById(s)?.classList.add('!bg-lime-100');
				} else {
					document.getElementById(s)?.classList.remove('!bg-lime-100');
				}
			});
		}
		return;
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

	<div class="flex gap-8 items-center">
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

		<div class="flex flex-col">
			<p class="font-bold">ภาษา <span class="opacity-50">(EN/TH)</span></p>
			<SlideToggle name="slide" bind:checked={isThai} active="bg-primary-500" />
		</div>
	</div>

	<div class="table-container my-8">
		<h2 class="mb-2 text-2xl font-bold">Flow Sheets</h2>
		<table class="table bg-transparent">
			<thead>
				<tr class="[&>*:first-child]:border-l-0 [&>*:last-child]:border-r-0">
					{#each Object.keys(tableData.years) || [] as yr}
						<th
							class="text-center border-b-4 border-x-4 border-surface-50 bg-surface-300"
							colspan={tableData.years[yr].semester.length}
						>
							ปี {yr}
						</th>
					{/each}
				</tr>
				<tr class="[&>*:first-child]:border-l-0 [&>*:last-child]:border-r-0">
					{#each Object.keys(tableData.years) || [] as yr}
						{#each tableData.years[yr].semester || [] as sem}
							<th
								class="text-center border-x-4 border-b-4 border-surface-50 bg-surface-300"
								colspan="1"
							>
								เทอม {sem}
							</th>
						{/each}
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each Object.keys(tableData.rows) as rw}
					<tr
						class="[&>*:first-child]:border-l-0 [&>*:last-child]:border-r-0 !border-b-transparent !bg-transparent [&>*:nth-child(2n)]:bg-surface-200"
					>
						{#each Array.from({ length: tableData.totalCols || 0 }, (_, i) => i + 1) as cl}
							{#if cl in tableData.rows[rw]}
								{@const sj = tableData.rows[rw][cl]}
								<td
									class="card border-b-4 border-x-4 border-surface-50 min-w-[11rem] w-[calc(100%_/_8)] hover:!bg-primary-200"
									id={sj._attributes.code}
									on:mouseenter={(e) => onOverSubject('enter', sj._attributes.code)}
									on:mouseleave={(e) => onOverSubject('leave', sj._attributes.code)}
								>
									<button
										on:click={(e) => onClickSubject(sj._attributes.code)}
										class="hover:cursor-pointer text-left w-full h-full"
									>
										<div class="font-bold flex items-center gap-1">
											<!-- {getNode(curriculumData, sj.Block._text)?.NameThai._text}
											<div class="w-2 h-2 bg-blue-500 rounded-full" /> -->
											{sj._attributes.code}
										</div>
										<p class="italic max-w-[15rem] whitespace-normal">
											{#if getSubject(curriculumData, sj._attributes.code)}
												{@const subjectData = getSubject(curriculumData, sj._attributes.code)}
												{isThai ? subjectData?.NameThai._text : subjectData?.NameEng._text}
												{subjectData?.Crd_Lec._text}({subjectData?.Crd_Lec._text}-{getSubject(
													curriculumData,
													sj._attributes.code
												)?.Crd_Lab._text})
											{:else}
												{@const nodeData = getNode(curriculumData, sj.Block._text)}
												{nodeData?.NameThai._text}{#if nodeData?.Parent._text}
													ใน{getNode(curriculumData, nodeData.Parent._text)?.NameThai._text}
												{/if}
											{/if}
										</p>
									</button>
								</td>
							{:else}
								<td class="!bg-transparent" />
							{/if}
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>

		<!-- Legends -->
		<div class="card p-4 w-fit mt-2">
			<h3 class="font-bold text-lg">รายละเอียดสี</h3>
			<ul>
				<li class="flex items-center gap-2 py-1">
					<div class="bg-yellow-100 w-6 h-6 rounded-token" />
					<span>วิชาบังคับ</span>
				</li>
				<li class="flex items-center gap-2 py-1">
					<div class="bg-lime-100 w-6 h-6 rounded-token" />
					<span>วิชาบังคับ (ก่อน)</span>
				</li>
			</ul>
		</div>
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
								{isThai ? subjectData?.NameThai._text : subjectData?.NameEng._text}
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
