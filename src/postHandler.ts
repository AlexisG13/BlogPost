import { getHandler } from './postsHandler';

export function postRouter(request: any, response: any) {
	if (request.method === 'GET') {
		getHandler(request, response);
	}
}
