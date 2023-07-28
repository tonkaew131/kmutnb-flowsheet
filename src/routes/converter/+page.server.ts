import type { Actions } from './$types';
import { convertTISToUTF8 } from '$lib/utils';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const input = String(data.get('input'));

		return { data: convertTISToUTF8(input) };
	}
} satisfies Actions;
