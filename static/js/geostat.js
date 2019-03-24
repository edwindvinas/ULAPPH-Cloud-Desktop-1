setInterval( function(){geoLatLon();}, 10000);

var isSlow = false;
var uwms = document.getElementById("uwms");
var tok = document.getElementById("tok");
var isActive = true;

//check if current window/tab on focus
window.onfocus = function () { 
  isActive = true; 
}; 

window.onblur = function () { 
  isActive = false; 
};

//parse URL values
var urlParams;
var match,
		pl     = /\+/g,  // Regex for replacing addition symbol with a space
		search = /([^&=]+)=?([^&]*)/g,
		decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
		query  = window.location.search.substring(1);

urlParams = {};
while (match = search.exec(query))
   urlParams[decode(match[1])] = decode(match[2]);

if (uwms.value != "" && uwms.value != undefined) {
	if (urlParams["u"] == undefined || urlParams["u"] == "undefined") {
		var ushare = document.getElementById("ushare");
		var title = document.getElementById("TITLE");
		if (ushare.value != "" && ushare.value != undefined) {
			document.getElementById("ping-res").innerHTML = "UWM" + "ushare" + '#' + ushare.value;
			if (title.value != "" && title.value != undefined) {
				document.title = "UWM" + "[" + title.value + "]" + '(' + ushare.value + ')' + '@' + window.location.host;
			} else {
				document.title = "UWM" + "ushare" + '(' + ushare.value + ')' + '@' + window.location.host;
			}
		} else {
			document.getElementById("ping-res").innerHTML = "UWM" + "guest" + '#' + uwms.value;
			document.title = "UWM" + "guest" + '(' + uwms.value + ')' + '@' + window.location.host;
		}
	} else {
		var dName = document.getElementById("dName");
		document.getElementById("ping-res").innerHTML = "UWM" + urlParams["u"] + '#' + uwms.value;
		if (dName.value != "" && dName.value != undefined) {
			document.title = "UWM" + urlParams["u"] + '[' + dName.value + ']' + '(' + uwms.value + ')' + '@' + window.location.host;
		} else {
			document.title = "UWM" + urlParams["u"] + '(' + uwms.value + ')' + '@' + window.location.host;
		}
	}
}

function success(position) {
    if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  cxhr2=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  cxhr2=new ActiveXObject('MSXML2.XMLHTTP.3.0');
	  } 
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
	console.log("latitude: "+latitude);
	console.log("longitude: "+longitude);
    console.log("maploc: "+latitude+","+longitude);
	var gpsURL = "/gps?lat=" + latitude + '&lon=' + longitude;
	cxhr2.open("POST", gpsURL, true); 
	cxhr2.send();
	 cxhr2.onreadystatechange=function()
	  {
	  if (cxhr2.readyState==4 && cxhr2.status==200)
		{
		var currVal = cxhr2.responseText;
			if (currVal != "OK") {
				return;
			}
		return;
		}
	 }
	return;
};

function error(msg) {
console.log("Client geolocation failed!");
/*
	console.log("Geo location failed!");
    if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  cxhr2=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  cxhr2=new ActiveXObject('MSXML2.XMLHTTP.3.0');
	  } 
	var gpsURL = "/gps?GPS_FUNC=USE_IP";
	cxhr2.open("POST", gpsURL, true); 
	cxhr2.send();
	 cxhr2.onreadystatechange=function()
	  {
	  if (cxhr2.readyState==4 && cxhr2.status==200)
		{
		var currVal = cxhr2.responseText;
			if (currVal != "OK") {
				return;
			}
		return;
		}
	 }
	return;
*/
}

function geoloc() {
	if (uwms.value != "") {
		return;
	}
	geoLatLon();
	if (('speechSynthesis' in window) || ('SpeechRecognition' in window)) {
		window.speechSynthesis.cancel();
	}
	g_Timeout = window.setInterval( function(){sendPingRequest();}, 10000);
	
	setInterval(function(){chkToken()}, 1800000);
	
	speakTime();
	setInterval(function(){speakTime()}, 900000);	
};

