var socket = io();
socket.on("chat",function(data){
  var d = new Date();
  d = d.getHours() + ":" + d.getMinutes();
  createChatMessageDiv(data.un, data.ui, data.text, d);
});
socket.on('MOVIE',function(data){
  displayCard("movie", data);
});
socket.on('CINEMA',function(data){
	displayCard("movie", data);
});
socket.on('MAP',function(data){
	displayCard("movie", data);
});
socket.on('WEATHER',function(data){
	displayCard("movie", data);
});
