export interface CurriculumData {
	Curriculum: {
		Info: Info;
		Courses: {
			Course: Course[];
		};
		Plans: {
			/* โครงการต่าง */
			Plan: Plan[] | Plan;
		};
		Nodes: {
			Node: NodeData[];
		};
		Prerequisites: {
			Prerequisite: PrerequisiteData[];
		};
	};
}

export interface Info {
	NameEng: {
		_text: string;
	};
	NameThai: {
		_text: string;
	};
	Level: {
		_text: string;
	};
	LevelText: {
		_text: string;
	};
	Degree: {
		_text: string;
	};
	DegreeText: {
		_text: string;
	};
	Fac: {
		_text: string;
	};
	FacText: {
		_text: string;
	};
	Dept: {
		_text: string;
	};
	DeptText: {
		_text: string;
	};
	Div: {
		_text: string;
	};
	DivText: {
		_text: string;
	};
	BeginYear: {
		_text: string;
	};
	BeginSem: {
		_text: string;
	};
	CurrType: {
		_text: string;
	};
	CurrTypeText: {
		_text: string;
	};
	Edition: {
		_text: string;
	};
	Certify: {
		_text: string;
	};
	Comment: {
		_text: string;
	};
}

export interface Course {
	_attributes: {
		code: string;
	};
	NameEng: {
		_text: string;
	};
	NameThai: {
		_text: string;
	};
	ShrtName: {
		_text: string;
	};
	DescEng: {
		_text: string;
	};
	DescThai: {
		_text: string;
	};
	Flag: {
		_text: string;
	};
	Type: {
		_text: string;
	};
	SU: {
		_text: string;
	};
	Level: {
		_text: string;
	};
	Crd: {
		_text: string;
	};
	Crd_Lec: {
		_text: string;
	};
	Crd_Lab: {
		_text: string;
	};
	No_Hlec: {
		_text: string;
	};
	No_Hlab: {
		_text: string;
	};
}

export interface Plan {
	_attributes: {
		scheme: string;
		round: string;
		option: string;
	};
	YearSem: YearSemester[];
}

export interface CoursePlan {
	_attributes: {
		code: string;
	};
	Block: {
		_text: string;
	};
	Display: {
		_text: string;
	};
	Crd: {
		_text: string;
	};
	No_Hlec: {
		_text: string;
	};
	No_Hlab: {
		_text: string;
	};
}

export interface YearSemester {
	_attributes: {
		/** Year */
		year: string;
		/** Semester */
		sem: string;
		/** Credit */
		crd: string;
	};
	Course: CoursePlan[];
}

export interface NodeData {
	_attributes: {
		code: string;
	};
	Parent: {
		_text: string;
	};
	NameEng: {
		_text: string;
	};
	NameThai: {
		_text: string;
	};
	Type: {
		_text: string;
	};
	Crd: {
		_text: string;
	};
	Crd2: {
		_text: string;
	};
	Option: {
		_text: string;
	};
	MinYear: {
		_text: string;
	};
	MaxYear: {
		_text: string;
	};
}

export interface PrerequisiteData {
	_attributes: {
		code: string;
	};
	MinCredit: {
		_text: string;
	};
	Pre1: {
		_text: string;
	};
	Co1: {
		_text: string;
	};
	Op1: any;
	Comment: any;
}

export function getPlansList(data: CurriculumData | undefined) {
	if (!data) return [];

	const plans = Array.isArray(data.Curriculum.Plans.Plan)
		? data.Curriculum.Plans.Plan
		: [data.Curriculum.Plans.Plan];

	return plans.map((pl) => {
		const planCode = pl._attributes.scheme;

		const nodePlan = data.Curriculum.Nodes.Node.find((n) => n._attributes.code === planCode);

		return {
			planCode: planCode,
			planNameEng: nodePlan?.NameEng._text,
			planeNameThai: nodePlan?.NameThai._text
		};
	});
}

export function getSubject(data: CurriculumData | undefined, subjectCode: string) {
	if (!data) return undefined;

	const subject = data.Curriculum.Courses.Course.find((c) => c._attributes.code === subjectCode);

	return subject;
}

export function getNode(data: CurriculumData | undefined, nodeCode: string) {
	if (!data) return undefined;

	const block = data.Curriculum.Nodes.Node.find((n) => n._attributes.code === nodeCode);
	return block;
}

export function getSubjectPrerequisite(
	data: CurriculumData | undefined,
	subjectCode: string,
	recursive = false
): SubjectPrerequisite | undefined {
	if (!data) {
		return undefined;
	}

	const findPrerequisiteSequence = (code: string): string[] => {
		const prerequisites: PrerequisiteData[] = data.Curriculum.Prerequisites.Prerequisite.filter(
			(p) => p._attributes.code === code
		);

		if (prerequisites.length === 0) {
			return [];
		}

		let sequence: string[] = [];
		for (const prereq of prerequisites) {
			sequence.push(prereq.Pre1._text);
			sequence = [...sequence, ...findPrerequisiteSequence(prereq.Pre1._text)];
		}

		return sequence;
	};

	const prepare: string[] = data.Curriculum.Prerequisites.Prerequisite.filter(
		(p) => p._attributes.code === subjectCode
	).map((p) => p.Pre1._text);

	const prepareSequence: string[] = [];
	if (recursive) {
		for (const p of prepare) {
			prepareSequence.push(p);
			prepareSequence.push(...findPrerequisiteSequence(p));
		}
	}

	return { subjectCode, prerequisite: prepare, prerequisiteSequence: prepareSequence };
}

export interface SubjectPrerequisite {
	subjectCode: string;
	/** Course Prerequisites: รายวิชาที่ต้องการก่อนหน้า */
	prerequisite: string[];
	/** Course Prerequisite Sequence: ลำดับก่อนหน้าที่ต้องทำก่อนเรียนคอร์ส */
	prerequisiteSequence?: string[];
}
