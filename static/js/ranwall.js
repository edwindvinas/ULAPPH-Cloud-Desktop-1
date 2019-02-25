//random images for html widget window
var isActive = true;

window.onfocus = function () { 
  isActive = true; 
}; 

window.onblur = function () { 
  isActive = false; 
};

//check if fixed wallpaper is set
var bgImgUrl = document.getElementById("DEFAULT_WALLPAPER").value;
if (bgImgUrl != "") {
	//fix the wallpaper
	document.getElementById('page').style.backgroundImage = "url(" + bgImgUrl + ")";
	//stop intervalTrigger
	//window.clearInterval(id);
} else {
	changWP();
}

var id = intervalTrigger();

function intervalTrigger() {
  return window.setInterval( function() {
	var em = document.getElementById("mode");
	if (em.value == "full" || em.value == "guest" || em.value == "qr") {
		//check if fixed wallpaper is set
		var bgImgUrl = document.getElementById("DEFAULT_WALLPAPER").value;
		if (bgImgUrl != "") {
			//fix the wallpaper
			document.getElementById('page').style.backgroundImage = "url(" + bgImgUrl + ")";
			//stop intervalTrigger
			window.clearInterval(id);
		} else {
			changWP();
		}
	}
  }, 60000 );
};

function changWP()
{
	if (isActive == false) {
		return;
	}
	//check if random is paused
	var rn = document.getElementById("ranid")
	ranVal = rn.value;
	
	if (ranVal == "pause") {
		return;
	}

  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
	xhrn=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
	xhrn=new ActiveXObject('MSXML2.XMLHTTP.3.0');
  }

  // construct an HTTP request
  var desktop = document.getElementById("desktop").value;
  var uwmwponly = document.getElementById("uwmwponly").value;
  xhrn.open("GET", "/media?FUNC_CODE=GET_RAN_WP"+"&uwmwponly="+uwmwponly+"&desktop="+desktop, true);
  xhrn.setRequestHeader('Content-Type', 'text/plain; charset=UTF-8');
  //console.log("/media?FUNC_CODE=GET_RAN_WP");
  xhrn.send();

 	xhrn.onreadystatechange = function(){
	  if (xhrn.readyState==4 && xhrn.status==200)
		{
		  var wpData = xhrn.responseText;
		  //console.log(wpData);

		  if (wpData != "") {
			//get random number
			var SPL = wpData.split("@888@");
			bgImgUrl = SPL[1];
			bgImgTitle = SPL[2];
			bgImgDesc = SPL[3];
			
			ranVal = SPL[0];
			if (ValidURL(bgImgUrl) == true) {
				document.getElementById('page').style.backgroundImage = "url(" + bgImgUrl + ")";
				//save local storage
				var root = location.protocol + '//' + location.host;
				localStorage[root+"UWM_WALLP"+desktop] = bgImgUrl;
			}
			//update hidden value ranval
			var rn = document.getElementById("ranid")
			rn.value = ranVal;
		  }
		}
	};
}

function ValidURL(textval) {
    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
}

function nextWp() {
	//GET hidden value ranval
	var rn = document.getElementById("ranid")
	ranVal = rn.value;
	
	if (ranVal == "pause") {
		//show uwm windows instead
		windowManager.nextwindow();
		return;
	}
	
	alertifyThis("Changing wallpaper...");
	var urlParams;
	var match,
			pl     = /\+/g,  // Regex for replacing addition symbol with a space
			search = /([^&=]+)=?([^&]*)/g,
			decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
			query  = window.location.search.substring(1);

	urlParams = {};
	while (match = search.exec(query))
	   urlParams[decode(match[1])] = decode(match[2]);	
			
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
	xhsm=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
	xhsm=new ActiveXObject('MSXML2.XMLHTTP.3.0');
  }

  // construct an HTTP request
  var desktop = document.getElementById("desktop").value;
  var uwmwponly = document.getElementById("uwmwponly").value;
  xhsm.open("GET", "/media?FUNC_CODE=GET_RAN_WP&SEQ=" + ranVal + "&mode=" + urlParams["mode"]+"&uwmwponly="+uwmwponly+"&desktop="+desktop, true);
  xhsm.setRequestHeader('Content-Type', 'text/plain; charset=UTF-8');
  xhsm.send();

 	xhsm.onreadystatechange = function(){
	  if (xhsm.readyState==4 && xhsm.status==200)
		{
		  var wpData = xhsm.responseText;
		  //console.log(wpData);

		  if (wpData != "") {
			//get random number
			var SPL = wpData.split("@888@");
			bgImgUrl = SPL[1];
			ranVal = SPL[0];
			bgImgTitle = SPL[2];
			bgImgDesc = SPL[3];
			
			if (ValidURL(bgImgUrl) == true || bgImgUrl.indexOf("lh3.googleusercontent.com")) {
				document.getElementById('page').style.backgroundImage = "url(" + bgImgUrl + ")";
			}
			
			//display title/desc via alertify
			if (bgImgTitle != "" || bgImgDesc != "") {
				var innerHTML = "<img src='/img/info.png' width=80 height=80></img><br><font color=yellow>" + bgImgTitle + " - " + bgImgDesc + "</font>";
				alertifyThisWp(innerHTML);				
			}
			
			//update hidden value ranval
			var rn = document.getElementById("ranid")
			rn.value = ranVal;

		  }
		}
	};
}

function pauseWp() {
	
	//check if fixed wallpaper is set
	var bgImgUrl = document.getElementById("DEFAULT_WALLPAPER").value;
	if (bgImgUrl != "") {
		//means user has initial fix wallpaper
		document.getElementById("DEFAULT_WALLPAPER").value = "";
		var id = intervalTrigger();
		return
	}

	//GET hidden value ranval
	var rn = document.getElementById("ranid")
	ranVal = rn.value;
	
	if (ranVal == "pause") {
		rn.value = "1";
		alertifyThis("Wallpaper enabled.");
	} else {
		rn.value = "pause";
		alertifyThis("Wallpaper paused.");
	}
	
}

function alertifyThisWp(message) {
	alertify.set({ delay: 20000 });
	alertify.log(message);
	return;
};



