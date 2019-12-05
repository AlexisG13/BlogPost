import { clientConnection } from '../database/db';
import { QueryResult } from 'pg';
import { buildSimpleResponse, countRows } from '../utils/responseUtils';
import { IncomingMessage, ServerResponse } from 'http';
import { deleteCommentQuery } from '../database/queries';
const client = clientConnection();
const singlePostRegex = /^\/posts\/([0-9]+)$/;
const singleCommentRegex = /^\/posts\/([0-9]+)\/comments\/([0-9]+)/;

// Function for deleting a post 
export async function deleteHandler(req: any, res: any) {
	try {
		let query: QueryResult;
		const urlBody = String(req.url).match(singlePostRegex);
		if (urlBody !== null) {
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

//Function for deleting a comment 
export async function deleteComment(req: IncomingMessage, res: ServerResponse) {
	try {
		let urlPath = String(req.url).match(singleCommentRegex);
		if (urlPath !== null) {
			const idComment = urlPath[2];
			const deletedComment = await client.query(
				deleteCommentQuery(idComment)
			);
			countRows(deletedComment, res);
			buildSimpleResponse(200, 'Comment deleted successfully', res);
		}
	} catch {
		buildSimpleResponse(500,'Internal server error',res);
	}
}
