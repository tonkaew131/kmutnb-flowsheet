<script lang="ts">
	import { Course_64046034 } from '$lib/course';

	const keyDetails = [
		{
			key: '<Info>',
			detail: 'ข้อมูลทั่วไปของหลักสูตร',
			children: [
				{
					key: '<NameEng>',
					detail: 'ชื่อหลักสูตร (ภาษาอังกฤษ)',
					example: 'Bachelor of Science Program in Computer Science'
				},
				{
					key: '<NameThai>',
					detail: 'ชื่อหลักสูตร (ภาษาไทย)',
					example: 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์'
				},
				{
					key: '<Level>',
					detail: 'ระดับการศึกษา',
					example: '6'
				},
				{
					key: '<LevelText>',
					detail: 'ระดับการศึกษา (ข้อความ)',
					example: 'ปริญญาตรี'
				},
				{
					key: '<Degree>',
					detail: 'วุฒิการศึกษา',
					example: '12'
				},
				{
					key: '<DegreeText>',
					detail: 'วุฒิการศึกษา (ข้อความ)',
					example: 'วิทยาศาสตรบัณฑิต'
				},
				{
					key: '<Fac>',
					detail: 'คณะ',
					example: '04'
				},
				{
					key: '<FacText>',
					detail: 'คณะ (ข้อความ)',
					example: 'คณะวิทยาศาสตร์ประยุกต์'
				},
				{
					key: '<Dept>',
					detail: 'ภาควิชา',
					example: '0406'
				},
				{
					key: '<DeptText>',
					detail: 'ภาควิชา (ข้อความ)',
					example: 'วิทยาการคอมพิวเตอร์และสารสนเทศ'
				},
				{
					key: '<Div>',
					detail: 'สาขาวิชา',
					example: '040603'
				},
				{
					key: '<DivText>',
					detail: 'สาขาวิชา (ข้อความ)',
					example: 'วิทยาการคอมพิวเตอร์'
				}
			]
		},
		{
			key: '<Options>',
			detail: '...'
		},
		{
			key: '<Nodes>',
			detail: '...'
		},
		{
			key: '<Courses>',
			detail: 'หลายชื่อวิชา',
			children: [
				{ key: '<NameEng>', detail: 'ชื่อวิชา (ภาษาอังกฤษ)', example: 'Design Thinking' },
				{ key: '<NameThai>', detail: 'ชื่อวิชา (ภาษาไทย)', example: 'กระบวนการคิดเชิงออกแบบ' },
				{ key: '<ShrtName>', detail: 'ชื่อย่อวิชา', example: 'DESIGN THINKING' },
				{ key: '<DescEng>', detail: 'คำอธิบายวิชา (ภาษาอังกฤษ)' },
				{ key: '<DescThai>', detail: 'คำอธิบายวิชา (ภาษาไทย)' }
			]
		},
		{
			key: '<Prerequisites>',
			detail: 'วิชาที่ต้องเรียนก่อนหน้า'
		},
		{
			key: '<Blocks>',
			detail: 'โครงสร้าง (หมวดวิชา)'
		},
		{
			key: '<Plans>',
			detail: 'แผนการเรียน'
		},
		{
			key: '<Professions>',
			detail: '...'
		},
		{
			key: '<Layout>',
			detail: '...'
		},
		{
			key: '<Chart>',
			detail: '...'
		}
	];
</script>

<article class="prose prose-lg mx-auto py-36 font-noto">
	<h1>KMUTNB's Course XML</h1>
	<a href="/converter">
		<button class="btn variant-filled-primary">TIS-620 Converter</button>
	</a>

	<h2>Encoding</h2>
	<ul>
		<li>
			<code class="code before:content-[''] after:content-['']">TIS-620</code>
		</li>
	</ul>

	<h2 class="">โหลดไฟล์ XML</h2>
	<p class="">
		http://klogic.kmutnb.ac.th:8080/kris/curri/showXML.jsp?currCode=<code
			class="code before:content-[''] after:content-['']">COURSE_ID</code
		>
	</p>
	<blockquote class="blockquote border-primary-500">
		ตัวอย่าง: <a href="http://klogic.kmutnb.ac.th:8080/kris/curri/showXML.jsp?currCode=64046034"
			>http://klogic.kmutnb.ac.th:8080/kris/curri/showXML.jsp?currCode=64046034</a
		>
	</blockquote>

	<div class="table-container">
		<table class="table">
			<thead>
				<tr>
					<th>XML Key</th>
					<th>ความหมาย</th>
				</tr>
			</thead>
			<tbody>
				{#each keyDetails as kd}
					<tr>
						<td>
							<a href="#{kd.key}" class="no-underline">
								<code class="code before:content-[''] after:content-['']">
									{kd.key}
								</code>
							</a>
						</td>
						<td>{kd.detail}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	{#each keyDetails as kd}
		{#if (kd?.children || []).length != 0}
			<h2 class="mb-0" id={kd.key}>
				<code class="code before:content-[''] after:content-['']">
					{kd.key}
				</code>
			</h2>

			<div class="table-container">
				<table class="table">
					<thead>
						<tr>
							<th>XML Key</th>
							<th>ความหมาย</th>
							<th>ตัวอย่าง</th>
						</tr>
					</thead>
					<tbody>
						{#each kd?.children || [] as child}
							<tr>
								<td>
									<code class="code before:content-[''] after:content-['']">
										{child.key}
									</code>
								</td>
								<td>{child.detail}</td>
								<td>{child.example || '-'}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	{/each}

	<h2>ตัวอย่าง</h2>
	<pre class="pre">
{Course_64046034}
    </pre>
</article>
