import { Client } from 'pg';
import { connect } from 'http2';
//Create the database client and connection 
const client = new Client({
	user: 'root',
	database: 'blogpost',
	host: 'localhost',
	password: 'toor',
	port: 5432
});
client.connect();
// Return the client connection when called 
export function clientConnection(): Client {
	return client;
}
