//--start channel codes
var aUser = document.getElementById("aUser");
var tok = document.getElementById("tok");
var da = document.getElementById("dispAds");
var ss = document.getElementById("soundStat");
var rm = document.getElementById("ranMusic");
var uwms = document.getElementById("uwms");
var FL_CONNECTED_OK = false;
var FL_CONTENT_OK = false;
var CTR_RAND_CON = 0;
var root = location.protocol + '//' + location.host;
var currToken = "";

var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;
    // Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

window.onfocus = function () { 
  isActive = true; 
}; 

window.onblur = function () { 
  isActive = false; 
}; 

//clear ls
var d = document.getElementById("desktop");
localStorage[root+d.value] = "<h1>Desktop Links</h1><ul>";

channelConnect();

function channelConnect() {
		alertify.success("Connecting to channel...");
		resizeFunc();
		soundNow();
};

function soundNow() {
	
	var aSound = document.createElement('audio');

	if (isEdge == true || isIE == true || isSafari == true) {
		soundManager.createSound({
			id: 'mySoundSU',
			volume: 80,
			url: root + "/audio/startup.mp3"
		});
		playSound('mySoundSU');	
		return;
	}
	soundManager.createSound({
		id: 'mySoundSU',
		volume: 80,
		url: root + "/audio/startup.ogg"
	});
	playSound('mySoundSU');
	
};

function soundStart() {
	
	var aSound = document.createElement('audio');

	if (isEdge == true || isIE == true || isSafari == true) {
		soundManager.createSound({
			id: 'mySoundS',
			volume: 80,
			url: root + "/audio/startup.mp3"
		});
		playSound('mySoundS');
		return;
	}
	
	soundManager.createSound({
		id: 'mySoundS',
		volume: 80,
		url: root + "/audio/startup.ogg"
	});
	playSound('mySoundS');
	
};

function onOpen() {
	soundStart();
	alertify.success("Channel opened...");

	setInterval(function(){checkMessagesLoop()}, 300000);
		
};

function checkMessagesLoop(){

	if (da.value == "true") {
		dispAds();
	}

    if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  cxhr2=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  cxhr2=new ActiveXObject('MSXML2.XMLHTTP.3.0');
	  } 
	cxhr2.open("GET","/message-channel?CHAN_FUNC=testChannel&UID=" + aUser.value + '&message=test' + '&FROM=', true); 
	cxhr2.send();
	
	 cxhr2.onreadystatechange=function()
	  {
	  if (cxhr2.readyState==4 && cxhr2.status==200)
		{
		var currVal = cxhr2.responseText;
			if (currVal != tok.value) {
				alertify.set({ delay: 5000 });
				alertify.error("Channel expired...", "", 0);
				
				//update token
				document.getElementById("tok").value = currVal;
				
				if (isEdge == true || isIE == true || isSafari == true) {
					soundManager.createSound({
						id: 'alert',
						volume: 75,
						url: root + "/audio/error.mp3"
					});
					playSound('alert');
					return;
				}
				
				soundManager.createSound({
					id: 'alert',
					volume: 75,
					url: root + "/audio/error.ogg"
				});
				playSound('alert');
				return
			}
		return
		}
	 }
	return
		
};

function reConnect() {

	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  cxhr=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  cxhr=new ActiveXObject('MSXML2.XMLHTTP.3.0');
	  }
	cxhr.open("GET","/stream?STR_FUNC=DEL_CHAN", true); 
	cxhr.send(); 
	channelConnect();
	
	return;
};

function dispAds() {
	if (CTR_RAND_CON <= 5000) {
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject('MSXML2.XMLHTTP.3.0');
		  }

		alertify.set({ delay: 5000 });

		var ads_url = "";
		if (FL_CONTENT_OK == false) {
			ads_url = '/rcg?m=sing&q=' + "desktop0" + '&n=' + 1;
			FL_CONTENT_OK = true;
		} else {
			ads_url = '/rag?f=slides&d=' + "desktop0" + '&n=' + 1;
			FL_CONTENT_OK = false;
		}
		if (CTR_RAND_CON == 4) {
			ads_url = '/people?PEOPLE_FUNC=QUICK-VIEW-ONLINE&o=tiles';
			FL_CONTENT_OK = true;			
		}
		xmlhttp.open("GET",ads_url,true);
		xmlhttp.send();
		 xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
			var currVal = xmlhttp.responseText;
				if (currVal != "") {
					alertify.success(currVal);
					CTR_RAND_CON = CTR_RAND_CON + 1; 
					return;
				}
			return;
			}
		 }
		 return;
	 }
};

