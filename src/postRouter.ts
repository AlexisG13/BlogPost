import { getHandler } from './getHandler';
import { postHandler } from './postHandler';
import { putHandler } from './putHandler';
import { deleteHandler } from './deleteHandler';
import { IncomingMessage, ServerResponse } from 'http';

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
			res.writeHead(501, { 'Content-Type': 'application/json' });
			res.end(
				JSON.stringify({ status: 501, message: 'Method not implemented' })
			);
	}
}
