import { convertTISToUTF8, convertXMLToJSON } from '$lib/utils';
import type { PageServerLoad } from './$types';

const KMUTNB_API = 'http://klogic.kmutnb.ac.th:8080/kris/curri/showXML.jsp?currCode=';

export const load = (async ({ params }) => {
	const courseId = params.courseId;

	const response = await fetch(`http://localhost:5173/CS 64046034_raw.xml`);

	// const response = await fetch(`${KMUTNB_API}${courseId}`);
	const xml = await response.arrayBuffer();
	const utf8XML = convertTISToUTF8(xml);

	let json;
	try {
		json = convertXMLToJSON(utf8XML);
	} catch (error) {
		console.error(error);

		return {
			status: 'error',
			error: {
				message: 'ไม่สามารถแปลงข้อมูล XML ได้ (ติดต่อผู้ดูแลระบบ)'
			}
		};
	}

	return { status: 'success', data: json };
}) satisfies PageServerLoad;
