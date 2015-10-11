socket.on("chat",function(data){
  var d = new Date();
  d = d.getHours() + ":" + d.getMinutes();
  createChatMessageDiv(data.un, data.ui, data.text, d);
});
socket.on('movie',function(data){});
socket.on('cinema',function(data){});
socket.on('map',function(data){});
socket.on('flight',function(data){});
socket.on('weather',function(data){});
socket.on('link',function(data){});