//function onMessage(msg) {
function procMessage(obj) {
	var r = document.getElementById("ringtone");
	var res = obj.message;
	var n = res.indexOf("notify-icon.png");
	var sapi = res.indexOf("View Search Item");
	var sapi2 = res.indexOf("icon-plus.png");
	var sapi3 = res.indexOf("Search.png");
	var sapi4 = res.indexOf("Youtube.png");
	var a = res.indexOf("alert-icon.png");
	var d = res.indexOf("danger-cat.png");
	var m = res.indexOf("newmessage.gif");
	var scr = res.indexOf("scraper.png");
	var k = res.indexOf("knock, knock!!!");
	var u = res.indexOf("*ULAPPH_UP ");
	var pl = res.indexOf("*ULAPPH_PAYPAL ");
	var x = res.indexOf("ULAPPH-CHAT@888@");
	var p = res.indexOf("ULAPPH-PRESENTER@888@");
	var c = res.indexOf("has joined ULAPPH Chat");
	var e1 = res.indexOf("error");
	var e2 = res.indexOf("ERROR");
	var sysUpd = res.indexOf("ULAPPH-SYS-UPD@888@");
	var e = document.getElementById("channel-area");
	var str = res; 
	var resp = str.split(":");
	if (sysUpd > 0) {
		var cmdata = str.split("@888@");
		switch (cmdata[2]) {
			case "SYS_RC_PLAY_MUSIC":
                                alertifyThis("Playing music...");
                                var mid = cmdata[3];
                                playMusic(mid);
                                break;
			
			case "SYS_OPEN_WINDOW":
				if (cmdata[3] == "" || cmdata[3] == undefined) {
					var thisLink = root + "/tools?FUNC=WIDGET&t=MiniBrowserGet";
					openWindow(thisLink, cmdata[2]);	
				} else {
					//main uwm
					var tgt = cmdata[3];
					var hv = tgt.indexOf("http://");
					var hs = tgt.indexOf("https://");
					if (hv < 0 && hs < 0) {
						tgt = root + tgt;
					}
					openWindow(tgt, "SYS_OPEN_WINDOW");
				}
				break;
				
			//D0066
			case "SYS_STRUWM_MIRROR":
				console.log("SYS_STRUWM_MIRROR");
				var src = cmdata[3];
				//var cap = cmdata[4];
				console.log(src);
				if (ValidURL(bgImgUrl) == true) {
                                	document.getElementById('page').style.backgroundImage = "url(" + src + ")";
					var rn = document.getElementById("ranid")
					rn.value = "pause";
                        	}
				break;
			//D0071
			case "SYS_STRUWM_ALARM":
			console.log("SYS_STRUWM_ALARM");
			//data := fmt.Sprintf("@888@ULAPPH-SYS-UPD@888@SYS_STRUWM_ALARM@888@%v@888@%v", CAPTION, MESSAGE
				var caption = cmdata[3];
				var message = cmdata[4];
				if (document.getElementById("soundStat").value != "off") {
					alertify.set({ delay: 300000 });
					//alertify.error(caption);
					alertify.error(message);
                    //say it
					speakMessage(caption);
				}

                                var aSound = document.createElement('audio');
                                if (isEdge == true || isIE == true || isSafari == true) {
                                        soundManager.createSound({
                                                id: 'mySoundCctv',
                                                volume: 75,
                                                url: root + "/audio/industrialAlarm.mp3"
                                        });
                                } else {
                                        soundManager.createSound({
                                                id: 'mySoundCctv',
                                                volume: 75,
                                                url: root + "/audio/industrialAlarm.ogg"
                                        });
                                }

                                playSound('mySoundCctv');
                                document.getElementById("ping-res").innerHTML = "<img src='/img/sysinf.gif' width='20' height='20' align='middle'></img>Alert";
                                //titleBlink("Alert",caption);
                                return;

			case "SYS_GOOGLE_SEARCH":
				var kw = cmdata[3];
				var tgt = 'https://www.google.com.ph/search?q=' + kw + '&source=lnt&tbs=qdr:d&sa=X&&biw=1366&bih=700';
				openWindowNow(tgt, 'SEARCH: '+kw);
				var tgi = 'https://www.google.com.ph/search?q=' + kw + '&rlz=1C1GGRV_enPH754PH754&source=lnms&tbm=isch&sa=X&biw=1280&bih=610';
				openWindowNow(tgi, 'SEARCH: '+kw);
				break;
				
			case "SYS_UPDATE_TLM":
				var tlm = document.getElementById("menu");
				tlm.innerHTML = cmdata[3];
				alertify.error("Top List Menu has been updated!");
				break;
				
			case "SYS_UPDATE_SND":
				switch (cmdata[3]) {
					case "off":
						soundManager.stopAll();
						alertify.error("Sound has been disabled.");
						var e = document.getElementById("soundFlag");
						e.src = "/img/sound-off.png";
						document.getElementById("soundStat").value = "off";
						break;
					case "on":
						testSound();
						alertify.error("Sound has been enabled.");
						var e = document.getElementById("soundFlag");
						e.src = "/img/sound-on.png";
						document.getElementById("soundStat").value = "on";
						break;

				}
				alertify.error("System sound preference updated to " + cmdata[3], "", 0);
				break;

			default:
				var OL = res.split("@888@");
				var tgt = OL[3];
				var ttl = OL[2];
				var hv = tgt.indexOf("http://");
				var hs = tgt.indexOf("https://");
				if (hv < 0 && hs < 0) {
					tgt = root + tgt;
				}
				var res = tgt.replace("http://", "https://");
				openWindow(res, ttl);
		}
		return;
	}
	
	if (scr >0) {
		alertify.set({ delay: 300000 });
		//alertify.log(res, "", 0);
		alertify.log(res);
		
		var aSound = document.createElement('audio');
		if (isEdge == true || isIE == true || isSafari == true) {
			soundManager.createSound({
				id: 'waterscr',
				volume: 75,
				url: root + "/audio/water-drop.mp3"
			});
			playSound('water');		
		} else {	
			soundManager.createSound({
				id: 'waterscr',
				volume: 75,
				url: root + "/audio/water-drop.ogg"
			});
			playSound('waterscr');
		}
		return;
	}
	
	if (p > 0) {
		return;
	}
	
	if (sapi > 0 || sapi2 > 0 || sapi3 > 0 || sapi4 > 0) {
		titleBlink("Autosearch!",res);
		document.getElementById("ping-res").innerHTML = "<img src='/img/notify-icon.png' width='20' height='20' align='middle'></img>New Search";
		return;
	}
		
	if (resp[0] == "DELETED") {
		alertify.log("SESSION DELETED...<br>", "", 0);
		setTimeout(function(){location.reload(true);},5000);
		return;
	}
		
	if (res == "LOGOUT.") {
		alertifyThis(res);
		window.location.assign("/logout?LFUNC=LOGOUT");
		alertify.log("Logged out...", "", 0);
		return;
	}
	
	if ((res == "CHANNEL CONNECTED.") && (FL_CONNECTED_OK == false)) {
		innerHTML = "<a href='/infodb?DB_FUNC=ULAPPH-NOTIFICATIONS-LOG&SID=ULAPPH-NOTIFICATIONS-LOG' target='notifications'><img src='/img/channel-connected.png' width=60 height=60></img></a>CHANNEL CONNECTED.";		
		FL_CONNECTED_OK = true;
		alertifyThis(innerHTML);
		return;
	}
	if (u >= 0) {
		alertify.error(res, "", 0);
		var aSound = document.createElement('audio');
		if (r.value != "") {
			
			if (isEdge == true || isIE == true || isSafari == true) {
				soundManager.createSound({
					id: 'mySound7',
					volume: 50,
					url: r.value
				});
				playSound('mySound7');

			} else {
				soundManager.createSound({
					id: 'mySound7',
					volume: 50,
					url: r.value
				});
				playSound('mySound7');
			}
		}
		newNoteMU(res);
		return;
	}
	if (pl >= 0) {
		alertify.error(res, "", 0);
		var aSound = document.createElement('audio');
		if (r.value != "") {
			
			if (isEdge == true || isIE == true || isSafari == true) {
				soundManager.createSound({
					id: 'mySoundPL',
					volume: 50,
					url: root + "/audio/jamesbrown.mp3"
				});
				playSound('mySoundPL');

			} else {
				soundManager.createSound({
					id: 'mySoundPL',
					volume: 50,
					url: root + "/audio/jamesbrown.ogg"
				});
				playSound('mySoundPL');
			}
		}
		newNoteMU(res);
		return;
	}
	if (k > 0) {
		alertifyThis(res);
		var aSound = document.createElement('audio');
		if (r.value != "") {
			
			if (isEdge == true || isIE == true || isSafari == true) {
				soundManager.createSound({
					id: 'mySound6',
					volume: 90,
					url: root + "/audio/ahem_x.mp3"
				});
				playSound('mySound6');


			} else {
				soundManager.createSound({
					id: 'mySound6',
					volume: 90,
					url: root + "/audio/ahem_x.ogg"
				});
				playSound('mySound6');
			}
		}
		return;
	}
	if (e1 > 0 || e2 > 0) {
		alertifyThis(res);
		var aSound = document.createElement('audio');
		if (r.value != "") {
			
			if (isEdge == true || isIE == true || isSafari == true) {
				soundManager.createSound({
					id: 'mySoundE',
					volume: 50,
					url: root + "/audio/error.mp3"
				});
				playSound('mySoundE');


			} else {
				
				soundManager.createSound({
					id: 'mySoundE',
					volume: 50,
					url: root + "/audio/error.ogg"
				});
				playSound('mySoundE');
			}
		}
		return;
	}
	if (m > 0) {
		alertifyThis(res);
		var aSound = document.createElement('audio');
		if (r.value != "") {
			if (isEdge == true || isIE == true || isSafari == true) {
				soundManager.createSound({
					id: 'mySound7',
					volume: 50,
					url: r.value
				});
				playSound('mySound7');
			} else {
				soundManager.createSound({
					id: 'mySound7',
					volume: 50,
					url: r.value
				});
				playSound('mySound7');
			}
		}
		return;
	}
	if (x > 0) {
		return;
	}
	if (c > 0) {
		alertifyThis(res);
		
		if (isEdge == true || isIE == true || isSafari == true) {
			soundManager.createSound({
				id: 'door_open',
				volume: 50,
				url: root + "/audio/door-open.mp3"
			});
			playSound('door_open');
		} else {	
			soundManager.createSound({
				id: 'door_open',
				volume: 50,
				url: root + "/audio/door-open.ogg"
			});
			playSound('door_open');
		}
		return;
	}
	if (a > 0) {
		//alertifyThis(res);
		alertify.set({ delay: 300000 });
		alertify.error(res);
		
		if (isEdge == true || isIE == true || isSafari == true) {
			soundManager.createSound({
				id: 'alert',
				volume: 50,
				url: root + "/audio/emergency030.mp3"
			});
			playSound('alert');
		} else {	
			soundManager.createSound({
				id: 'alert',
				volume: 50,
				url: root + "/audio/emergency030.ogg"
			});
			playSound('alert');
		}
	}
	if (res != "CHANNEL CONNECTED." && res != "CHANNEL ERROR." && res != "CHANNEL DISCONNECTED." && res != undefined) {
		alertifyThis(res);
		
		if (n == -1 && d == -1) {
		
			var aSound = document.createElement('audio');
			if (isEdge == true || isIE == true || isSafari == true) {
				soundManager.createSound({
					id: 'mySound2',
					volume: 50,
					url: root + "/audio/elect-chime.mp3"
				});
				playSound('mySound2');
			} else {
				soundManager.createSound({
					id: 'mySound2',
					volume: 50,
					url: root + "/audio/elect-chime.ogg"
				});
				playSound('mySound2');
			}

		} else {
		
			if (d == -1) { 
				var aSound = document.createElement('audio');

				if (isEdge == true || isIE == true || isSafari == true) {
					soundManager.createSound({
						id: 'mySound3',
						volume: 50,
						url: root + "/audio/R2D2e.mp3"
					});
					playSound('mySound3');
				} else {	
					soundManager.createSound({
						id: 'mySound3',
						volume: 50,
						url: root + "/audio/R2D2e.ogg"
					});
					playSound('mySound3');
				}
			
			} else {
			
				var aSound = document.createElement('audio');

				if (isEdge == true || isIE == true || isSafari == true) {
					soundManager.createSound({
						id: 'mySound4',
						volume: 50,
						url: root + "/audio/WarningSiren.mp3"
					});

					playSound('mySound4');			
				} else {	
					soundManager.createSound({
						id: 'mySound4',
						volume: 50,
						url: root + "/audio/WarningSiren.ogg"
					});

					playSound('mySound4');			
				}
			}
		
		}
		return;
	}
	return;
};

