export const courseList: CourseListData = {};

interface CourseListData {
	[key: string]: {
		name: string;
		departments: {
			[key: string]: {
				name: string;
				curriculums: {
					[key: string]: {
						name: string;
					};
				};
			};
		};
	};
}
