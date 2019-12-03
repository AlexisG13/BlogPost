import { clientConnection } from './db';
const client = clientConnection();
import * as querystring from 'querystring';
const myRegex = /^\/posts\/comments/;

export async function postHandler(req: any, res: any) {
	let data: string[] = [];
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	await req.on('data', (chunk: string) => {
		data.push(chunk.toString());
	});
	const body = querystring.parse(data[0]);
	if (myRegex.test(req.url)) {
		await client.query(`INSERT INTO public.comment(
			content,id_author,id_post)
			VALUES ('${body['content']}',${body['id_author']},${body['id_post']})`);
			res.end('Comment posted succesfully!');
	} else {
		await client.query(`INSERT INTO public.post(
        title, content, id_author,created_at)
		VALUES ('${body['title']}', '${body['content']}',${body['id_author']},CURRENT_DATE);`);
		res.end('Post posted succesfully!');
	}
}
