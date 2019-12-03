import { clientConnection } from './db';
const client = clientConnection();
const singlePostRegex = /^\/posts\/([1-9]+)$/;

export async function deleteHandler(req: any, res: any) {
	const urlBody = String(req.url).match(singlePostRegex);
	if (urlBody !== null) {
		await client.query(`DELETE FROM public.post
        WHERE id=${urlBody[1]};`);
	}
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Post deleted succesfully!');
}
