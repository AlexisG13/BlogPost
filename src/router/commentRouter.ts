import { IncomingMessage, ServerResponse } from 'http';
import { CommentHandler } from '../classes/classes';
import { buildSimpleResponse } from '../utils/responseUtils';

//Router for deciding which method should be called on the handler 
export function commentRouter(req: IncomingMessage, res: ServerResponse) {
	const handler = new CommentHandler();
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
