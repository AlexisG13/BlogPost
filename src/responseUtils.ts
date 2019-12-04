import { ServerResponse } from 'http';

export function buildSimpleResponse(code: number, message: string, res: ServerResponse) {
    res.writeHead(code, { 'Content-type': 'application/json' })
       .end(JSON.stringify({status:code,message:message}));
}

export function buildObjectResponse(code:number,message:string,post:object,res:ServerResponse){
    res.writeHead(code, { 'Content-type': 'application/json' })
       .end(JSON.stringify({status:code,message:message,post:post}));
}


