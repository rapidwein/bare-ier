var express = require("express"),
    http = require("http"),
    io = require("socket.io"),
    port = 3000,
    ipaddr = 'localhost';
var app = express();
var webServer = http.createServer(app).listen(port);
var socketServer = io.listen(webServer);
app.use('/public', express.static(__dirname + '/public'));

app.get('/',function(req,res){
  res.sendFile(__dirname + '/public/index.html');
});
