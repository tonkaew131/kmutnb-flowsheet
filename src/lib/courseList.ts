export const courseList: CourseListData = {};

interface CourseListData {
	[key: string]: {
		name: string;
		majors: {
			[key: string]: {
				name: string;
			};
		};
	};
}
