## Changes to the Omegle.js File

x represents a letter, X represents a capital letter.

Documents may use " or ' for strings.

At the top: 

	var webRTCconnection = null;
	var publicMetaBackend = null;
	var ANBAW = null;

By the "new RTCPeerConnection":

	webRTCconnection = Xx;
	change("new WEBRTC connection", Xx);
	publicMetaBackend.setRTCconnection(Xx);

Around the MetaBackend init "MetaBackend = new Class({" around initialize:

	this.webRTCconnection = null

In the MetaBackend Class:

	getRTCConnection : function(){
      return new Promise(resolve => {
        if(!this.webRTCconnection){
          this.proxy = new Proxy(this, {
            set: function (target, key, value) {
                //console.log(`${key} set to ${value}`);
                //target[key] = value;
                if(key == "webRTCconnection") resolve(value);
            }
          });
        } else {
          resolve(this.webRTCconnection);
        }
      });
    },
    setRTCconnection : function (conn){
      this.webRTCconnection = conn;
      if(this.proxy) this.proxy.webRTCconnection = conn;
    },

In the switch case 'case "really":' area:

	case "really":
		change("beforeManualDisconnect", Xx);
		X();
		change("disconnected");

^^ Xx in beforeManualDisconnect is the same as the Xx here (slightly above the switch case):

	function M() {
		Xx.stopped || db || (Xx.disconnect(),
			x("You have disconnected.", !1),
			X())
		}

just after: "Xx.addEvent("strangerConnected", function () {":

	change("connected");

just after "Xx.addEvent("connectionDied", function (a) {":

	change("disconnected");

just after "Xx.addEvent("antinudeBanned", function (a) {":
	x('Banned. 😡😡 Cockblocker is not impressed'),

just after "Xx.addEvent('commonLikes', function (a) {":
	
	change("commonLikes", a);

Just after "Xx.addEvent('partnerCollege', function (a) {":

	change("partnerCollege", a);

Just after "Xx.addEvent('gotMessage', function (a) {" then "X('stranger', a),":

	 change("gotMessage", a);

Modify the function "function startFirstChat(a, b, c, d, e) {":

	function startFirstChat(a, b, c, d, e) {
		var f = Array.prototype.slice.call(arguments);
		let callbackRun = () => {
			confirmTerms(**INSERT CODE**);
		};
		if (!ANBAW.requestChatFind()) {
			if (!a) {
				callbackRun();
			} else {
				ANBAW.loadModel(callbackRun);
			}
		} else {
			callbackRun();
		}
	}

Add this to the start of the method "sendMessage: function (a) {":

	if (ANBAW.currentPerson) {
      if (ANBAW.currentPerson.constructor.name == "AntiSpamText") {
        ANBAW.currentPerson.msgSent(a);
      }
    }

Add this after "new MetaBackend" is called (Xx is the MetaBackend var):

	setMetaBackend(Xx);
	(Xx the same as the setMetaBackend arg).disconn = (X the function name that contains "You have disconnected.");
	(Xx the same as the setMetaBackend arg).findNew = (
		The name of this function, it's a bit ambiguous but it's all we got :(
		function X(f, g, h, i, j) {
      if (!ab) {
        if (void 0 === f) {
          if (null !== cb) return void cb.go();
          f = a
        }
        f && (g = null, h = !1, i = !1),
        void 0 === g && (g = b),
        void 0 === h && (h = c),
        void 0 === i && (i = d),
        void 0 === j && (j = e),
        a && !f && ha(),
        X(),
        startNewChat(f, g, h, i, j)
      }
    }
	)

	(Xx the same as the setMetaBackend arg).showMsgSent = (
		X this function name:
		function X(a, b) {
      if ('you' == a) {
        var c = 'youmsg',
        d = 'You';
        la = !0
      } else {
        var c = 'strangermsg',
        d = 'Stranger';
        startFlashing(),
        ma = !0
      }
      b = b.trim(),
      ('stranger' !== a || - 1 === b.toLowerCase().indexOf('videobam')) && (A(d, c, b), 'stranger' !== a || - 1 === b.indexOf('FBI') && - 1 === b.toLowerCase().indexOf('federal bureau') || w('If the above message says you have been reported to the FBI, it is not legitimate. Please ignore it.'), 'stranger' === a && - 1 !== b.toLowerCase().indexOf('facebook.com/profile.php?') && - 1 === b.toLowerCase().indexOf('id=') && w('THE STRANGER DOES NOT KNOW YOUR FACEBOOK INFO. The above link directs anyone to their own profile; it is not really a link to your profile specifically.'))
    }
	)