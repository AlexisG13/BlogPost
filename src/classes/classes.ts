import { IncomingMessage, ServerResponse } from 'http';
import { getHandler, getAllComments } from '../handlers/getHandler';
import { putHandler, updateComment } from '../handlers/putHandler';
import { postHandler, createComment } from '../handlers/postHandler';
import { deleteHandler, deleteComment } from '../handlers/deleteHandler';

export class PostHandler {
	get = getHandler;
	post = postHandler;
	put = putHandler;
	delete = deleteHandler;
}

export class CommentHandler {
	post = createComment;
	get = getAllComments;
	delete = deleteComment;
	put = updateComment;
}