function onError(err) {
	innerHTML = "<a href='/infodb?DB_FUNC=ULAPPH-NOTIFICATIONS-LOG&SID=ULAPPH-NOTIFICATIONS-LOG' target='notifications'><img src='/img/channel-error.png' width=60 height=60></img></a></a>CHANNEL ERROR.";
	alertifyThis(innerHTML);
};

function onClose() {
	innerHTML = "<a href='/infodb?DB_FUNC=ULAPPH-NOTIFICATIONS-LOG&SID=ULAPPH-NOTIFICATIONS-LOG' target='notifications'><img src='/img/channel-disconnected.png' width=60 height=60></img></a>CHANNEL DISCONNECTED.";
	alertifyThis(innerHTML);
};

function playMusic(mid) {
        if (parseInt(mid) > 0) {
                        customMusic = true;
                        alertify.success("Playing music...");
                        var url = "/media?FUNC_CODE=PLAY&MEDIA_ID=" + mid;
                        console.log("url: " + url);
			var SID = "TDSMEDIA-"+mid;
                        playSoundLoop(10, SID, url)
                        return;
        }
        return;
}

function playSoundLoop(sln, sID, sURL) {

        if (isActive == false) {
                return;
        }
	soundManager.stopAll();
        sURL = sURL.replace("http:", "https:");

        var aSound = document.createElement('audio');
        var s = soundManager.createSound({
          id: sID,
          volume: 90,
          url: sURL
        });

        s.play({
          loops: sln
        });

        return;
}

