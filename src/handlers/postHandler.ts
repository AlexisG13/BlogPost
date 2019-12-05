import { clientConnection } from '../database/db';
import { IncomingMessage, ServerResponse } from 'http';
import {
	buildObjectResponse,
	buildSimpleResponse
} from '../utils/responseUtils';
import { insertPostQuery, insertCommentQuery } from '../database/queries';
const client = clientConnection();
const commentRegex = /^\/posts\/([0-9]+)\/?/;
const postRegex = /^\/posts\/$/;

//Function fot posting a post 
export async function postHandler(
	req: IncomingMessage,
	res: ServerResponse
): Promise<void> {
	try {
		let data: string[] = [];
		await req.on('data', (chunk: string) => {
			data.push(chunk.toString());
		});
		const body = JSON.parse(data[0]);
		if (postRegex.test(String(req.url))) {
			const newPost = await client.query(
				insertPostQuery(body['title'], body['content'], body['id_author'])
			);
			buildObjectResponse(
				201,
				'Post posted successfully',
				newPost.rows[0],
				'newPost',
				res
			);
		} else {
			buildSimpleResponse(400, 'Bad request', res);
		}
	} catch {
		buildSimpleResponse(500, 'Internal server error', res);
	}
}

//Function for creating a comment on a given post 
export async function createComment(req: IncomingMessage, res: ServerResponse) {
	try {
		let data: string[] = [];
		await req.on('data', (chunk: string) => {
			data.push(chunk.toString());
		});
		const body = JSON.parse(data[0]);
		let urlPath = String(req.url).match(commentRegex);
		if (urlPath !== null) {
			const newComment = await client.query(
				insertCommentQuery(body['content'], body['id_author'], urlPath[1])
			);
			const newCommentRow = newComment.rows[0];
			buildObjectResponse(
				201,
				'Comment added successfully',
				newCommentRow,
				'comment',
				res
			);
		}
	} catch(error){
		console.log(error);
		buildSimpleResponse(500, 'Internal server error', res);
	}
}
