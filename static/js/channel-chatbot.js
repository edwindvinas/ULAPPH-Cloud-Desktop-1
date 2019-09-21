//--start channel codes
var FL_CONNECTED_OK = false;
var root = location.protocol + '//' + location.host;

var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;
    // Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

function onOpen() {
	console.log("Channel opened...");
	FL_CONNECTED_OK = true;
};

function procMessage(obj) {
	//do only if chat is ready
	if (localStorage['chat-ready'] != "Y") {
		return;
	}
	console.log("procMessage...");
    	console.log("obj: "+obj);
 	var res = obj.message;
	var sysUpd = res.indexOf("ULAPPH-SYS-UPD@888@");
    	var danger = res.indexOf("danger-cat.png");
	var str = res; 
	var resp = str.split(":");
    	if (res != "CHANNEL CONNECTED." && res != "CHANNEL ERROR." && res != "CHANNEL DISCONNECTED." && res != undefined) {
        chatWindow.talk(
            {
                "procMessageRes": {
                says: [res],
                reply: []
                }
            },
            "procMessageRes"
        )
        if (danger > 0) {
            var aSound = document.createElement('audio');

            if (isEdge == true || isIE == true || isSafari == true) {
                soundManager.createSound({
                    id: 'mySound4',
                    volume: 80,
                    url: root + "/audio/WarningSiren.mp3"
                });

                playSound('mySound4');			
            } else {	
                soundManager.createSound({
                    id: 'mySound4',
                    volume: 80,
                    url: root + "/audio/WarningSiren.ogg"
                });

                playSound('mySound4');			
            }
        } else {
            var aSound = document.createElement('audio');

            if (isEdge == true || isIE == true || isSafari == true) {
                soundManager.createSound({
                    id: 'mySound4',
                    volume: 80,
                    url: root + "/audio/pop.mp3"
                });

                playSound('mySound4');			
            } else {	
                soundManager.createSound({
                    id: 'mySound4',
                    volume: 80,
                    url: root + "/audio/pop.ogg"
                });

                playSound('mySound4');			
            }
        }
    }

};


function onClose() {
	FL_CONNECTED_OK = false;
	reConnect();
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
	return;
};

function playSound(sid) {
	soundManager.play(sid);
	return;
}

function speakMessage(thisMsg){
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

function openWindow(tgt, ttl) {
    window.open(tgt);
}
