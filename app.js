
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , board = require('./routes/board')
  , monitor = require('./routes/monitor')
  , http = require('http')
  , path = require('path');

var app = express();
var fs = require('fs');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/board', board.board);
app.get('/users', user.list);
app.get('/monitor', monitor.monitor);



var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);
var clients = {};

// Create csv file to write to and set first line to Ticket Number
fs.writeFile('pickedtickets.csv', 'Ticket Number\r\n', function (err) {
  if (err) return console.log(err);
  //console.log('Hello World > pickedtickets.csv');
});

// Write to csv file all the picked tickets
var info = fs.createWriteStream('pickedtickets.csv', {'flags': 'a'});

// Create Socket server connection
io.sockets.on('connection', function (socket) {
  clients[socket.id] = socket;

  socket.on('message', function (data) {
    console.log('Receieved data from client:',data);
    info.write(data+'\r\n');
    var n = data.split(",");
    io.sockets.emit('pickedcard', n[0]);
    io.sockets.emit('monitor', data);
  });

  //console.log('All connected clients: ', clients);
});
