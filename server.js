var express = require("express"),
    app = express(),
    http = require("http").createServer(app),
    io = require("socket.io")(http),
    //analyze = require("analyzer.js"),
    port = 3000,
    ipaddr = 'localhost';
var users = {
  123: "Vivek",
  234: "Varun"
}
io.on('connection', function(socket){
  console.log("user connected");
  socket.on("process",function(process){
    if(process.ui == 123)
      process.un = "Varun";
    else
      process.un = "Vivek";
    socket.emit('process',process);
//    var data = analyze.textAnalyzer(process.text);
//    //   socket.emit(data.type, data.data);
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
