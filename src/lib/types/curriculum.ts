export interface CurriculumData {
	Curriculum: {
		Info: Info;
		Courses: {
			Course: Course[];
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
