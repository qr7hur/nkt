var pg = require('pg').native
  , connectionString = process.env.dbconnstr
  , client
  , query;

client = new pg.Client(connectionString);
client.connect();
query = client.query('CREATE TABLE plugins (name VARCHAR(100),file VARCHAR(100000))');
query.on('end', function() {
	query = client.query('CREATE TABLE plugins_backup (name VARCHAR(100),file VARCHAR(100000))');
	query.on('end', function() { client.end(); });
});
