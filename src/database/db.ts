import { Client } from 'pg';
import { connect } from 'http2';
const client = new Client({
	user: 'root',
	database: 'blogpost',
	host: 'localhost',
	password: 'toor',
	port: 5432
});
client.connect();
export function clientConnection(): Client {
	return client;
}
