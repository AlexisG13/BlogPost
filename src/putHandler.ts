import { clientConnection } from './db';
import { QueryResult } from 'pg';
import { IncomingMessage, ServerResponse } from 'http';
const client = clientConnection();
const singlePostRegex = /^\/posts\/([0-9]+)/;

export async function putHandler(req: IncomingMessage, res: ServerResponse) {
	const postId = String(req.url).match(singlePostRegex);
	if (postId !== null) {
		let updatedRow: QueryResult;
		let data: string[] = [];
		await req.on('data', (chunk: string) => {
			data.push(chunk.toString());
		});
		const body = JSON.parse(data[0]);
		let query = 'UPDATE post SET';
		console.log(postId[1]);
		if (body.title !== undefined) query += ` title = '${body['title']}' `;
		if (body.content !== undefined) {
			if (body.title !== undefined)
				query += `, content = '${body['content']}' `;
			else query += ` content = '${body['content']}' `;
		}
		updatedRow = await client.query(`${query},update_at = CURRENT_TIMESTAMP
					 WHERE id=${postId[1]}
					 RETURNING * ;`);
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(
			JSON.stringify({
				status: 200,
				message: 'Post updated successfully',
				updatedPost: updatedRow.rows[0]
			})
		);
	}
}
