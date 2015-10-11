var bareier = {
	un : document.cookie.split(";")[0].substring(9),
	ui : document.cookie.split(";")[0].substring(9),
	room : document.cookie.split(";")[1].substring(6)
};

function sendAJAXRequest(url, data, method, callback) {
	$.ajax({
		'url' : url,
		'type': method,
		'data' : data,
		'success' : function(data) {
			callback(data);
		},
		'error' : function(data) {
			console.log('ERROR : ' + data);
		}
	});
}


function createChatMessageDiv(username, userid, message, time) {
	var mainDiv = document.createElement("div");
	$(mainDiv).addClass("message-container");

	var usernameDiv = document.createElement("div");
	$(usernameDiv).addClass("username-view");
	$(usernameDiv).attr("uid", userid);

	var messageDiv = document.createElement("div");
	$(messageDiv).addClass("message-view");

	var timeDiv = document.createElement("div");
	$(timeDiv).addClass("time-view");

	$(usernameDiv).html(username);
	$(messageDiv).html(message);
	$(timeDiv).html(time);

	if(username == bareier.un) {
		$(mainDiv).addClass("type1");
	}
	else {
		$(mainDiv).addClass("type2");
	}

	$(mainDiv).append(usernameDiv);
	mainDiv.appendChild(messageDiv);
	messageDiv.appendChild(timeDiv);

	var lastMessageDiv = $("#chat-messages").children().last();
	if(lastMessageDiv.parent().children().length > 0) {
		var lid = $(".username-view", lastMessageDiv).html();
		if(lid == username) {
			$(".message-view", lastMessageDiv).parent().append(messageDiv);
		}
		else {
			$("#chat-messages").append(mainDiv);
		}
	}
	else {
		$("#chat-messages").append(mainDiv);
	}
	document.getElementById("chat-messages").scrollTop = document.getElementById("chat-messages").scrollHeight;
}

$(document).ready(function() {
	io().emit('join', {'name' : bareier.room});
	$("#chat-input-text").keypress(function(event) {
		var tempContent = $("#chat-input-text").html();
		if(tempContent.length > 0) {
			if(event.keyCode == 13) {
				var d = new Date();
				d = d.getHours() + ":" + d.getMinutes();
				//createChatMessageDiv(bareier.un, bareier.ui, tempContent, d);
				process = {ui: bareier.ui, un: bareier.un, type: 'chat', text: tempContent};
      			io().emit('process',process);
      			$("#chat-input-text").html("");
			}
		}
	});
});

function displayCard(type, data) {
	switch(type) {
		case 'weather' : 
			displayWeatherPermissionContent(data);
			break;
		case "movie" :
			displayMoviePermissionContent(data);
			break;
		case "link" :
			displayLinkContent(data);
			break;
		case "flight" :
			displayFlightPreviewContent(data);
			break;
		case "map" :
			displayMapPermissionContent(data);
			break;
		case "displayWeather" :
			displayWeatherContent(data);
			break;
		case "displayMovie" :
			displayMovieContent(data);
			break;
		case "displayFlight" :
			displayFlightContent(data);
			break;
		case "displayMap" :
			displayMapContent(data);
			break;
	}
}


function createPermissionDiv(data, callback) {
	var mainDiv = document.createElement("div");
	mainDiv.id = "permission-card";

	var questionDiv = document.createElement("div");
	questionDiv.id = "permission-question";
	$(questionDiv).html(data.question);

	var pInput = document.createElement("div");
	pInput.id = "permission-ip-cont";

	var yB = document.createElement("button");
	yB.id = "perm-yes";
	yB.value = "yes";
	$(yB).html("Yes");
	$(yB).on('click', (function(k) { 
        return function() {
        	cdata = {
				'type' : k.type,
				'choice' : 'y',
				'keyword' : data.keyword
			};
            callback(cdata);
        };
    })(data));

	var nB = document.createElement("button");
	nB.id = "perm-no";
	nB.value = "no";
	$(nB).html("No");
	$(nB).on('click', (function(k) { 
        return function() {
        	cdata = {
				'type' : k.type,
				'choice' : 'n',
				'keyword' : data.keyword
			};
            callback(cdata);
        };
    })(data));


	pInput.appendChild(yB);
	pInput.appendChild(nB);

	mainDiv.appendChild(questionDiv);
	mainDiv.appendChild(pInput);


	return mainDiv;
}

function createPermissionDiv1(data, callback) {
	var mainDiv = document.createElement("div");
	mainDiv.id = "permission-card";

	var questionDiv = document.createElement("div");
	questionDiv.id = "permission-question";
	$(questionDiv).html(data.question + "<br/>Place : <input type='text' name='place' id='placeinput' />");

	var pInput = document.createElement("div");
	pInput.id = "permission-ip-cont";

	var yB = document.createElement("button");
	yB.id = "perm-yes";
	yB.value = "yes";
	$(yB).html("Yes");
	$(yB).on('click', (function(k) { 
        return function() {
        	cdata = {
				'type' : k.type,
				'choice' : 'y',
				'keyword' : $("#placeinput").val()
			};
            callback(cdata);
        };
    })(data));

	var nB = document.createElement("button");
	nB.id = "perm-no";
	nB.value = "no";
	$(nB).html("No");
	$(nB).on('click', (function(k) { 
        return function() {
        	cdata = {
				'type' : k.type,
				'choice' : 'n',
				'keyword' : $("#placeinput").val()
			};
            callback(cdata);
        };
    })(data));


	pInput.appendChild(yB);
	pInput.appendChild(nB);

	mainDiv.appendChild(questionDiv);
	mainDiv.appendChild(pInput);


	return mainDiv;
}

