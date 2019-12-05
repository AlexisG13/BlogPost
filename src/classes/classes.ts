import { IncomingMessage, ServerResponse } from 'http';
import { getHandler, getAllComments } from '../handlers/getHandler';
import { putHandler, updateComment } from '../handlers/putHandler';
import { postHandler, createComment } from '../handlers/postHandler';
import { deleteHandler, deleteComment } from '../handlers/deleteHandler';
// Classes for handling the functions for both posts and comments depending on the method
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