function alertifyThis(message) {
	var ss = document.getElementById("soundStat");
	if (ss.value != "on") {
		return;
	}
	alertify.set({ delay: 10000 });
	alertify.success(message);
	return;
};

function knock(uid) {
	var kurl = location.protocol + '//' + location.host + '/guestbook?GB_FUNC=KNOCK&UID=' + uid;
	
    if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  cxhr2=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  cxhr2=new ActiveXObject('MSXML2.XMLHTTP.3.0');
	  } 
	cxhr2.open("GET",kurl, true); 
	cxhr2.send();
	alertify.error("Knock knock has been sent!");
};

function playSound(sid) {
	var ss = document.getElementById("soundStat");
	if (ss.value == "on") {
		soundManager.play(sid);
	}
	return;
}

function newJSWMWindow() {
	var tgt = document.getElementById("newJSWM").value;
	var us = tgt.toUpperCase();
	var sb = us.indexOf("SETBG ");
	var su = us.indexOf("SETUWM ");
	//D0066
	var sa = us.indexOf("SETBOT ");
	var st = us.indexOf("SETTOPIC ");
	var st2 = us.indexOf("SETTOPICS ");
	var st3 = us.indexOf("SETNAME ");
	var st4 = us.indexOf("CLEARLS ");
	
	//setbg
	if (sb >= 0) {
		//set media as current wallpaper
		var SPS = tgt.split(" ");
		if ((SPS[0] == "SETBG" || SPS[0] == "setbg") && SPS[1] != "") {
			setbg(SPS[1]);
			pauseWp();
			return;
		} else {
			alertify.success("ERROR: Example format: setbg URL"); 
			return;
		}
		return;
	}
	
	//setuwm
	if (su >= 0) {
		//set media as uwm source
		if (uwms.value == "") {
			alertify.success("ERROR: Operation not allowed."); 
			return;			
		}
		var SPS = us.split(" ");
		if (SPS[0] == "SETUWM" && SPS[1] != "" && SPS[1] != "SETUWM") {
			setuwm(SPS[1]);
			return;
		} else {
			alertify.error("ERROR: Example format: setuwm TDSMEDIA-1"); 
			return;
		}
		return;
	}
	
	//settopic
	if (st >= 0 || st2 >= 0) {
		//set media as uwm source
		if (uwms.value == "") {
			alertify.success("ERROR: Operation not allowed."); 
			return;			
		}
		var SPS = us.split(" ");
		if ((SPS[0] == "SETTOPIC" || SPS[0] == "SETTOPICS") && SPS[1] != "") {
			settopic(SPS[1]);
			return;
		} else {
			alertify.error("ERROR: Example format: settopic TDSMEDIA-1"); 
			return;
		}
		return;
	}
	//D0066
	//setbot
	if (sa >= 0) {
		//set media as bot source
		if (uwms.value == "") {
			alertify.success("ERROR: Operation not allowed."); 
			return;			
		}
		var SPS = us.split(" ");
		if (SPS[0] == "SETBOT" && SPS[1] != "") {
			setbot(SPS[1]);
			return;
		} else {
			alertify.error("ERROR: Example format: setbot TDSMEDIA-1"); 
			return;
		}
		return;
	}
	
	//setname
	if (st3 >= 0) {
		//set name of this desktop (title)
		if (uwms.value == "") {
			alertify.success("ERROR: Operation not allowed."); 
			return;			
		}
		var SPS = us.split(" ");
		if ((SPS[0] == "SETNAME") && SPS[1] != "") {
			setname(SPS[1]);
			return;
		} else {
			alertify.success("ERROR: Example format: setname Put_Name_Here"); 
			return;
		}
		return;
	}
	
	//clear local copy of sid
	if (st4 >= 0) {
		var SPS = us.split(" ");
		if ((SPS[0] == "CLEARLS") && SPS[1] != "") {
			clearls(SPS[1]);
			return;
		} else {
			alertify.success("ERROR: Example format: clearls Put_SID_Here"); 
			return;
		}
		return;
	}
	
	var SPL = us.split("-");
	if (SPL[0] == "TDSMEDIA" || SPL[0] == "TDSSLIDE" || SPL[0] == "TDSARTL" || SPL[0] == "NEWTEXT" || SPL[0] == "NEWSLIDE" || SPL[0] == "NEWARTICLE") {
		switch (SPL[0]) {
			case "TDSMEDIA":
				var tgt = root + "/media?FUNC_CODE=VIEW&MEDIA_ID=" + SPL[1];
				break;
				
			case "TDSSLIDE":
				var tgt = root + "/slides?TYPE=SLIDE&MODE=NORMAL&PARM=LOOP&SECS=8&DOC_ID=" + SPL[1] + "&SID=TDSSLIDE-" + SPL[1];
				break;
				
			case "TDSARTL":
				var tgt = root + "/articles?TYPE=ARTICLE&DOC_ID=" + SPL[1] + "&SID=TDSARTL-" + SPL[1];
				break;	

			case "NEWTEXT":
				var tgt = root + "/editor?MEDIA_ID=0&SID=NEWTEXT";
				break;	

			case "NEWSLIDE":
				var tgt = root + "/editor?DOC_ID=0&SID=NEWSLIDE";
				break;	

			case "NEWARTICLE":
				var tgt = root + "/editor?DOC_ID=0&SID=NEWARTICLE";
				break;						
		}
	} else {
		
		if (tgt == "http://" || tgt == "https://" || tgt == "") {
			tgt = "https://www.google.com";
		} else {
			if (isDataURL(tgt) == false) {
				tgt = "https://www.google.com.ph/webhp#q=" + tgt;
			} else {
				tgt = tgt.replace("http://", "https://");
			}
		}
	}
	
	var jswmstr = "'" + tgt + "', 500, 300, 'left', 'top', {title: '" + tgt + "', icon: '/img/jswm-web.png'}";
	eval('windowManager.openURI(' + jswmstr + ');');
	
	var aSound = document.createElement('audio');

	if (isEdge == true || isIE == true || isSafari == true) {
		soundManager.createSound({
			id: 'water',
			volume: 75,
			url: root + "/audio/water-drop.mp3"
		});
		playSound('water');		
	} else {		
		soundManager.createSound({
			id: 'water',
			volume: 75,
			url: root + "/audio/water-drop.ogg"
		});
		playSound('water');
	}
	return;
	
}

