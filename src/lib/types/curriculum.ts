export interface CurriculumData {
	Curriculum: {
		Info: Info;
		Courses: {
			Course: Course[];
		};
		Plans: {
			/* โครงการต่าง */
			Plan: Plan[];
		};
		Nodes: {
			Node: NodeData[];
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

export function getPlansList(data: CurriculumData | undefined) {
	if (!data) return [];

	return data.Curriculum.Plans.Plan.map((pl) => {
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

	return data.Curriculum.Courses.Course.find((c) => c._attributes.code === subjectCode);
}
