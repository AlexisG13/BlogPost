import { getHandler } from './Handlers/getHandler';
import { postHandler } from './Handlers/postHandler';
import { putHandler } from './Handlers/putHandler';
import { deleteHandler } from './Handlers/deleteHandler';
import { IncomingMessage, ServerResponse } from 'http';
import { buildSimpleResponse } from './utils/responseUtils';

export function postRouter(req: IncomingMessage, res: ServerResponse) {
	switch (req.method) {
		case 'GET':
			getHandler(req, res);
			break;
		case 'POST':
			postHandler(req, res);
			break;
		case 'PUT':
			putHandler(req, res);
			break;
		case 'DELETE':
			deleteHandler(req, res);
			break;
		default:
			buildSimpleResponse(501, 'Method not implemented', res);
	}
}
