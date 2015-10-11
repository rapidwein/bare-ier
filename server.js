var express = require("express"),
    app = express(),
    http = require("http").createServer(app),
    io = require("socket.io")(http),
    analyze = require("./textanalyzer"),
    port = 3000,
    request = require("request"),
    ipaddr = 'localhost';

var users = [];

var rooms = {};

var bodyParser = require('body-parser')

io.on('connection', function(socket){
  console.log("user connected");
  var roomName = "";
  socket.on('join', function(data) {
    socket.join(data.name);
    roomName = data.name;
    console.log(roomName);
  });

  socket.on("process",function(process){
    console.log(roomName + "RNAME");
    io.to(roomName).emit('chat',process);
    var data = analyze.analyseText(process.text);
    console.log(data);
    io.to(roomName).emit(data.type, data.keyword);
    console.log(process);

  });
});

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/public', express.static(__dirname + '/public'));
app.get('/',function(req,res){
  res.sendFile(__dirname + '/public/login.html');
});

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/room', urlencodedParser, function(req, res) {
  var uname = req.body.username;
  var room = req.body.room;
  if("join" in req.body) {
    rooms[room].push(uname);
  }
  else {
    rooms[room] = [uname];
  }
  res.redirect('/room/' + room);
});

app.post('/room/:id', urlencodedParser, function(req, res) {
  var room = req.params.id;
  var choice = req.body.choice;
  var type = req.body.type;
  var keyword = req.body.keyword;

  switch(type) {
    case 'MOVIE' :
      request("http://www.omdbapi.com/?t=" + keyword, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              res.end("{\"type\": \"displayMovie\", \"data\" : " + body + "}");
          }
      })

      break;
  }
});


app.get('/room',function(req,res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/room/:id', function(req, res) {
  var id = req.params.id;
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(port, function(){
  console.log("listening on *: " + port);
});

