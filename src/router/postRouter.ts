import { getHandler } from '../handlers/getHandler';
import { postHandler } from '../handlers/postHandler';
import { putHandler } from '../handlers/putHandler';
import { deleteHandler } from '../handlers/deleteHandler';
import { IncomingMessage, ServerResponse } from 'http';
import { buildSimpleResponse } from '../utils/responseUtils';
import { PostHandler } from '../classes/classes';

//Router for deciding which method should be called on the handler 
export function postRouter(req: IncomingMessage, res: ServerResponse) {
	const handler = new PostHandler();
	switch (req.method) {
		case 'GET':
			handler.get(req, res);
			break;
		case 'POST':
			handler.post(req, res);
			break;
		case 'PUT':
			handler.put(req, res);
			break;
		case 'DELETE':
			handler.delete(req, res);
			break;
		default:
			buildSimpleResponse(501, 'Method not implemented', res);
	}
}