function geoLatLon() {
    if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(success, error);
	} else {
	  console.log("Geo location not supported!");
	}
}
function speakTime(){
	if (('speechSynthesis' in window) || ('SpeechRecognition' in window)) {
		var Digital=new Date()
		var nowIs = formatDate2(Digital);
		var nowNa = 'Time now is '+nowIs;
		var msg = new SpeechSynthesisUtterance();
		msg.rate = 1;
		msg.pitch = 1;
		msg.text = nowNa;
		window.speechSynthesis.speak(msg);
	}
}

function speakMessage(thisMsg){	
	var ss = document.getElementById("soundStat");
	if (ss.value == "off") {
		return;
	} else {
		var e = document.getElementById("musicFlag");
		var res = e.src;
		var n = res.indexOf("/img/musicon.png");
		if (n > 0) {
		} else {
			return;
		}
	}
	
	if (('speechSynthesis' in window) || ('SpeechRecognition' in window)) {
		//if message has >>> read only the left text
		var str = thisMsg;
		var n = str.indexOf(">>>");
		if (n > 0) {
			var res = str.split(">>>");
			if (res.length > 0) {
				thisMsg = res[0];
			}		
		}

		var msg = new SpeechSynthesisUtterance();
		msg.rate = 1;
		msg.pitch = 1;
		msg.text = thisMsg;
		window.speechSynthesis.speak(msg);
	}
}

function sendPingRequest(){
	var p = new Ping();
	var root = location.protocol + '//' + location.host + '/social?SO_FUNC=get-health';
	p.ping(root, function(data) {
		var d = new Date();
		var e = formatDate(d);
		
		//if very slow
		if (parseInt(data) > 15000) {
			if (isSlow == false) {
				isSlow = true;
				titleBlink("Slow Internet "+data+"ms","Very slow internet with delay "+data+"ms");
				alertify.error("Internet is very slow!", "", 0);
				var snd = Sound("data:audio/mp3;base64," + base64string);
				document.getElementById("ping-res").innerHTML = "<font color=red>" + e + " " + data + "ms" + "</font>";
			}
		} else {
			isSlow = false;
			titleBlink("ULAPPH Desktop "+data+"ms","ULAPPH Desktop delay "+data+"ms");
			document.getElementById("ping-res").innerHTML =  e + " " + data + "ms";
		}
	});
	
	if (isSlow == false) {
	//do this if internet is fast!
		//check if new messages
		chkGBM();
		//check eq alarms
		chkSYS1();
		//check site activity
		if (isActive == true) {
			chkSYS2();
		}
		//check external sites activity
		if (isActive == true) {
			chkSYS3();
		}
		//check broadcast msgs
		if (isActive == true) {
			chkBM();
		}
		//check knock msgs
		chkKN();
		//check motds
		if (isActive == true) {
			chkMOTD();
		}
	}
	return;
}

function chkGBM() {
	var aUser = document.getElementById("aUser");
	if (aUser.value == "") {
		return;
	}
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttpgbm=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttpgbm=new ActiveXObject('MSXML2.XMLHTTP.3.0');
	  }
	  
	chk_url = '/people?PEOPLE_FUNC=CHECK-GBM';
	xmlhttpgbm.open("GET",chk_url,true);
	xmlhttpgbm.send();
	
	 xmlhttpgbm.onreadystatechange=function()
	  {
	  if (xmlhttpgbm.readyState==4 && xmlhttpgbm.status==200)
		{
		var currVal = xmlhttpgbm.responseText;
			if (currVal != "") {
				var msgText = "<input type='hidden' value=\"'/guestbook?GB_FUNC=GB_OWNER', 500, 300, 'right', 'top', {title: 'Guestbook', icon: '/img/jswm-web.png'}\" size='60' id='gbook' /><a href='#page' onclick=\"eval('windowManager.openURI(' + $('gbook').value + ');');\"><img src='/img/newmessage.gif' height='50' width='100'></img><br></a>" + currVal;
				
				alertify.set({ delay: 15000 });
				alertify.success(msgText); 
				speakMessage(currVal);
				
				var aSound = document.createElement('audio');
				var root = location.protocol + '//' + location.host;
				soundManager.createSound({
					id: 'mySoundNMESD',
					volume: 75,
					url: root + "/audio/newmsg.ogg"
				});
				playSoundEvenDisabled('mySoundNMESD');
				
				var kmsg = "<img src='/img/sysinf.gif' width='20' height='20' align='middle'></img>New Msg";
				document.getElementById("ping-res").innerHTML = kmsg;
				titleBlink("New Msg",currVal);
				return;
			}
		return;
		}
	 }
	 return;
};

