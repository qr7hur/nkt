const { Client } = require('pg');
const connectionString = process.env.dbconnstr;

const client = new Client(connectionString);
(async () => {
  await client.connect();

  await client.query(
    'CREATE TABLE plugins (name VARCHAR(100),file VARCHAR(100000))'
  );
  await client.query(
    'CREATE TABLE plugins_backup (name VARCHAR(100),file VARCHAR(100000))'
  );
  await client.end();
})();
