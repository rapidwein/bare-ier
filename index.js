var app = require("express")(),
    port = 3000,
    ipaddr = 'localhost';
app.get('/',function(req,res){
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, ipaddr, function(){
  console.log("Started");
});
