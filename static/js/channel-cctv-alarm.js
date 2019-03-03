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
	console.log("procMessage...");
    console.log("obj: "+obj);
 	var res = obj.message;
	var sysUpd = res.indexOf("ULAPPH-SYS-UPD@888@");
	var str = res; 
	var resp = str.split(":");

	if (sysUpd > 0) {
		var cmdata = str.split("@888@");
		console.log("cmdata: "+cmdata);
		switch (cmdata[2]) {
			case "SYS_STRUWM_ALARM":
                console.log("SYS_STRUWM_ALARM");
                //data := fmt.Sprintf("@888@ULAPPH-SYS-UPD@888@SYS_STRUWM_ALARM@888@%v@888@%v", CAPTION, MESSAGE
                var caption = cmdata[3];
                var message = cmdata[4];
                alertify.set({ delay: 15000 });
                alertify.error(message);
                speakMessage(caption);

                var aSound = document.createElement('audio');
                if (isEdge == true || isIE == true || isSafari == true) {
                        soundManager.createSound({
                                id: 'mySoundCctv',
                                volume: 85,
                                url: root + "/audio/industrialAlarm.mp3"
                        });
                } else {
                        soundManager.createSound({
                                id: 'mySoundCctv',
                                volume: 85,
                                url: root + "/audio/industrialAlarm.ogg"
                        });
                }
                playSound('mySoundCctv');
                //show in chatwindow
				chatWindow.talk(
					{
					  "cctv-cameras": {
					  says: [caption, message],
						reply: [{
                            question: "New CCTV",
                            answer: "funcNewCCTV"
                            },{
						      question: "Show CCTVs",
						      answer: "funcShowCCTV"
						    },{
							  question: "Capture CCTVs",
							  answer: "funcCaptureCCTV"
						    },{
                                question: "Review CCTVs",
                                answer: "funcReviewCCTV"
                            },{
                                question: "Recent CCTVs",
                                answer: "funcRecentCCTV"
                            },{
                                question: "Alarm Status",
                                answer: "funcAlarmCCTV"
                            }]
					  }
					},
					"cctv-cameras"
				)
				break;
		}
		return;	
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