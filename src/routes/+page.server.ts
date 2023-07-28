import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const courseId = url.searchParams.get('courseId');

	console.log(courseId);
    
	return {};
}) satisfies PageServerLoad;
