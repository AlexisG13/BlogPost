import * as http from 'http';
import * as url from 'url';
import { allPostsHandler } from './postsHandler';
import { postRouter } from './postHandler';

var server = http.createServer((request, response) => {
	let parts = url.parse(String(request.url)).query;
	if ((parts === 'posts/')) {
		postRouter(request, response);
	} else {
		response.writeHead(404, { 'Content-type': 'text/plain' });
		response.end('Unknow route');
	}
});
server.listen(4000);
