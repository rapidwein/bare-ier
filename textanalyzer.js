var analyseText = function(text) { 
var data = {
	type: "",
	keyword: "", 
};
	var index1, index2;
	if(((index1 = text.indexOf("come to")) || (index1 = text.indexOf("came to")) || (index1 = text.indexOf("gone to")) || (index1 = text.indexOf("went to"))) != -1) {
		s = text.charAt(index+7);
		if(s == "." || s == text.length - 1) {
			data.type = "DEFAULT";
			return data;
		}
		if((index2 = text.indexOf(" ",index1 + 8)) != -1) {
			data.keyword = text.substring(index1 + 8, index2);
			if(data.keyword == "a" || data.keyword == "the") {
				data.type = "DEFAULT";
				return data;
			}
		
		}
		else
			data.keyword = text.substring(index1 + 8,text.length);
			data.type = "LOCATION";
		
		
	}
	else if((index1 = text.indexOf("watched")) != -1) {
		s = text.charAt(index1+7);
		if(s == "." || s == text.length) {
			data.type = "DEFAULT";			
			return data;
		}
		data.keyword = text.substring(index1 + 8,text.length);
		data.type = "MOVIE";	
	}
	else if(((index1 = text.indexOf("watching")) != -1) && (((index2 = text.indexOf("movie")) == -1) || (text.indexOf("movie") == text.length-5))) {
		s = text.charAt(index1+8);
		if(s == "." || s == text.length - 1) {
			data.type = "DEFAULT";			
			return data;
		}
		data.keyword = text.substring(index1 + 9,text.length);
		data.type = "MOVIE";	
	}
	else if((index1 = text.indexOf("coming to")) != -1) {
		s = text.charAt(index1+9)
		if(s == "." || s == text.length - 1) {
			data.type = "DEFAULT";			
			return data;
                }
		if((index2 = text.indexOf(" ",index1 + 10)) != -1) {
			data.keyword = text.substring(index1 + 10, index2 - 1);
			if(data.keyword == "a" || data.keyword == "the") {
				data.type = "DEFAULT";						
				return data;
			}
		
		}
		else
			data.keyword = text.substring(index1 + 10,text.length);
			data.type = "LOCATION";
                
		
	}

	else if((index1 = text.indexOf("go to")) != -1) {
		s = text.charAt(index1+5);
		if(s == "." || s == text.length - 1) {
			data.type = "DEFAULT";	
			return data;
		}
		if((index2 = text.indexOf(" ",index1 + 6)) != -1) {
			data.keyword = text.substring(index1 + 6, index2 - 1);
			if(data.keyword == "a" || data.keyword == "the") {
				data.type = "DEFAULT";
				return data;
			}		
		}
		else
			data.keyword = text.substring(index1 + 6,text.length);
			data.type = "LOCATION";
	}

	else if((index1 = text.indexOf("going to")) != -1) {
		s = text.charAt(index1+8);
		if(s == "." || s == text.length - 1) {
			data.type = "DEFAULT";
			return data;
		}
		if((index2 = text.indexOf(" ",index1 + 9)) != -1) {
			data.keyword = text.substring(index1 + 9, index2 - 1);
			if(data.keyword == "a" || data.keyword == "the") {
				data.type = "DEFAULT";				
				return data;
			}
		
		}
		else
			data.keyword = text.substring(index1 + 9,text.length);
			data.type = "LOCATION";
			
	}
	else if(((index1 = text.indexOf("watch")) != -1) && (((index2 = text.indexOf("movie")) == -1) || (text.indexOf("movie") != text.length-5))) {
		s = text.charAt(index1+5);
		if(s == "." || s == text.length - 1) {
			data.type = "DEFAULT" ;
			return data;
		}
		data.keyword = text.substring(index1 + 6,text.length);
		data.type = "MOVIE";
			
	}
		
		
	else if((index1 = text.indexOf("movie")) != -1) {
		data.keyword = "movie";
		data.type = "CINEMA";
	}
	
	else if((index1 = text.indexOf("weather")) != -1) {
               data.keyword = "weather";
		data.type = "WEATHER";   
	}
                
	else if((index1 = text.indexOf("temperature")) != -1) {
		data.keyword = "weather";
		data.type = "WEATHER";
		
	}
	
	
	
      return data;
		

               }
exports.analyseText = analyseText; 
