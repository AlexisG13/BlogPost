import { clientConnection } from './db';
const client = clientConnection();

export async function getHandler(request: any, response: any) {
	if (request.method === 'GET') {
		const allPosts = await client.query('SELECT title, content FROM public.post');
		const posts = allPosts.rows;
		response.writeHead(200, { 'Content-Type': 'application/json' });
		const json = JSON.stringify({ posts});
		response.end(json);
	}
}
