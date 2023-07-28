import type { Actions } from './$types';
import * as iconv from 'iconv-lite';

function convertTISToUTF8(tis620Text: string): string {
	const buffer = iconv.decode(Buffer.from(tis620Text, 'binary'), 'tis620');
	const utf8Text = iconv.encode(buffer, 'utf-8').toString();

	return utf8Text;
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const input = String(data.get('input'));

		return { data: convertTISToUTF8(input) };
	}
} satisfies Actions;
