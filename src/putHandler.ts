import { clientConnection } from './db';
const client = clientConnection();
import * as url from 'url';
import * as querystring from 'querystring';
const singlePostRegex = /^\/posts\/([1-9]+)/;

export async function putHandler(req: any, res: any) {
	const postId = String(req.url).match(singlePostRegex);
	if (postId !== null) {
		const parsed = url.parse(req.url);
        const query = querystring.parse(String(parsed.query));
        await client.query(`UPDATE public.post
        SET title='${query['title']}', content='${query['content']}'
        WHERE id=${postId[1]};`);
	}
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Post updated succesfully!');
}
