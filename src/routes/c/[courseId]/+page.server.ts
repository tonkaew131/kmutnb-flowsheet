import { ENV_TYPE } from '$env/static/private';

import type { PageServerLoad } from './$types';

import type { CurriculumData } from '$lib/types/curriculum';
import { convertTISToUTF8, convertXMLToJSON } from '$lib/utils';

const KMUTNB_API = 'http://klogic.kmutnb.ac.th:8080/kris/curri/showXML.jsp?currCode=';

export const load = (async ({ params }) => {
	const courseId = params.courseId;

	let response;
	if (ENV_TYPE === 'development') {
		console.log('DEV MODE: Using local XML file');
		response = await fetch(`http://localhost:5173/CS 64046034_raw.xml`);
	} else {
		try {
			response = await fetch(`${KMUTNB_API}${courseId}`);
		} catch (error) {
			return {
				status: 'error',
				error: {
					message: 'ไม่สามารถดึงข้อมูลจาก klogic ได้ (ลองใหม่ๆๆ)'
				}
			};
		}
	}
asdsa
	const xml = await response.arrayBuffer();
	const utf8XML = convertTISToUTF8(xml);

	let json: CurriculumData;
	try {
		json = JSON.parse(convertXMLToJSON(utf8XML));
	} catch (error) {
		console.error(error);

		return {
			status: 'error',
			error: {
				message: 'ไม่สามารถแปลงข้อมูล XML ได้ (ติดต่อผู้ดูแลระบบ)'
			}
		};
	}

	return { status: 'success', data: json, courseId: courseId };
}) satisfies PageServerLoad;
