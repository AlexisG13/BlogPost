import { clientConnection } from '../database/db';
import { ServerResponse, IncomingMessage } from 'http';
import { buildSimpleResponse, buildObjectResponse } from '../responseUtils';
import { getAllPostQuery, getSinglePostQuery } from '../database/queries';
const client = clientConnection();
const singlePostRegex = /^\/posts\/([0-9]+)$/;
const allPostRegex = /^\/posts\/$/;

export async function getHandler(req: IncomingMessage, res: ServerResponse) {
	const urlBody = String(req.url).match(singlePostRegex);
	let post: string | string[];
	if (urlBody !== null) {
		const singlePost = await client.query(getSinglePostQuery(urlBody[1]));
		if (singlePost.rowCount === 0)
			buildSimpleResponse(404, 'Post not found', res);
		buildObjectResponse(
			200,
			'Post retrieved successfully',
			singlePost.rows[0],
			res
		);
	} else if (allPostRegex.test(String(req.url))) {
		const allPosts = await client.query(getAllPostQuery);
		buildObjectResponse(
			200,
			'Posts retrieved successfully',
			allPosts.rows,
			res
		);
	} else {
		buildSimpleResponse(400, 'Bad request', res);
	}
}
