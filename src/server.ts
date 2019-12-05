import * as http from 'http';
import { postRouter } from './postRouter';
import { buildSimpleResponse } from './utils/responseUtils';
const routeRegex = /\/posts/

var server = http.createServer((req, res) => {
	if (routeRegex.test(String(req.url))) {
		postRouter(req, res);
	} else {
		buildSimpleResponse(404,'Resource not found',res);
	}
});
const port = process.env.PORT||8080;
server.listen(port);