//Opens window w/o checking
function openWindowNow(tgt, ttl) {

	var jswmstr = "'" + tgt + "', 500, 300, 'left', 'top', {title: '" + ttl + "', icon: '/img/jswm-web.png'}";
	//console.log(jswmstr);
	eval('windowManager.openURI(' + jswmstr + ');');
	
	var aSound = document.createElement('audio');
	if (isEdge == true || isIE == true || isSafari == true) {
		soundManager.createSound({
			id: 'water',
			volume: 75,
			url: root + "/audio/water-drop.mp3"
		});
		playSound('water');		
	} else {	
		soundManager.createSound({
			id: 'water',
			volume: 75,
			url: root + "/audio/water-drop.ogg"
		});
		playSound('water');
	}
	return;
}

function openWindow(tgt, ttl) {
	if (ttl == "SYS_RC_YT_SEARCH" || ttl == "SYS_RC_YT_SEARCH_ID" || ttl == "SYS_RC_YT_SEARCH_ID2" || ttl == "SYS_STRUWM_CAPTURE") {
		return;
	}

	var us = tgt.toUpperCase();
	var SPL = us.split("-");
	if (SPL[0] == "TDSMEDIA" || SPL[0] == "TDSSLIDE" || SPL[0] == "TDSARTL" || SPL[0] == "NEWTEXT" || SPL[0] == "NEWSLIDE" || SPL[0] == "NEWARTICLE") {
		switch (SPL[0]) {
			case "TDSMEDIA":
				var tgt = root + "/media?FUNC_CODE=VIEW&MEDIA_ID=" + SPL[1];
				break;
				
			case "TDSSLIDE":
				var tgt = root + "/slides?TYPE=SLIDE&MODE=NORMAL&PARM=LOOP&SECS=8&DOC_ID=" + SPL[1] + "&SID=TDSSLIDE-" + SPL[1];
				break;
				
			case "TDSARTL":
				var tgt = root + "/articles?TYPE=ARTICLE&DOC_ID=" + SPL[1] + "&SID=TDSARTL-" + SPL[1];
				break;	

			case "NEWTEXT":
				var tgt = root + "/editor?MEDIA_ID=0&SID=NEWTEXT";
				break;	

			case "NEWSLIDE":
				var tgt = root + "/editor?DOC_ID=0&SID=NEWSLIDE";
				break;	

			case "NEWARTICLE":
				var tgt = root + "/editor?DOC_ID=0&SID=NEWARTICLE";
				break;					
		}
	} else {
		
		if (tgt == "http://" || tgt == "https://" || tgt == "") {
			tgt = "https://www.google.com";
		} else {
			if (isDataURL(tgt) == false) {
				tgt = "https://www.google.com.ph/webhp#q=" + tgt;
			} else {
				var hv = tgt.indexOf("http://");
				var hs = tgt.indexOf("https://");
				if (hv < 0 && hs < 0) {
					tgt = "http://" + tgt;
				}
			}
		}
	}
	
	var jswmstr = "'" + tgt + "', 500, 300, 'left', 'top', {title: '" + ttl + "', icon: '/img/jswm-web.png'}";
	//console.log(jswmstr);
	eval('windowManager.openURI(' + jswmstr + ');');
	
	var aSound = document.createElement('audio');
	if (isEdge == true || isIE == true || isSafari == true) {
		soundManager.createSound({
			id: 'water',
			volume: 75,
			url: root + "/audio/water-drop.mp3"
		});
		playSound('water');		
	} else {	
		soundManager.createSound({
			id: 'water',
			volume: 75,
			url: root + "/audio/water-drop.ogg"
		});
		playSound('water');
	}
	return;
}

function isDataURL(s) {
	var myRegExp =/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
	if (!myRegExp.test(s)){
		return false;
	}else{
		return true;
	}
}

function musicOnOff() {
	var e = document.getElementById("musicFlag");
	var res = e.src;
	var musicOn = true;
	var n = res.indexOf("/img/musicon.png");
	if (n > 0) {
		musicOn = false;
	} else {
		musicOn = true;
	}
	
	switch (musicOn) {
		case false:
			soundManager.stopAll();
			alertify.error("Music has been enabled.");
			e.src = "/img/musicoff.png";
			var curMusic = document.getElementById("ranMusic").value;
			getRanMusic(curMusic);
			break;
		case true:
			alertify.error("Music has been turned off.");
			e.src = "/img/musicon.png";
			var curMusic = document.getElementById("ranMusic").value;
			soundManager.stop(curMusic);
			break;

	}
	return;
};

function getRanMusic(curMusic) {
	alertifyThis("Searching music...");
	ads_url = '/media?FUNC_CODE=GET_RAN_MUSIC&CURM=' + curMusic;
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttpm=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttpm=new ActiveXObject('MSXML2.XMLHTTP.3.0');
	  }
	xmlhttpm.open("GET",ads_url,true);
	xmlhttpm.send();
	 xmlhttpm.onreadystatechange=function()
	  {
	  if (xmlhttpm.readyState==4 && xmlhttpm.status==200)
		{
		var currVal = xmlhttpm.responseText;
			if (currVal != "") {
				alertifyThis("Playing music...");
				url="/media?FUNC_CODE=PLAY&MEDIA_ID=" + currVal + "&SID=TDSMEDIA-" + currVal;
				document.getElementById("ranMusic").value = "TDSMEDIA-" + currVal;
				playSoundRandom("TDSMEDIA-" + currVal, url)
				return;
			}
			return;
		}
	 }	
	return;
	
}

function playSoundRandom(sID, sURL) {

	var aSound = document.createElement('audio');
	var s = soundManager.createSound({
	  id: sID,
	  volume: 95,
	  url: sURL
	});

	s.play({
		onfinish: function() {
		  getRanMusic();
		}
    });
	return;
}

