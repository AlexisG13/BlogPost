import { Client } from 'pg';
const client = new Client({
	user: 'root',
	database: 'blogpost',
	host: 'localhost',
	password: 'toor',
	port: 5432
});

export async function handler(request: any, response: any) {
	await client.connect();
	if (request.method === 'GET') {
		const allTags = await client.query('SELECT * FROM public.tags');
		const tagArray = allTags.rows;
		response.writeHead(200, { 'Content-Type': 'application/json' });
		const json = JSON.stringify({ tagArray});
		response.end(json);
	} else if (request.method === 'POST') {
		response.writeHead(200, { 'Content-Type': 'text/plain' });
		response.end('Success');
	}
}