function processUserPermChoice(cdata) {
	$("#permission-card").remove();
	var url = '/room/' + bareier.room;
	if(cdata.choice == 'y') 
		sendAJAXRequest(url, cdata, 'post', processDisplayContent);
}

function processDisplayContent(data) {console.log(data, typeof(data));
	data = $.parseJSON(data);
	displayCard(data.type, data.data);
}
function displayWeatherPermissionContent(data) {
	var div = createPermissionDiv1({ 'question' : 'Do you want to view weather information?', 'type' : 'WEATHER', 'keyword' : data}, processUserPermChoice);
	$("#screen-share-container").append(div);
}
function displayWeatherContent(data) {
	var html = "<div style='height:95%;overflow-y : none;color:white;margin-left:20%;margin-right:auto;'><button style='float:right; onClick='$(this).parent().remove();'>Close</button>";
	temp = data.list;
	n = data.cnt;
	
		var x = "<div>";
		t = temp[0];
		d = new Date();
		x += "<div style='font-size:280px;'>" + ((t.main.temp)-273).toFixed(1) + "°C</div>";
		x += "<div style='font-size : 30px;'>" + (parseInt(d.getMonth())+1) + "/" + d.getDate() + " " + data.city.name;
		x += "<b style='margin-left:55px;'>Min</b>: " + ((t.main.temp_min)-273).toFixed(1) + "°C ";
		x += "<b style='margin-left:55px;'>Max</b>: " + ((t.main.temp_max)-273).toFixed(1) + "°C ";
		x += "<b style='margin-left:55px;'>Humidity</b>: " + t.main.humidity + "%<br></div>" + "</div>";
		html += x;
	html += "</div>";
	$("#screen-share-container").html(html);
}

function displayMoviePermissionContent(data) {
	var div = createPermissionDiv({ 'question' : 'Do you want to view about the movie ' + data, 'type' : 'MOVIE', 'keyword' : data}, processUserPermChoice);
	$("#screen-share-container").append(div);
}
function displayMovieContent(data) {
	if(data.Response != "False") {
		var html = "<div style='height:95%;overflow-y : none;margin-top:5%;width:75%;color:white;margin-left:auto;margin-right:auto;border:1px solid black; padding :20px; text-align:justify;'><button style='float:right;' onClick = '$(this).parent().remove();'>Close</button><h1 align=center>" + data.Title + "</h1><div align=center><img src='"+data.Poster+"'></div><div style='text-align:justify;'><b>Plot : </b>"+data.Plot+"</div><div><b>Year : </b>" + data.Year + "</div>" + 
					"<div><b>Director : </b>" + data.Director + "</div><div><b>Actors : </b>" + data.Actors + "</div><div><b>Writer : </b>" + data.Writer + "</div>"+
					"<div><b>Release date : </b>" + data.Released + "</div><div><b>Language : </b>" + data.Language + "</div><div><b>Runtime : </b>" + data.Runtime + "</div>"+
					"<div><b>imDb Rating : </b>" + data.imdbRating + "</div></div>";
		$("#screen-share-container").html(html);
	}
	else {
		var html = "<div style='height:95%;overflow-y : none;margin-top:5%;width:75%;color:white;margin-left:auto;margin-right:auto;border:1px solid black; padding :20px; text-align:justify;'>" +
					"<button style='float:right;' onClick = '$(this).parent().remove();'>Close</button>"+
					"<div>Movie not found</div></div>";
		$("#screen-share-container").html(html);	
	}
}

function displayLinkContent(data) {}

function displayFlightPreviewContent(data) {}
function displayFlightContent(data) {}

function displayMapPermissionContent(data) {
	var div = createPermissionDiv({ 'question' : 'Do you want to view maps for  ' + data, 'type' : 'MAP', 'keyword' : data}, processUserPermChoice);
	$("#screen-share-container").append(div);
}
function displayMapContent(data) {
	$("#mapContent").remove();
	
	$("#screen-share-container").append("<div><div id='mapContent' style='position:absolute; top:5%;left :0px; width:100%; height:95%'></div><button style='float:right;' onClick = '$(this).parent().remove();'>Close</button></</div>");

	var map;
	function initMap() {
	  var mapProp =  {
	    center: new google.maps.LatLng(data[0].lat, data[0].lng),
	    zoom: 15,
	     mapTypeId:google.maps.MapTypeId.ROADMAP
	  }
	  map = new google.maps.Map(document.getElementById('mapContent'),mapProp);
	  
	  for (var i = 0; i < data.length; i++) {
	    createMarker({'geometry' : {'location' : {'lat' : data[i].lat, 'lng' : data[i].lng}}});
	  }
	}

function createMarker(place) {
	  var placeLoc = place.geometry.location;
	  var marker = new google.maps.Marker({
	    map: map,
	    position: place.geometry.location
	  });
	  marker.setMap(map);
	}

	
	//google.maps.event.addDomListener(window, 'load', initMap);
	
initMap();
//google.maps.event.addDomListener(window, 'load', initialize);
}

