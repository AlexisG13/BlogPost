import { clientConnection } from '../database/db';
import { IncomingMessage, ServerResponse } from 'http';
import { buildObjectResponse, buildSimpleResponse } from '../responseUtils';
import { insertCommentQuery, insertPostQuery } from '../database/queries';
const client = clientConnection();
const commentRegex = /^\/posts\/comments/;
const postRegex = /^\/posts\/$/;

export async function postHandler(req: IncomingMessage, res: ServerResponse):Promise<void>{
	let data: string[] = [];
	await req.on('data', (chunk: string) => {
		data.push(chunk.toString());
	});
	const body = JSON.parse(data[0]);
	if (commentRegex.test(String(req.url))) {
		const newComment = await client.query(
			insertCommentQuery(body['content'], body['author'], body['id_post'])
		);
		buildObjectResponse(
			201,
			'Comment added successfully',
			newComment.rows[0],
			res
		);
	} else if (postRegex.test(String(req.url))) {
		const newPost = await client.query(
			insertPostQuery(body['title'], body['content'], body['id_author'])
		);
		buildObjectResponse(201, 'Post posted successfully', newPost.rows[0], res);
	} else {
		buildSimpleResponse(400, 'Bad request', res);
	}
}
