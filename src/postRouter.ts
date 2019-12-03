import { getHandler } from './getHandler';
import { postHandler } from './postHandler';

export function postRouter(req: any, res: any) {
	if (req.method === 'GET') {
		getHandler(req, res);
	} else if (req.method === 'POST') {
		postHandler(req, res);
	}
}
