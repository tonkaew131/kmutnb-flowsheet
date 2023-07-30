import { ENV_TYPE } from '$env/static/private';

import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

import { convertTISToUTF8, convertXMLToJSON } from '$lib/utils';
import type { CurriculumData } from '$lib/types/curriculum';

const KMUTNB_API = 'http://klogic.kmutnb.ac.th:8080/kris/curri/showXML.jsp?currCode=';

export const load = (async ({ params }) => {
	const courseId = params.courseId;

	let response;
	if (ENV_TYPE === 'development') {
		console.log('DEV MODE: Using local XML file');
		response = await fetch(`http://localhost:5173/showXML.jsp`);
	} else {
		try {
			response = await fetch(`${KMUTNB_API}${courseId}`);
		} catch (errMsg) {
			throw error(500, {
				message: 'ไม่สามารถดึงข้อมูลจาก klogic ได้ (ลองใหม่ๆๆ)'
			});
		}
	}

	const xml = await response.arrayBuffer();
	const utf8XML = convertTISToUTF8(xml);

	if (xml.byteLength == 5) {
		throw error(404, {
			message: 'ไม่พบข้อมูลรายวิชาที่ร้องขอ'
		});
	}

	let json: CurriculumData;
	try {
		json = JSON.parse(convertXMLToJSON(utf8XML));
	} catch (errMsg) {
		console.error(errMsg);

		throw error(500, {
			message: 'ไม่สามารถแปลงข้อมูล XML ได้ (ติดต่อผู้ดูแลระบบ)'
		});
	}

	return { status: 'success', data: json, courseId: courseId };
}) satisfies PageServerLoad;
