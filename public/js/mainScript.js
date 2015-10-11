var bareier = {
	un : "Vivek",
	ui : 123
};

function sendAJAXRequest(url, data, method, callback) {
	$.ajax({
		'url' : url,
		'type': method,
		'data' : data,
		'success' : function(data) {
			callback(data)
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

	if(userid == bareier.ui) {
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
		var lid = $(".username-view", lastMessageDiv).attr("uid");
		if(lid == userid) {
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
	$("#chat-input-text").keypress(function(event) {
		var tempContent = $("#chat-input-text").html();
		if(tempContent.length > 0) {
			if(event.keyCode == 13) {
				var d = new Date();
				d = d.getHours() + ":" + d.getMinutes();
				createChatMessageDiv(bareier.un, bareier.ui, tempContent, d);
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
			switch(data.subtype) {
				case "getLoc" :
					displayLocationPermissionContent(data);
					break;
				case "getMarker" :
					displayLocationMapContent(data);
					break;
			}
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

function displayWeatherPermissionContent(data) {}
function displayWeatherContent(data) {}

function displayMoviePermissionContent(data) {}
function displayMovieContent(data) {}

function displayLinkContent(data) {}

function displayFlightPreviewContent(data) {}
function displayFlightContent(data) {}

function displayLocationPermissionContent(data) {}
function displayLocationMapContent(data) {}
function displayMapContent(data) {}