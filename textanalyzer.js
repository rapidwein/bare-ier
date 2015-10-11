var express = require('express');
var exports = module.exports = {};
var main = require("./main");
var text = chatText;
var data = {
	type: "",
	keyword: "", 
};
exports.anaylseText = function(text) { 
	
	if(index1 = text.indexof("come to") || index1 = text.indexof("came to") || index1 = text.indexof("gone to") || index1 = text.indexof("went to") ) {
		s = text.charAt(index+7);
		if(s == "." || s == text.length() - 1) {
			data.type = "DEFAULT";
			return data;
		}
		if(index2 = text.indexof(" ",index1 + 8) != -1) {
			data.keyword = text.substring(index1 + 8, index2 - 1);
			if(data.keyword == "a" || data.keyword == "the") {
				data.type = "DEFAULT";
				return data;
			}
		
		}
		else
			data.keyword = text.substring(index1 + 8,text.length - 1);
			data.type = "LOCATION";
		
		
	}
	else if((index = test.indexof("watched"))) {
		s = text.charAt(index+7);
		if(s == "." || s == text.length() - 1) {
			data.type = "DEFAULT";			
			return data;
		}
		data.keyword = text.substring(index1 + 8,text.length - 1);
		data.type = "MOVIE";	
	}
	else if((index = test.indexof("watching"))) {
		s = text.charAt(index+8);
		if(s == "." || s == text.length() - 1) {
			data.type = "DEFAULT";			
			return data;
		}
		data.keyword = text.substring(index1 + 9,text.length - 1);
		data.type = "MOVIE";	
	}
	else if(index1 = text.indexof("coming to") ) {
		s = text.charAt(index+9)
		if(s == "." || s == text.length() - 1) {
			data.type = "DEFAULT";			
			return data;
		if(index2 = text.indexof(" ",index1 + 10) != -1) {
			data.keyword = text.substring(index1 + 10, index2 - 1);
			if(data.keyword == "a" || data.keyword == "the") {
				data.type = "DEFAULT";						
				return data;
			}
		
		}
		else
			data.keyword = text.substring(index1 + 10,text.length - 1);
			data.type = "LOCATION";
		
	}

	else if(index = test.indexof("go to")) {
		s = text.charAt(index+5);
		if(s == "." || s == text.length() - 1) {
			data.type = "DEFAULT";	
			return data;
		}
		if(index2 = text.indexof(" ",index1 + 6) != -1) {
			data.keyword = text.substring(index1 + 6, index2 - 1);
			if(data.keyword == "a" || data.keyword == "the") {
				data.type = "DEFAULT";
				return data;
			}		
		}
		else
			data.keyword = text.substring(index1 + 6,text.length - 1);
			data.type = "LOCATION";
	}

	else if(index = test.indexof("going to")) {
		s = text.charAt(index+8);
		if(s == "." || s == text.length() - 1) {
			data.type = "DEFAULT";
			return data;
		}
		if(index2 = text.indexof(" ",index1 + 9) != -1) {
			data.keyword = text.substring(index1 + 9, index2 - 1);
			if(data.keyword == "a" || data.keyword == "the") {
				data.type = "DEFAULT";				
				return data;
			}
		
		}
		else
			data.keyword = text.substring(index1 + 9,text.length - 1);
			data.type = "LOCATION";
			
	}
	else if((index = test.indexof("watch"))) {
		s = text.charAt(index+5);
		if(s == "." || s == text.length() - 1) {
			data.type = "DEFAULT" ;
			return data;
		}
		data.keyword = text.substring(index1 + 6,text.length - 1);
		data.type = "MOVIE";
			
	}
		
		
	else if(index = test.indexof("movie")) {
		data.keyword = "movie";
		data.type = "CINEMA";
	}
	
	else if(index = text.indexof("weather")) {
               data.keyword = "weather";
		data.type = "WEATHER";   
	}
	else if(index = text.indexof("temperature")) {
		data.keyword = "weather";
		data.type = "WEATHER";
		
	}
	
	
	
      return data;
		


}
