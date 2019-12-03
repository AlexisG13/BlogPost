import { clientConnection } from './db';
const client = clientConnection();
import * as querystring from 'querystring';
const singlePostRegex = /^\/posts\/([1-9]+)/;

export async function putHandler(req: any, res: any) {
	const postId = String(req.url).match(singlePostRegex);
	if (postId !== null) {
		let data: string[] = [];
		await req.on('data', (chunk: string) => {
			data.push(chunk.toString());
		});
		const body = querystring.parse(data[0]);
		await client.query(`UPDATE public.post
        SET title='${body['title']}', content='${body['content']}'
        WHERE id=${postId[1]};`);
	}
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Post updated succesfully!');
}
