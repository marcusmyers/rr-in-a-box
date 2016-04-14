
/**
 * Module dependencies.
 */

require('dotenv').config()

var express = require('express')
  , board = require('./routes/board')
  , bodyParser = require('body-parser')
  , csv = require('fast-csv')
  , errorHandler = require('errorhandler')
  , http = require('http')
  , monitor = require('./routes/monitor')
  , path = require('path')
  , routes = require('./routes')
  , sqlite3 = require('sqlite3').verbose()
  , user = require('./routes/user');

var app = express();
var fs = require('fs');
var rrdb = __dirname + '/db_storage/'+ process.env.RR_YEAR + '/' + process.env.NAMES_DB;
var pickeddb = __dirname + '/db_storage/' + process.env.RR_YEAR + '/' + process.env.PICKED_DB;
var rexists = fs.existsSync(rrdb);
var pexists = fs.existsSync(pickeddb);
var db = new sqlite3.Database(rrdb);
var pdb = new sqlite3.Database(pickeddb);
var stream = fs.createReadStream(process.env.NAMES_FILE);

db.serialize(function() {
  if(!rexists) {
    db.run("CREATE TABLE Tickets ('ticket_no' VARCHAR(3), 'first_name' VARCHAR(255), 'last_name' VARCHAR(255) DEFAULT '')", function(err){
      if(err !== null) {
        console.log(err);
      } else {
        console.log("SQL Table 'Tickets' initialized");
      }
    });
  }
csv
 .fromStream(stream)
   .on("data", function(data){
          db.run("INSERT INTO Tickets VALUES(?, ?, ?)",data);
           })
 .on("end", function(){
        console.log("done reading csv file.");
         });
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
    io.sockets.emit('pickedcard', data);
    console.log('Receieved data from client:',data);
    
    db.get("SELECT first_name, last_name FROM Tickets WHERE ticket_no=?", data, function(err,row){
      var name = row.first_name + " " + row.last_name;
      var ndata = data + ","+name;
      info.write(ndata+'\r\n');
      io.sockets.emit('work', name);
      io.sockets.emit('monitor', ndata);
    });
  });

  //console.log('All connected clients: ', clients);
});