function setbg(bgImgUrl) {

	if (ValidURL(bgImgUrl) == true) {
		document.getElementById('page').style.backgroundImage = "url(" + bgImgUrl + ")";
	}
	return;
}

function setuwm(sid) {
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttpset=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttpset=new ActiveXObject('MSXML2.XMLHTTP.3.0');
	  }
	  
	var seturl = '/people?PEOPLE_FUNC=SETUWM&u=' + urlParams["u"] + '&UID=' + aUser.value + '&SID=' + sid;
	xmlhttpset.open("GET",seturl,true);
	xmlhttpset.send();
	 xmlhttpset.onreadystatechange=function()
	  {
	  if (xmlhttpset.readyState==4 && xmlhttpset.status==200)
		{
		var currVal = xmlhttpset.responseText;
			if (currVal != "") {
				alertify.success(currVal); 
				return;
			}
		return;
		}
	 }
	 return;
};
//D0066
function setbot(sid) {
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttpset=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttpset=new ActiveXObject('MSXML2.XMLHTTP.3.0');
	  }
	  
	var seturl = '/people?PEOPLE_FUNC=SETBOT&u=' + urlParams["u"] + '&UID=' + aUser.value + '&SID=' + sid;
	xmlhttpset.open("GET",seturl,true);
	xmlhttpset.send();
	 xmlhttpset.onreadystatechange=function()
	  {
	  if (xmlhttpset.readyState==4 && xmlhttpset.status==200)
		{
		var currVal = xmlhttpset.responseText;
			if (currVal != "") {
				alertify.success(currVal); 
				return;
			}
		return;
		}
	 }
	 return;
};

function settopic(sid) {
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttpset=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttpset=new ActiveXObject('MSXML2.XMLHTTP.3.0');
	  }
	  
	var seturl = '/people?PEOPLE_FUNC=SETTOPICS&u=' + urlParams["u"] + '&UID=' + aUser.value + '&SID=' + sid;
	xmlhttpset.open("GET",seturl,true);
	xmlhttpset.send();
	 xmlhttpset.onreadystatechange=function()
	  {
	  if (xmlhttpset.readyState==4 && xmlhttpset.status==200)
		{
		var currVal = xmlhttpset.responseText;
			if (currVal != "") {
				alertify.success(currVal); 
				return;
			}
		return;
		}
	 }
	 return;
};

function setname(name) {
	document.title = name + '@' + window.location.host;
	alertify.success("Desktop named as "+name); 
	return;
};

//postMessage
// Create IE + others compatible event handler
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

//parent.postMessage receiver
// Listen to message from child window
eventer(messageEvent,function(e) {
	var root = location.protocol + '//' + location.host;
	if ( e.origin !== root ) {
		return;
	}
	//console.log('parent received message!:  ',e.data);
    var str = e.data;
    var n = str.indexOf("ULAPPH-SYS-UPD@888@");
	if (n == 0) {
		//system commands
		var res = str.split("ULAPPH-SYS-UPD@888@");
		if (res.length == 2) {
			var myFunc = res[1];
			switch (myFunc) {
				case "EDIT_WINDOWS_SUBUWM":
					var duser = document.getElementById("aUser").value;
					var rex = duser.split("---");
					if (rex.length == 2) {
						var thisUwm = rex[1];
						var thisLink = root + "/people-edit?EditPeopleFunc=EDIT_WINDOWS_SUBUWM&u=" + thisUwm;
						openWindow(thisLink, myFunc);	
					} else {
						//main uwm
						var thisLink = root + "/people-edit?EditPeopleFunc=EDIT_WINDOWS_MINE&UID=";
						openWindow(thisLink, "EDIT_WINDOWS_MAIN");
					}
					break;
				case "FIND_NEW_ICONS":
					var thisLink = "https://www.google.com.ph/search?q=sample+icon+png&tbm=isch&tbs=isz:i";
					openWindow(thisLink, myFunc);
					break;
				case "LOGOUT_ULAPPH":
					var thisLink = root + "/logout?LFUNC=LOGOUT";
					window.location.assign(thisLink);
					break;
				default:
					//link commands
					var cmdo = e.data;
					//split
					//ULAPPH-SYS-UPD@888@TITLE@888@link
					var OL = cmdo.split("@888@");
					var tgt = OL[2];
					var ttl = OL[1];
					var hv = tgt.indexOf("http://");
					var hs = tgt.indexOf("https://");
					if (hv < 0 && hs < 0) {
						tgt = root + tgt;
					}
					var res = tgt.replace("http://", "https://");
					openWindow(res, ttl);
			}
		}
	} else {
		//link commands
		var tgt = e.data;
		var hv = tgt.indexOf("http://");
		var hs = tgt.indexOf("https://");
		if (hv < 0 && hs < 0) {
			tgt = root + tgt;
		}
		var res = tgt.replace("http://", "https://");
		openWindow(res, e.data);
	}
	
},false);

function drop(evt) {
	evt.stopPropagation();
	evt.preventDefault(); 
	files = evt.dataTransfer.files;
	
	var thisUrl = evt.dataTransfer.getData('text/html');
	console.log("thisUrl: "+thisUrl);
	
	var doc = document.createElement("html");
	doc.innerHTML = thisUrl;
	var isRemoteSlideArticle = false;
	var formData = new FormData();
		
	//links
	var links = doc.getElementsByTagName("a")
	if (links.length > 0) {
		var url = links[0].getAttribute("href");
		var s = url.indexOf(".slide");
		if (s > 0) {
			formData.append('cv', "s");
			console.log('slide...');
			isRemoteSlideArticle = true;
		}
		var a = url.indexOf(".article");
		if (a > 0) {
			formData.append('cv', "a");
			console.log('article...');
			isRemoteSlideArticle = true;
		}
		if (isRemoteSlideArticle == false) {
			openDrop(url);
			return;
		}
		
	} else {
	
		//images
		var imgs = doc.getElementsByTagName("img")
		if (imgs.length > 0) {
			var url = imgs[0].getAttribute("src");
			console.log("url: "+url);
			setbg(url);
			pauseWp();
			return;
		}
	}

	//if item is a file
	if (isRemoteSlideArticle == false) {
		for (var i = 0; i < files.length; i++) {
			formData.append('file', files[i]);
			//default text
			//formData.append('cv', "t");
			var str = files[i].name;
			var s = str.indexOf(".slide");
			if (s > 0) {
				formData.append('cv', "s");
				console.log('slide...');
				//isSlideArticle = true;
			}
			var a = str.indexOf(".article");
			if (a > 0) {
				formData.append('cv', "a");
				console.log('article...');
				//isSlideArticle = true;
			}
			
		}	
	}
	
	// now post a new XHR request
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/editor');
	if (isRemoteSlideArticle == true) {
		formData.append('remote', "Y");
		formData.append('url', links[0].getAttribute("href"));
	}
	formData.append('sid', "");
	formData.append('ct', "v");
	formData.append('EDIT_FUNC', "CRYPTO");
	formData.append('redirect', "Y");
	formData.append('EDIT_MODE', "NEW-CRYPTO");
	xhr.onload = function () {
	  if (xhr.status === 200) {
		console.log('all done: ' + xhr.status);
	  } else {
		console.log('Something went terribly wrong...');
	  }
	};
	xhr.send(formData);
	
	return;
}

