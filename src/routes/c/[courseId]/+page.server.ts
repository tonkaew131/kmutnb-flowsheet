import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	console.log(params);

	return {};
}) satisfies PageServerLoad;
