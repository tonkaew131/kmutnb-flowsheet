import * as iconv from 'iconv-lite';

export function convertTISToUTF8(tis620Text: string): string {
	const buffer = iconv.decode(Buffer.from(tis620Text, 'binary'), 'tis620');
	const utf8Text = iconv.encode(buffer, 'utf-8').toString();

	return utf8Text;
}
