import { clientConnection } from './db';
import { IncomingMessage, ServerResponse } from 'http';
const client = clientConnection();
const myRegex = /^\/posts\/comments/;

export async function postHandler(req: IncomingMessage, res: ServerResponse) {
	let data: string[] = [];
	await req.on('data', (chunk: string) => {
		data.push(chunk.toString());
	});
	const body = JSON.parse(data[0]);
	if (myRegex.test(String(req.url))) {
		const newComment = await client.query(`INSERT INTO comment(
			content,id_author,id_post)
			VALUES ('${body['content']}',${body['id_author']},${body['id_post']}) 
			RETURNING *; 
			`);
		res.writeHead(201, { 'Content-Type': 'application/json' });
		res.end(
			JSON.stringify({
				status: 201,
				message: 'Comment added succesfully',
				addedComment: newComment.rows[0]
			})
		);
	} else {
		const newPost = await client.query(`INSERT INTO post(
        title, content, id_author,created_at,update_at)
		VALUES ('${body['title']}', '${body['content']}',${body['id_author']},
		CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
		RETURNING *;
		`);
		console.log(newPost);
		res.writeHead(201, { 'Content-Type': 'application/json' });
		res.end(
			JSON.stringify({
				status: 201,
				message: 'Post posted succesfully',
				newPost : newPost.rows[0]
			})
		);
	}
}
