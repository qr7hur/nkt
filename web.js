var port = Number(process.env.PORT || 3000);

var fs = require('fs');
//var https = require('https');
var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var logfmt = require('logfmt');

var app = express();
//var server = https.createServer({
//        key:fs.readFileSync('server.key'),
//        cert:fs.readFileSync('server.cert')
//    },
//    app);
var server = http.Server(app);
var io = require('socket.io')(server);

app
  .use(logfmt.requestLogger())
  .use('/files', express.static(path.join(__dirname, 'files')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .get('*', function (req, res, next) {
    if (
      req.headers['x-forwarded-proto'] != 'https' &&
      process.env.NODE_ENV !== 'dev'
    ) {
      //res.redirect('https://' + req.headers.host + req.url);
      next();
    } else next();
  })
  .get('/', function (req, res) {
    res.header(
      'Cache-Control',
      'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
    );
    // res.header('Content-Security-Policy', "default-src 'self' wss://nkt.herokuapp.com; script-src 'self' 'unsafe-eval' 'unsafe-inline'");
    res.render('test.pug', {
      title: 'Home',
      port: port,
    });
  })
  .get('/port.js', function (req, res) {
    res.send('var port=' + port + ';');
  })

io.on('connection', function (socket) {
  socket.on('new_msg2', function (data) {
    if (data) socket.broadcast.emit('new_msg2', data);
  });

  socket.on('ping2', function (data) {
    if (data) socket.broadcast.emit('ping2', data);
  });

  socket.on('corev2', function (data) {
    if (data) socket.broadcast.emit('corev2', data);
  });
});

server.listen(port, function () {
  console.log('Listening on ' + port);
});
