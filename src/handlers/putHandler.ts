import { clientConnection } from '../database/db';
import { QueryResult } from 'pg';
import { IncomingMessage, ServerResponse } from 'http';
import {
	buildSimpleResponse,
	buildObjectResponse,
	getBodyContent,
	countRows
} from '../utils/responseUtils';
import { updateQuery, updateCommentQuery } from '../database/queries';
const client = clientConnection();
const singleCommentRegex = /^\/posts\/([0-9]+)\/comments\/([0-9]+)/;
const singlePostRegex = /^\/posts\/([0-9]+)/;

export async function putHandler(req: IncomingMessage, res: ServerResponse) {
	const urlMatch = String(req.url).match(singlePostRegex);
	try {
		if (urlMatch !== null) {
			const body = await getBodyContent(req);
			if (body.title === undefined && body.content === undefined) {
				buildSimpleResponse(400, 'Bad request: Not enough parameters', res);
				return;
			}
			const postId = urlMatch[1];
			let updatedRow: QueryResult;
			const query = updateQuery(body, postId);
			updatedRow = await client.query(query);
			if (updatedRow.rowCount === 0)
				buildSimpleResponse(404, 'Post not found', res);
			const row = updatedRow.rows[0];
			buildObjectResponse(
				200,
				'Post updated successfully',
				row,
				'updatedPost',
				res
			);
		} else {
			buildSimpleResponse(400, 'Bad request', res);
		}
	} catch (err) {
		console.log(err);
		buildSimpleResponse(500, 'Internal server error', res);
	}
}

export async function updateComment(req: IncomingMessage, res: ServerResponse) {
	try {
		let data: string[] = [];
		await req.on('data', (chunk: string) => {
			data.push(chunk.toString());
		});
		const body = JSON.parse(data[0]);
		let urlPath = String(req.url).match(singleCommentRegex);
		if (urlPath !== null) {
			const idComment = urlPath[2];
			const updatedComment = await client.query(
				updateCommentQuery(idComment, body['content'])
			);
			countRows(updatedComment, res);
			const updateCommentRow = updatedComment.rows[0];
			buildObjectResponse(
				200,
				'Comment updated successfully',
				updateCommentRow,
				'updatedComment',
				res
			);
		}
	} catch(error){
		console.log(error);
		buildSimpleResponse(500, 'Internal server error', res);
	}
}
