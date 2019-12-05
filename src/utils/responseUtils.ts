import { ServerResponse, IncomingMessage } from 'http';
import { updateBody } from '../classes/interfaces';
import { QueryResult } from 'pg';

export function buildSimpleResponse(
	code: number,
	message: string,
	res: ServerResponse
) {
	res
		.writeHead(code, { 'Content-type': 'application/json' })
		.end(JSON.stringify({ status: code, message: message }));
}

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

export async function countRows(queryResult: QueryResult, res: ServerResponse) {
	if (queryResult.rowCount === 0)
		buildSimpleResponse(404, 'Post not found', res);
}
