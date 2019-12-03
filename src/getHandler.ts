import { clientConnection } from './db';
const client = clientConnection();
const singlePostRegex = /^\/posts\/([1-9]+)$/;

export async function getHandler(request: any, response: any) {
	const urlBody = String(request.url).match(singlePostRegex);
	let post: string | string[];
	if (urlBody !== null) {
		const singlePost = await client.query(
			`SELECT p.title, p.content , a.username FROM public.post as p , 
			 public.author as a WHERE p.id = ${urlBody[1]} AND p.id_author = a.id`
		);
		post = singlePost.rows[0];
	} else {
		const allPosts = await client.query(
			`SELECT p.title, p.content, p.created_at , a.username FROM 
			 public.post as p INNER JOIN public.author as a ON p.id_author = a.id
			 ORDER BY p.created_at ASC`
		);
		post = allPosts.rows;
	}
	response.writeHead(200, { 'Content-Type': 'application/json' });
	response.end(JSON.stringify({ post }));
}
