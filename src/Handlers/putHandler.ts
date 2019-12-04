import { clientConnection } from '../database/db';
import { QueryResult } from 'pg';
import { IncomingMessage, ServerResponse } from 'http';
import { buildSimpleResponse, buildObjectResponse } from '../responseUtils';
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
		if (updatedRow.rowCount === 0) {
			buildSimpleResponse(404,'Post not found',res);
		}
		buildObjectResponse(200,'Post updated successfully',updatedRow.rows[0],res);
	} else {
		buildSimpleResponse(400,'Bad request',res);
	}
}
