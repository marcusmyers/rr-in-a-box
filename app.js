
/**
 * Module dependencies.
 */

var express = require('express')
  , board = require('./routes/board')
  , bodyParser = require('body-parser')
  , csv = require('fast-csv')
  , errorHandler = require('errorhandler')
  , http = require('http')
  , monitor = require('./routes/monitor')
  , path = require('path')
  , routes = require('./routes')
  , sqlite3 = require('sqlite3')
  , user = require('./routes/user');

var app = express();
var fs = require('fs');
var rrdb = __dirname + '/db_storage/rr.db';
var pickeddb = __dirname + '/db_storage/picked.db';
var stream = fs.createReadStream("RR-2016.csv");
 
csv
 .fromStream(stream)
   .on("data", function(data){
          console.log(data);
           })
 .on("end", function(){
        console.log("done");
         });

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.methodOverride());
//app.use(app.Router());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
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
