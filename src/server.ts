import * as http from 'http';
import * as url from 'url';
import { postRouter } from './postRouter';
const routeRegex = /\/posts/

var server = http.createServer((request, response) => {
	if (routeRegex.test(String(request.url))) {
		postRouter(request, response);
	} else {
		response.writeHead(404, { 'Content-type': 'text/plain' });
		response.end('Unknow route');
	}
});
server.listen(4000);
