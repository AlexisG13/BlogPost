import { clientConnection } from '../database/db';
import { ServerResponse, IncomingMessage, Server } from 'http';
import {
	buildSimpleResponse,
	buildObjectResponse,
	countRows
} from '../utils/responseUtils';
import {
	getAllPostQuery,
	getSinglePostQuery,
	insertCommentQuery,
	allCommentsQuery
} from '../database/queries';
const client = clientConnection();
const singlePostRegex = /^\/posts\/([0-9]+)$/;
const commentRegex = /^\/posts\/([0-9]+)\/?/;
const allPostRegex = /^\/posts\/$/;

export async function getHandler(req: IncomingMessage, res: ServerResponse) {
	try {
		const urlBody = String(req.url).match(singlePostRegex);
		if (urlBody !== null) {
			const singlePost = await client.query(getSinglePostQuery(urlBody[1]));
			if (singlePost.rowCount === 0)
				buildSimpleResponse(404, 'Post not found', res);
			buildObjectResponse(
				200,
				'Post retrieved successfully',
				singlePost.rows[0],
				'post',
				res
			);
		} else if (allPostRegex.test(String(req.url))) {
			const allPosts = await client.query(getAllPostQuery);
			buildObjectResponse(
				200,
				'Posts retrieved successfully',
				allPosts.rows,
				'posts',
				res
			);
		} else {
			buildSimpleResponse(400, 'Bad request', res);
		}
	} catch {
		buildSimpleResponse(500, 'Internal server error', res);
	}
}

export async function getAllComments(
	req: IncomingMessage,
	res: ServerResponse
) {
	try {
		let urlPath = String(req.url).match(commentRegex);
		if (urlPath !== null) {
			const idPost = urlPath[1];
			const allComments = await client.query(allCommentsQuery(idPost));
			countRows(allComments, res);
			const allCommentsRows = allComments.rows;
			buildObjectResponse(
				200,
				'Comments retrieved successfully',
				allCommentsRows,
				'comments',
				res
			);
		}
	} catch {
		buildSimpleResponse(500, 'Internal Server Error', res);
	}
}
