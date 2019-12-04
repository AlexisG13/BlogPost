import { clientConnection } from './db';
const client = clientConnection();
const singlePostRegex = /^\/posts\/([1-9]+)$/;

export async function getHandler(req: any, res: any) {
	const urlBody = String(req.url).match(singlePostRegex);
	let post: string | string[];
	if (urlBody !== null) {
		const singlePost = await client.query(
			`SELECT p.title, p.content, p.created_at , a.username , array_agg(t.name) as tags , array_agg(DISTINCT c.content) as comments
			FROM public.post as p 
			INNER JOIN public.author as a ON p.id_author = a.id AND p.id = ${urlBody[1]}
			LEFT JOIN (SELECT * FROM COMMENT) AS c ON c.id_post = p.id AND p.id = ${urlBody[1]} 
			LEFT JOIN public.postxtag pt ON pt.id_post = p.id AND p.id = ${urlBody[1]}
			LEFT JOIN (SELECT * FROM TAG) AS T ON pt.id_tag = t.id
			GROUP BY p.title, p.content, p.created_at, a.username
			ORDER BY p.created_at ASC`
		);
		post = singlePost.rows[0];
	} else {
		const allPosts = await client.query(
		    `SELECT p.title, p.content, p.created_at , a.username , array_agg(t.name) , array_agg(DISTINCT c.content)
			FROM public.post as p 
			INNER JOIN public.author as a ON p.id_author = a.id 
			LEFT JOIN (SELECT * FROM COMMENT) AS c ON c.id_post = p.id
			LEFT JOIN public.postxtag pt ON pt.id_post = p.id
			LEFT JOIN (SELECT * FROM TAG) AS T ON pt.id_tag = t.id
			GROUP BY p.title, p.content, p.created_at, a.username
			ORDER BY p.created_at ASC`
		);
		post = allPosts.rows;
	}
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify({ post }));
}
