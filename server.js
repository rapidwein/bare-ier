var express = require("express"),
    app = express(),
    http = require("http").createServer(app),
    io = require("socket.io")(http),
    port = 3000,
    ipaddr = 'localhost';
io.on('connection', function(socket){
  console.log("user connected");
  socket.on("process",function(process){
    console.log(process);
  });
});
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/public', express.static(__dirname + '/public'));
app.get('/',function(req,res){
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(port, function(){
  console.log("listening on *: " + port);
});
