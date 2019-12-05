import { ServerResponse, IncomingMessage } from 'http';
import { QueryResult } from 'pg';
import { updateBody } from '../classes/interfaces';

//Build a simple response with just a code and a message 
export function buildSimpleResponse(
	code: number,
	message: string,
	res: ServerResponse
) {
	res
		.writeHead(code, { 'Content-type': 'application/json' })
		.end(JSON.stringify({ status: code, message: message }));
}

// Build a response with a code, message, and a object
export function buildObjectResponse(
	code: number,
	message: string,
	keyValue: object,
	keyName : string,
	res: ServerResponse
) {
	res.writeHead(code, { 'Content-type': 'application/json' });
	res.end(JSON.stringify({ status: code, message: message, [`${keyName}`] : keyValue}));
}

//dsdsdsdsdsdsds
export async function getBodyContent(
	req: IncomingMessage
): Promise<updateBody> {
	let data: string[] = [];
	await req.on('data', (chunk: string) => {
		data.push(chunk.toString());
	});
	const body: updateBody = JSON.parse(data[0]);
	return body;
}

//Function for counting the rows on a QueryResult, if the count is 0 then no rows were affected
export async function countRows(queryResult: QueryResult, res: ServerResponse) {
	if (queryResult.rowCount === 0)
		buildSimpleResponse(404, 'Post not found', res);
}
