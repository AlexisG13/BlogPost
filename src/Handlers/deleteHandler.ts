import { clientConnection } from '../database/db';
import { QueryResult } from 'pg';
import { buildSimpleResponse } from '../utils/responseUtils';
const client = clientConnection();
const singlePostRegex = /^\/posts\/([0-9]+)$/;

export async function deleteHandler(req: any, res: any) {
	try {
		let query: QueryResult;
		const urlBody = String(req.url).match(singlePostRegex);
		if (urlBody !== null) {
			await client.query(
				`DELETE FROM postxtag WHERE postxtag.id_post = ${urlBody[1]} RETURNING *`
			);
			await client.query(
				`DELETE FROM comment WHERE comment.id_post = ${urlBody[1]}`
			);
			query = await client.query(
				`DELETE FROM post WHERE id=${urlBody[1]} RETURNING *;`
			);
			if (query.rowCount === 0) {
				buildSimpleResponse(400, 'Post not found', res);
			}
			buildSimpleResponse(200, 'Post deleted successfully', res);
		} else {
			buildSimpleResponse(400, 'Bad request', res);
		}
	} catch {
		buildSimpleResponse(500, 'Internal server error', res);
	}
}
