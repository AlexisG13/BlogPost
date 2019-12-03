import { clientConnection } from './db';
const client = clientConnection();
import * as querystring from 'querystring';

export async function postHandler(req: any, res: any) {
	let data:string[] = [];
	await req.on('data', (chunk:string) => {
		data.push(chunk.toString());
	});
    const body = querystring.parse(data[0]);
	await client.query(`INSERT INTO public.post(
        title, content, id_author,created_at)
        VALUES ('${body['title']}', '${body['content']}',${body['id_author']},CURRENT_DATE);`);
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Post posted succesfully!');
}
