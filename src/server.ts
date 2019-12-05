import * as http from 'http';
import { postRouter } from './router/postRouter';
import { buildSimpleResponse } from './utils/responseUtils';
import { commentRouter } from './router/commentRouter';
const postRegex = /\/posts/;
const commentRegex = /\/posts\/[0-9]+\/comments/;

var server = http.createServer((req, res) => {
	if (commentRegex.test(String(req.url))) {
		commentRouter(req, res);
	} else if (postRegex.test(String(req.url))) {
		postRouter(req, res);
	} else {
		buildSimpleResponse(404, 'Resource not found', res);
	}
});
const port = 8080;
console.log(`Listening on port ${port}`);
server.listen(port);
