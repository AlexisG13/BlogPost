import * as http from 'http';
import * as url from 'url';
import { postRouter } from './postRouter';
import { buildSimpleResponse } from './responseUtils';
const routeRegex = /\/posts/

var server = http.createServer((req, res) => {
	if (routeRegex.test(String(req.url))) {
		postRouter(req, res);
	} else {
		buildSimpleResponse(404,'Resource not found',res);
	}
});
server.listen(8080);
