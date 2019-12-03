import { getHandler } from './getHandler';
import { postHandler } from './postHandler';
import { putHandler } from './putHandler';
import { deleteHandler } from './deleteHandler';

export function postRouter(req: any, res: any) {
	if (req.method === 'GET') {
		getHandler(req, res);
	} else if (req.method === 'POST') {
		postHandler(req, res);
	} else if (req.method === 'PUT'){
		putHandler(req,res);
	}else if(req.method === 'DELETE'){
		deleteHandler(req,res);
	}
}
