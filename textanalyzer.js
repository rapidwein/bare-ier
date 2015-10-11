var analyseText = function(text) { 
var data = {
	type: "",
	keyword: "", 
};
	var index1, index2;
	if(((index1 = text.indexOf("come to"))!= -1 || (index1 = text.indexOf("came to")) != -1|| (index1 = text.indexOf("gone to")) != -1|| (index1 = text.indexOf("went to"))!= -1) ) {
		s = text.charAt(index1+7);
		if(s == "." || s == text.length) {
			data.type = "DEFAULT";
			return data;
		}
		
		var endings = ['street', 'st.', 'road', 'rd.', 'blvd.', 'boulevard', 'crossings', 'trail', 'driveway', 'dr.', 'creek', 'city', 'state', 'province','county'];
		index2 = -1;
		i = 0;
		for(i = 0 ; i < endings.length ; i++) {
			if(text.indexOf(endings[i]) != -1) {
				index2 = text.indexOf(endings[i]);
				break;
			}
		}

		data.keyword = text.substring(index1 + 8);
		if(index2 != -1) {
			data.keyword = text.substring(index1 + 8, index2 + endings[i].length);
		}
		data.type = "LOCATION";
		console.log(data.keyword);
		
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
	else if((index1 = text.indexOf("watching")) != -1) {
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
	else if((index1 = text.indexOf("watch")) != -1) {
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