function chkSYS1() {
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttpeq=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttpeq=new ActiveXObject('MSXML2.XMLHTTP.3.0');
	  }
	  
	chk_url = '/people?PEOPLE_FUNC=CHECK-SYS1';
	xmlhttpeq.open("GET",chk_url,true);
	xmlhttpeq.send();
	
	 xmlhttpeq.onreadystatechange=function()
	  {
	  if (xmlhttpeq.readyState==4 && xmlhttpeq.status==200)
		{
		var currVal = xmlhttpeq.responseText;
			if (currVal != "") {				
				alertify.set({ delay: 15000 });
				alertify.error(currVal); 
				
				speakMessage(currVal);
				
				var aSound = document.createElement('audio');
				var root = location.protocol + '//' + location.host;
				soundManager.createSound({
					id: 'mySoundEQ',
					volume: 75,
					url: root + "/audio/WarningSiren.ogg"
				});
				//playSoundEvenDisabled('mySoundEQ');
				playSound('mySoundEQ');
				document.getElementById("ping-res").innerHTML = "<img src='/img/sysinf.gif' width='20' height='20' align='middle'></img>Alert";
				titleBlink("Alert",currVal);
				return;
			}
		return;
		}
	 }
	 return;
};

function chkSYS2() {
	
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttact1=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttact1=new ActiveXObject('MSXML2.XMLHTTP.3.0');
	  }
	  
	chk_url = '/people?PEOPLE_FUNC=CHECK-SYS2';
	xmlhttact1.open("GET",chk_url,true);
	xmlhttact1.send();
	
	 xmlhttact1.onreadystatechange=function()
	  {
	  if (xmlhttact1.readyState==4 && xmlhttact1.status==200)
		{
		var currVal = xmlhttact1.responseText;
			if (currVal != "") {				
				alertify.set({ delay: 15000 });
				
				var aSound = document.createElement('audio');
				var root = location.protocol + '//' + location.host;
				soundManager.createSound({
					id: 'mySoundWD',
					volume: 60,
					url: root + "/audio/sonar.ogg"
				});
				playSound('mySoundWD');
				document.getElementById("ping-res").innerHTML = "<img src='" + currVal + "' width='30' height='20' align='middle'></img>Site Act";
				titleBlink("Site Act",currVal);
				
				return;
			}
		return;
		}
	 }
	 return;
};
 
function chkSYS3() {
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttact1=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttact1=new ActiveXObject('MSXML2.XMLHTTP.3.0');
	  }
	  
	chk_url = '/people?PEOPLE_FUNC=CHECK-SYS3';
	xmlhttact1.open("GET",chk_url,true);
	xmlhttact1.send();
	 xmlhttact1.onreadystatechange=function()
	  {
	  if (xmlhttact1.readyState==4 && xmlhttact1.status==200)
		{
		var currVal = xmlhttact1.responseText;
			if (currVal != "") {				
				alertify.set({ delay: 15000 });
				
				var aSound = document.createElement('audio');
				var root = location.protocol + '//' + location.host;
				soundManager.createSound({
					id: 'mySoundBB',
					volume: 50,
					url: root + "/audio/water-drop.ogg"
				});
				playSound('mySoundBB');
				document.getElementById("ping-res").innerHTML = "<img src='" + currVal + "' width='30' height='20' align='middle'></img>External Act";
				titleBlink("External Act",currVal);
				
				return;
			}
		return;
		}
	 }
	 return;
};
 
