import * as http from 'http';
import * as url from 'url';
import { handler } from './handler';

//var server = http.createServer(handler);
var server = http.createServer((request, response) => {
	let parts = url.parse(String(request.url)).query;
	if (parts == '/') {
		handler(request, response);
	} else if ((parts = 'blogpost')) {
		handler(request, response);
	} else {
		response.writeHead(404, { 'Content-type': 'text/plain' });
		response.end('Unknow route');
	}
});
server.listen(8080);
