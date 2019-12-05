import { clientConnection } from '../database/db';
import { QueryResult } from 'pg';
import { IncomingMessage, ServerResponse } from 'http';
import { buildSimpleResponse, buildObjectResponse, serializeJSON } from '../utils/responseUtils';
const client = clientConnection();
const singlePostRegex = /^\/posts\/([0-9]+)/;

export async function putHandler(req: IncomingMessage, res: ServerResponse) {
	const urlMatch = String(req.url).match(singlePostRegex);
	try {
		if (urlMatch !== null) {
			const postId = urlMatch[1];
			let updatedRow: QueryResult;
			let data: string[] = [];
			await req.on('data', (chunk: string) => {
				data.push(chunk.toString());
			});
			const body = JSON.parse(data[0]);
			const query = serializeJSON(body,postId);
			updatedRow = await client.query(query);
			if (updatedRow.rowCount === 0) {
				buildSimpleResponse(404, 'Post not found', res);
			}
			buildObjectResponse(
				200,
				'Post updated successfully',
				updatedRow.rows[0],
				res
			);
		} else {
			buildSimpleResponse(400, 'Bad request', res);
		}
	} catch {
		buildSimpleResponse(500, 'Internal server error', res);
	}
}
