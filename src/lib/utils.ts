import * as iconv from 'iconv-lite';
import { xml2json } from 'xml-js';

export function convertTISToUTF8(tis620Text: string | ArrayBuffer): string {
	const buffer = iconv.decode(Buffer.from(tis620Text, 'binary'), 'tis620');
	const utf8Text = iconv.encode(buffer, 'utf-8').toString();

	return utf8Text;
}

export function convertXMLToJSON(XMLString: string) {
	return xml2json(XMLString, { compact: true, spaces: 4 });
}