function chkBM() {
	
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttbm=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttbm=new ActiveXObject('MSXML2.XMLHTTP.3.0');
	  }
	  
	chk_url = '/people?PEOPLE_FUNC=CHECK-BM';
	xmlhttbm.open("GET",chk_url,true);
	xmlhttbm.send();

	 xmlhttbm.onreadystatechange=function()
	  {
	  if (xmlhttbm.readyState==4 && xmlhttbm.status==200)
		{
		var currVal = xmlhttbm.responseText;
			if (currVal != "") {				
				alertify.set({ delay: 15000 });
				alertify.error(currVal); 
				var aSound = document.createElement('audio');
				var root = location.protocol + '//' + location.host;
				soundManager.createSound({
					id: 'mySoundBB',
					volume: 50,
					url: root + "/audio/beepbeep.ogg"
				});
				
				var kmsg = "<img src='/img/sysinf.gif' width='20' height='20' align='middle'></img>Broadcast Msg";
				document.getElementById("ping-res").innerHTML = kmsg;
				titleBlink("Broadcast Msg",currVal);
				return;
			}
		return;
		}
	 }
	 return;
};

function chkKN() {
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttkn=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttkn=new ActiveXObject('MSXML2.XMLHTTP.3.0');
	  }
	var UID = document.getElementById("aUser").value;
	chk_url = '/people?PEOPLE_FUNC=CHECK-KN&UID=' + UID;
	xmlhttkn.open("GET",chk_url,true);
	xmlhttkn.send();
	 xmlhttkn.onreadystatechange=function()
	  {
	  if (xmlhttkn.readyState==4 && xmlhttkn.status==200)
		{
		var currVal = xmlhttkn.responseText;
			if (currVal != "") {				
				alertify.set({ delay: 15000 });
				alertify.error(currVal); 
				
				var aSound = document.createElement('audio');
				var root = location.protocol + '//' + location.host;
				soundManager.createSound({
					id: 'mySoundKN2',
					volume: 50,
					url: root + "/audio/ahem_x.ogg"
				});
				playSoundEvenDisabled('mySoundKN2');
				var kmsg = "<img src='/img/sysinf.gif' width='20' height='20' align='middle'></img>Knock! Knock!";
				document.getElementById("ping-res").innerHTML = kmsg;
				titleBlink("Knock! Knock!",currVal);
				return;
			}
		return;
		}
	 }
	 return;
};
 
function chkMOTD() {
	
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttmo=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttmo=new ActiveXObject('MSXML2.XMLHTTP.3.0');
	  }
	  
	var UID = document.getElementById("aUser").value;
	chk_url = '/people?PEOPLE_FUNC=CHECK-MOTD&UID=' + UID;
	xmlhttmo.open("GET",chk_url,true);
	xmlhttmo.send();

	 xmlhttmo.onreadystatechange=function()
	  {
	  if (xmlhttmo.readyState==4 && xmlhttmo.status==200)
		{
		var currVal = xmlhttmo.responseText;
			if (currVal != "") {				
				alertify.set({ delay: 15000 });
				alertify.error(currVal); 
				speakMessage(currVal);
				document.getElementById("ping-res").innerHTML = "<img src='/img/motd.png' width='20' height='20' align='middle'></img>MOTD";
				titleBlink("MOTD", currVal);
				return;
			}
		return;
		}
	 }
	 return;
};

function chkToken() {
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  cxhr=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  cxhr=new ActiveXObject('MSXML2.XMLHTTP.3.0');
	  }
	cxhr.open("GET","/create-channel"); 
	cxhr.send();                 
	cxhr.onreadystatechange = function(){
	  if (cxhr.readyState==4 && cxhr.status==200)
		{   
			currToken = JSON.parse(cxhr.responseText);
			if (tok.value != currToken) {
				var currVal = "Channel token expired!";
				alertify.set({ delay: 60000 });
				alertify.error(currVal); 
				speakMessage(currVal);
				return;
			}
		}
	}
	return;
};

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var day = days[ date.getDay() ];
  return day + " " + (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
}

function formatDate2(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}


function titleBlink(msg,dtls) {
	var thisTitle = msg + '@' + "UWM" + '@' + window.location.host;
	blinkTitleStop();
	blinkTitle(msg,dtls,500);
	return;
}

function playSoundEvenDisabled(sid) {
	soundManager.play(sid);
	return;
}
