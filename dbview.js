var pg = require('pg'),
  connectionString = process.env.dbconnstr,
  client,
  query;

client = new pg.Client(connectionString);
client.connect();
query = client.query('SELECT * FROM plugins');
console.log('plugins');
query.on('row', function (row) {
  console.log('name: %s', row.name);
  console.log('file: %s', row.file);
});
query.on('end', function () {
  query = client.query('SELECT * FROM plugins_backup');
  console.log('plugins_backup');
  query.on('row', function (row) {
    console.log('name: %s', row.name);
    console.log('file: %s', row.file);
  });
  query.on('end', function () {
    client.end();
  });
});
