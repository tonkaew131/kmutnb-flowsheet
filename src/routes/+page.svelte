<script lang="ts">
	import { goto } from '$app/navigation';
	import { courseList } from '$lib/courseList';

	function onSubmit(e: any) {
		const courseId = e?.target?.courseId?.value;

		goto(`/c/${courseId}`);
	}

	let departments: {
		[key: string]: {
			name: string;
			curriculums: {
				[key: string]: {
					name: string;
				};
			};
		};
	};
	function onSelectFaculty(e: any) {
		const faculty = e?.target?.value;

		departments = courseList[faculty]?.departments;
	}

	let curriculums: {
		[key: string]: {
			name: string;
		};
	};
	function onSelectDepartment(e: any) {
		const department = e?.target?.value;

		curriculums = departments[department]?.curriculums;
	}

	let currCode: string;
	function onSelectCurriculum(e: any) {
		const curriculum = e?.target?.value;

		currCode = curriculum;
	}
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center font-noto">
	<form on:submit|preventDefault={onSubmit} class="w-11/12 max-w-fit">
		<label>
			<span class="font-bold">คณะ</span>
			<select class="select" on:change={onSelectFaculty}>
				<option value="NONE" selected disabled>- - - เลือกคณะ - - -</option>
				{#each Object.keys(courseList).sort() as c}
					<option value={c}>{courseList[c].name}</option>
				{/each}
			</select>
		</label>

		{#if departments}
			<label>
				<span class="font-bold">ภาควิชา</span>
				<select class="select" on:change={onSelectDepartment}>
					<option value="NONE" selected disabled>- - - เลือกภาควิชา - - -</option>
					{#each Object.keys(departments).sort() as d}
						<option value={d}>{departments[d].name}</option>
					{/each}
				</select>
			</label>
		{/if}

		{#if curriculums}
			<label>
				<span class="font-bold">ภาควิชา</span>
				<select class="select" on:change={onSelectCurriculum}>
					<option value="NONE" selected disabled>- - - เลือกภาควิชา - - -</option>
					{#each Object.keys(curriculums) as c}
						<option value={c}>{curriculums[c].name}</option>
					{/each}
				</select>
			</label>
		{/if}

		<div class="relative mt-3">
			<div
				class="h-[2px] -z-10 w-full bg-primary-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
			/>
			<p class="text-center w-fit mx-auto bg-surface-50 px-2">หรือ</p>
		</div>

		<label>
			<span class="font-bold">รหัสหลักสูตร</span>
			<input
				class="input px-4 py-3"
				type="text"
				name="courseId"
				bind:value={currCode}
				placeholder="64046034"
			/>
		</label>

		<button type="submit" class="btn variant-ghost-primary w-full font-bold tracking-widest mt-4"
			>ค้นหา</button
		>

		<blockquote class="blockquote border-primary-500 mt-6 max-w-lg">
			เนื่องด้วย klogic จะย้ายระบบในวันที่ 7 สิงหาแล้วจะไม่สามารถดึงข้อมูลตรงๆ ได้อีก
			ถ้าหากต้องการดูข้อมูลหลังจากวันที่ 7 สิงหา ให้โหลดไฟล์ XML
			ของหลักสูตรนั้นไว้แล้วนำมาอัพโหลดที่นี่ (ยังไม่ได้ทำ) <a
				href="/docs#download"
				class="underline text-primary-500">วิธีโหลด</a
			>
		</blockquote>
	</form>
</div>