function openDrop(url) {
	var w = window.innerWidth;
	var h = window.innerHeight-20;
	var res = url.replace("http://", "https://");
	var jswmstr = "'" + res + "', w, h, 'left', 'top', {title: '" + res + "', icon: '/img/jswm-web.png'}";
	//console.log(jswmstr);
	eval('windowManager.openURI(' + jswmstr + ');');
	return;
}

//resize handler
window.addEventListener("resize", resizeFunc);

//var x = 0;
function resizeFunc() {
    if (localStorage[root+'isScreenSmall-force'] == 'Y') {
	return;
    }
    var txt = "";
    txt += "<p>innerWidth: " + window.innerWidth + "</p>";
    txt += "<p>innerHeight: " + window.innerHeight + "</p>"; 
    txt += "<p>outerWidth: " + window.outerWidth + "</p>";
    txt += "<p>outerHeight: " + window.outerHeight + "</p>";
	var screenSize = window.innerWidth;

	if (window.innerHeight <= 600 || window.innerWidth <= 500) {
		//window is so small, we cant open widgets in uwm
		localStorage[root+'isScreenSmall'] = 'Y';
	} else {
		localStorage[root+'isScreenSmall'] = 'N';
	}

	alertifyThis(txt);

	switch (true) {
		
		case (screenSize < 500):
			document.getElementById("stm-logout").style.display = "none";
			document.getElementById("stm-alldesks").style.display = "none";
			document.getElementById("stm-reload").style.display = "none";	
			document.getElementById("stm-newNote").style.display = "none";
			document.getElementById("stm-www2").style.display = "none";
			document.getElementById("stm-ranMusic").style.display = "none";
			document.getElementById("stm-allrecent").style.display = "none";
			document.getElementById("stm-adminsetup").style.display = "none";
			document.getElementById("stm-ping-res").style.display = "none";
			break;
			
		case (screenSize < 800 && screenSize > 500 ):
			document.getElementById("stm-ranid").style.display = "none";
			document.getElementById("stm-pauseWp").style.display = "none";
			document.getElementById("stm-ping-res").style.display = "none";
			document.getElementById("stm-keyStat").style.display = "none";
			document.getElementById("stm-uwmStat").style.display = "none";
			document.getElementById("stm-winStat").style.display = "none";
			document.getElementById("stm-soundStat").style.display = "none";
			document.getElementById("stm-htbv").style.display = "none";
			document.getElementById("stm-phmini").style.display = "none";
			document.getElementById("stm-mpmini").style.display = "none";
			document.getElementById("stm-ytmini").style.display = "none";
			document.getElementById("stm-vpmini").style.display = "none";
			document.getElementById("stm-htb1").style.display = "none";
			document.getElementById("stm-htb2").style.display = "none";
			document.getElementById("stm-htb3").style.display = "none";
			document.getElementById("stm-htb4").style.display = "none";
			document.getElementById("stm-htb6").style.display = "none";
			document.getElementById("stm-gbook").style.display = "none";
			document.getElementById("stm-Cal").style.display = "none";
			document.getElementById("stm-locstor").style.display = "none";
			document.getElementById("stm-scalc").style.display = "none";
			break;
			
		case (screenSize < 1100 && screenSize > 800):
			document.getElementById("stm-ping-res").style.display = "none";
			document.getElementById("stm-uwmStat").style.display = "none";
			document.getElementById("stm-winStat").style.display = "none";
			document.getElementById("stm-Cal").style.display = "none";
			document.getElementById("stm-locstor").style.display = "none";
			document.getElementById("stm-scalc").style.display = "none";
			break;
			
		//hide/unhide icons
		case (screenSize < 1400 && screenSize > 1100):
			document.getElementById("stm-ping-res").style.display = "none";
			document.getElementById("stm-Cal").style.display = "none";
			document.getElementById("stm-winStat").style.display = "none";
			break;
			
		case (screenSize > 1500):
			document.getElementById("stm-ping-res").style.display = "block";
			 document.getElementById("stm-logout").style.display = "block";
			 document.getElementById("stm-alldesks").style.display = "block";
			 document.getElementById("stm-reload").style.display = "block";
			document.getElementById("stm-ranid").style.display = "block";
			document.getElementById("stm-pauseWp").style.display = "block";
			 document.getElementById("stm-newNote").style.display = "block";
			document.getElementById("stm-ping-res").style.display = "block";
			document.getElementById("stm-constat").style.display = "block";
			document.getElementById("stm-keyStat").style.display = "block";
			document.getElementById("stm-closeall").style.display = "block";
			document.getElementById("stm-uwmStat").style.display = "block";
			document.getElementById("stm-winStat").style.display = "block";
			document.getElementById("stm-uwmArrStat").style.display = "block";
			document.getElementById("stm-soundStat").style.display = "block";
			 document.getElementById("stm-www2").style.display = "block";
			document.getElementById("stm-htbv").style.display = "block";
			document.getElementById("stm-phmini").style.display = "block";
			document.getElementById("stm-ranMusic").style.display = "block";
			document.getElementById("stm-mpmini").style.display = "block";
			document.getElementById("stm-ytmini").style.display = "block";
			document.getElementById("stm-vpmini").style.display = "block";
			 document.getElementById("stm-MiniBrowser").style.display = "block";
			document.getElementById("stm-htb1").style.display = "block";
			document.getElementById("stm-htb2").style.display = "block";
			document.getElementById("stm-htb3").style.display = "block";
			document.getElementById("stm-htb4").style.display = "block";
			 document.getElementById("stm-allrecent").style.display = "block";
			document.getElementById("stm-htb6").style.display = "block";
			document.getElementById("stm-gbook").style.display = "block";
			document.getElementById("stm-Cal").style.display = "block";
			document.getElementById("stm-locstor").style.display = "block";
			document.getElementById("stm-scalc").style.display = "block";
			break;	

		case (screenSize > 1300 && screenSize < 1500):
			document.getElementById("stm-ping-res").style.display = "block";
			 document.getElementById("stm-logout").style.display = "block";
			 document.getElementById("stm-alldesks").style.display = "block";
			 document.getElementById("stm-reload").style.display = "block";
			document.getElementById("stm-ranid").style.display = "block";
			 document.getElementById("stm-newNote").style.display = "block";
			document.getElementById("stm-constat").style.display = "block";
			document.getElementById("stm-keyStat").style.display = "block";
			document.getElementById("stm-closeall").style.display = "block";
			document.getElementById("stm-uwmStat").style.display = "block";
			document.getElementById("stm-winStat").style.display = "block";
			document.getElementById("stm-uwmArrStat").style.display = "block";
			document.getElementById("stm-soundStat").style.display = "block";
			 document.getElementById("stm-www2").style.display = "block";
			document.getElementById("stm-htbv").style.display = "block";
			document.getElementById("stm-phmini").style.display = "block";
			document.getElementById("stm-ranMusic").style.display = "block";
			document.getElementById("stm-mpmini").style.display = "block";
			document.getElementById("stm-ytmini").style.display = "block";
			document.getElementById("stm-vpmini").style.display = "block";
			 document.getElementById("stm-MiniBrowser").style.display = "block";
			document.getElementById("stm-htb1").style.display = "block";
			document.getElementById("stm-htb2").style.display = "block";
			document.getElementById("stm-htb3").style.display = "block";
			document.getElementById("stm-htb4").style.display = "block";
			 document.getElementById("stm-allrecent").style.display = "block";
			document.getElementById("stm-htb6").style.display = "block";
			document.getElementById("stm-gbook").style.display = "block";
			document.getElementById("stm-scalc").style.display = "block";
			break;			

		case (screenSize > 1000 && screenSize < 1300):
			 document.getElementById("stm-logout").style.display = "block";
			 document.getElementById("stm-alldesks").style.display = "block";
			 document.getElementById("stm-reload").style.display = "block";
			document.getElementById("stm-ranid").style.display = "block";
			 document.getElementById("stm-newNote").style.display = "block";
			document.getElementById("stm-constat").style.display = "block";
			document.getElementById("stm-keyStat").style.display = "block";
			document.getElementById("stm-closeall").style.display = "block";
			document.getElementById("stm-uwmStat").style.display = "block";
			document.getElementById("stm-winStat").style.display = "block";
			document.getElementById("stm-uwmArrStat").style.display = "block";
			document.getElementById("stm-soundStat").style.display = "block";
			 document.getElementById("stm-www2").style.display = "block";
			document.getElementById("stm-htbv").style.display = "block";
			document.getElementById("stm-phmini").style.display = "block";
			document.getElementById("stm-ranMusic").style.display = "block";
			document.getElementById("stm-mpmini").style.display = "block";
			document.getElementById("stm-ytmini").style.display = "block";
			document.getElementById("stm-vpmini").style.display = "block";
			 document.getElementById("stm-MiniBrowser").style.display = "block";
			document.getElementById("stm-htb1").style.display = "block";
			document.getElementById("stm-htb2").style.display = "block";
			document.getElementById("stm-htb3").style.display = "block";
			document.getElementById("stm-htb4").style.display = "block";
			 document.getElementById("stm-allrecent").style.display = "block";
			document.getElementById("stm-htb6").style.display = "block";
			document.getElementById("stm-gbook").style.display = "block";
			document.getElementById("stm-scalc").style.display = "block";
			break;
			
		case (screenSize > 900 && screenSize < 1000):
			document.getElementById("stm-ranid").style.display = "block";
			document.getElementById("stm-pauseWp").style.display = "block";
			document.getElementById("stm-closeall").style.display = "block";
			document.getElementById("stm-uwmArrStat").style.display = "block";
			document.getElementById("stm-soundStat").style.display = "block";
			document.getElementById("stm-htbv").style.display = "block";
			document.getElementById("stm-phmini").style.display = "block";
			document.getElementById("stm-mpmini").style.display = "block";
			document.getElementById("stm-ytmini").style.display = "block";
			document.getElementById("stm-vpmini").style.display = "block";
			 document.getElementById("stm-MiniBrowser").style.display = "block";
			document.getElementById("stm-htb1").style.display = "block";
			document.getElementById("stm-htb2").style.display = "block";
			document.getElementById("stm-htb3").style.display = "block";
			document.getElementById("stm-htb4").style.display = "block";
			document.getElementById("stm-htb6").style.display = "block";
			document.getElementById("stm-gbook").style.display = "block";
			document.getElementById("stm-locstor").style.display = "block";
			document.getElementById("stm-scalc").style.display = "block";
			break;	

	}

}

function clearls(sid) {	
	//clear local copy
	var localStorageKey =  location.host + "-ace-" + sid;
	var thisContent = "";
	localStorage.setItem(localStorageKey, thisContent);
	alert("cleared local copy: "+sid);
	return;
};

//edv - 1/14/2018 - get domain of url
function getDomain(url) {
    var hostName = getHostName(url);
    var domain = hostName;
    
    if (hostName != null) {
        var parts = hostName.split('.').reverse();
        
        if (parts != null && parts.length > 1) {
            domain = parts[1] + '.' + parts[0];
                
            if (hostName.toLowerCase().indexOf('.co.uk') != -1 && parts.length > 2) {
              domain = parts[2] + '.' + domain;
            }
        }
    }
    
    return domain;
}

//edv - 1/19/2018 - get host namefunction getHostName(url) {
function getHostName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
    }
    else {
        return null;
    }
}
