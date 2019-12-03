import { clientConnection } from './db';
const client = clientConnection();
import * as url from 'url';
import * as querystring from 'querystring';

export async function postHandler(req: any, res: any) {
    const parsed = url.parse(req.url);
    console.log(parsed);
    const query = querystring.parse(String(parsed.query));
    await client.query(`INSERT INTO public.post(
        title, content, id_author,created_at)
        VALUES ('${query['title']}', '${query['content']}',${query['id_author']},CURRENT_DATE);`);
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Post posted succesfully!');
}
