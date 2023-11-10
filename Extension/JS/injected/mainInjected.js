
var canvasHeight = 227;
var canvasWidth = 227;

var antiPervMSGS = [
    "https://youtu.be/z1n9Jly3CQ8?t=24",
    "https://youtu.be/gw1j_f2_dFg",
    "https://www.youtube.com/watch?v=VfCYZ3pks48"
];


const genderConsts = {
    male: ["m", "male", "man", "guy", "boy"],
    female: ["female", "f", "girl", "woman"]
}; // if contains
const allowPhrases = [
    "m or f",
    "m/f",
    "f or m",
    "f/m",
    "f?",
    "m?",
    "male?",
    "female?",
    "male or female",
    "female or male"
];
const hornyMSGS = [
    "horny",
    "hard",
    "dick",
    "pussy"
];

/*
Meta Backend Events:
'connectedToServer',
'waiting',
'strangerConnected',
'gotMessage',
'strangerDisconnected',
'typing',
'stoppedTyping',
'recaptchaRequired',
'gotMessageHTML',
'recaptchaRejected',
'spyMessage',
'spyTyping',
'spyStoppedTyping',
'spyDisconnected',
'question',
'error',
'commonLikes',
'antinudeBanned',
'serverMessage',
'identDigests',
'icecandidate',
'rtccall',
'rtcpeerdescription',
'partnerCollege'
*/

class AntiNudeButItActuallyWorks {
    constructor(antiPervMSGS, nsfwjs, settings) {
        this.settings = settings;
        this.modelURL = settings.nsfwJSmodelURL;
        this.updateSettings(settings);
        this.antiPervMSGS = antiPervMSGS;
        this.model = null;
        this.nsfwjs = nsfwjs;
        this.mode = null;
        this.chats = [];
        this.botMessages = null;
        //this.loadModel();
        this.currentPerson = null;
    }
    updateSettings(settings) { // should just have this.settings.video... or .text...
        if (debug) console.log("updated settings");
        //this.modelURL = settings.nsfwJSmodelURL; // this.settings.nsfwJSmodelURL
        //this.blur = settings["Blur"]; // this.settings.Blur
        //this.autoSkip = settings["Auto Skip"]; // this.settings["Auto Skip"]
        //this.quickRefresh = settings["Scan Delays"]; // this.settings["Scan Delays"]
        //this.misc = settings.Misc;// this.settings.Misc
        this.settings = settings;
        if (this.currentPerson) {
            this.currentPerson.update();
        }
    }
    loadModel(callback) {
        if (debug) console.log("modelURL: " + this.modelURL);
        var modelStatus = document.querySelector("#modelLoading");
        if (!modelStatus) {
            modelStatus = document.createElement("div");
            modelStatus.innerHTML = "<center><h1>Cock Blocker is Loading, Please Wait!</h1></center>";
            modelStatus.setAttribute("id", "modelLoading");
            insertAfter(modelStatus, document.querySelector("#introtext"));
        }
        this.nsfwjs.load(this.modelURL, { type: "graph" }).then(m => {
            if (debug) console.log("Model Loaded!");
            this.model = m;
            //if(this.requestChatFindCallback) this.requestChatFindCallback();
            if (callback) callback();
            modelStatus.innerHTML = "<center><h1>Cock Blocker Has Loaded!</h1></center>";
        }).catch(e => {
            if (debug) console.log("couldn't load model, reloading page " + e);
            //location.reload();
        });
    }
    requestChatFind() {
        return !!this.model;
    }
    newMetaBackend(metaBackend) {
        //if(this.currentPerson) this.currentPerson.kms();
        this.mode = document.body.classList.contains("videochat") ? "video" : "text";
        if (debug) console.log(`Body Classlist: ${document.body.classList} | ${this.mode}`);
        if (this.mode == "video") {
            if (debug) console.log("Started Finding, created AntiNudeVideo");
            this.currentPerson = new AntiNudeVideo(metaBackend, this);
        } else if (this.mode == "text") {
            if (debug) console.log(`Got new meta backend, on text mode ${metaBackend.stopped}`);
            if (this.botMessages == null) this.setBotMessages();
            this.currentPerson = new AntiSpamText(metaBackend, this);
        }
    }
    getAntiPervMSGS() { // might depreciate
        return this.antiPervMSGS;
    }
    updateAntiPervMSGS(newAntiPerv) {  // might depreciate
        this.antiPervMSGS = newAntiPerv;
    }
    sendMessage(message) {
        if (!this.currentPerson) return;
        if (debug) console.log("sending message: " + message);
        this.currentPerson.metaBackend.sendMessage(message);
    }
    addChat(chat) {
        this.chats.push(chat);
        if (this.chats.length > 10) this.chats.shift();
    }
    exportLastAsBot() {
        let chat = this.chats[this.chats.length - 1];
        let report = {
            "Report_Type": 0,
            "Last_Active": chat["Start Time"],
            "Messages_Recieved": [],
            "Messages_Recieved_Timing": []
        };
        chat.Messages.filter(msg => !msg.sent).forEach(msg => {
            report["Messages_Recieved"].push(msg.msg);
            report["Messages_Recieved_Timing"].push(msg.time - chat["Start Time"]);
        });
        if (report["Messages_Recieved"].length > 0) {
            this.transferBotMSGS(report); // should really have this as an async await, but it should be fine
        }
        this.setBotMessages();
        //console.log(JSON.stringify(report, 0, 2));
    }
    getWebPages() {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(extensionID, { action: "get web pages" }, function (response) {
                if (!response) return reject("error, invalid response when getting web pages");
                resolve(response);
                if (debug) console.log(response.popup);
            });
        });
    }
    async setBotMessages() {
        this.botMessages = await this.getBotMessages();
    }
    getBotMessages() {
        // this.NBAW.botMessages == 
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(extensionID, { action: "get bot messages" }, async function (response) {
                if (!response) return reject("error, invalid response when getting updated settings");
                resolve(response);
            });
        });
    }
    async transferBotMSGS(msgs) {
        chrome.runtime.sendMessage(extensionID, { action: "send bot msgs", data: msgs });
    }
}
class AntiNudeVideo {
    constructor(metaBackend, NBAW) {
        this.metaBackend = metaBackend;
        this.startTime = 0;
        this.webRTCConnection = null;
        this.badArr = [];
        this.badBool = false;// cant assume...

        this.imageCapture = null;
        this.checkTimeout = null;
        this.autoSkipTimeout = null;
        this.manualNotNude = false;
        this.NBAW = NBAW;
        this.otherVid = null;
        this.logItems = null;

        this.metaBackend.addEvent('strangerDisconnected', () => {
            this.kms(true);
        }, false);


        this.metaBackend.getRTCConnection().then((webRTCConnection) => {
            this.createPredictionsDom();
            this.otherVid = document.querySelector("#othervideo");
            this.logItems = document.querySelectorAll(".logitems");
            this.otherVid.onclick = () => {
                this.setManualOverride(!this.manualNotNude);
            }
            this.webRTCConnection = webRTCConnection;
            this.webRTCConnection.onconnectionstatechange = () => {
                if (this.webRTCConnection.connectionState == "connected") {
                    this.startTime = Date.now();
                    this.setBlur(0, false, true);
                    this.onRTCConnected();
                } else if (this.webRTCConnection.connectionState == "connecting") {
                    if (this.checkTimeout) clearTimeout(this.checkTimeout);
                }
            }
        });
    }
    updateQuickOptions(avg) {
        var quickOpts = document.querySelector("#quickOptions");
        if (!quickOpts) {
            var quickOpts = document.createElement("div");
            quickOpts.setAttribute("id", "quickOptions");
            // mark SFW/nsfw, timer for autoSkip disable
            var markBTN = document.createElement("span");
            markBTN.setAttribute("id", "markBTN");
            markBTN.setAttribute("onclick", `if(ANBAW.currentPerson) ANBAW.currentPerson.setManualOverride(!ANBAW.currentPerson.manualNotNude)`);
            quickOpts.appendChild(markBTN);
            if (this.NBAW.settings.video["Auto Skip"]["Enable dont skip after time"]) {
                quickOpts.innerHTML += "<br><br>";
                var dontSkipTimer = document.createElement("span");
                dontSkipTimer.setAttribute("id", "dontSkipTimer");
                var timeOut = () => {
                    var timeLeft = Math.floor(((Date.now() - (this.startTime + this.NBAW.settings.video["Auto Skip"]["Dont skip after time"])) / 1000));
                    if (timeLeft >= 0 || this.webRTCConnection.connectionState != "connected") {
                        dontSkipTimer.style.display = "none";
                    } else {
                        dontSkipTimer.innerText = `Time until auto skip disables: ${Math.abs(timeLeft)}s`;
                        setTimeout(() => {
                            timeOut();
                        }, 500);
                    }
                }
                timeOut();
                quickOpts.appendChild(dontSkipTimer);
            }
            document.querySelector(".logbox").children[0].appendChild(quickOpts);
        }

        quickOpts.querySelector("#markBTN").innerText = this.manualNotNude ? "Reset Not Nude!" : "Mark As Not Nude!";

    }
    onRTCConnected() {
        var track = this.webRTCConnection.getReceivers().find(rec => rec.track.kind == "video").track;
        var settings = track.getSettings();//getSettings();

        if (settings.height == undefined) {
            window.requestAnimationFrame(() => {
                if (debug) console.log("having to go back ffs");
                if (this.webRTCConnection.connectionState == "connected") this.onRTCConnected();
            });
        } else {
            this.imageCapture = new ImageCapture(track);
            //console.log(this.imageCapture);
            //canvasWidth = settings.width;
            //canvasHeight = settings.height;
            this.hiddenCanvas = new OffscreenCanvas(canvasWidth, canvasHeight);
            //this.hiddenCanvasCTX = this.hiddenCanvas.getContext("bitmaprenderer");
            this.hiddenCanvasCTX = this.hiddenCanvas.getContext("2d");
            this.checkNudity();
        }
    }
    updateBadometer(val, hide) {
        if (!hide) {
            hide = !this.NBAW.settings.video.Misc["Display nudity score"];
        }
        var nudeometerDIV = document.querySelector("#nudeometer");
        if (!nudeometerDIV) {
            nudeometerDIV = document.createElement("div");
            nudeometerDIV.setAttribute("id", "nudeometer");
            document.querySelector("#videowrapper").appendChild(nudeometerDIV);
        }
        var annoyingButton = document.querySelector("#abovevideosexybtn");
        if (annoyingButton) {
            nudeometerDIV.style.top = (annoyingButton.offsetHeight + 10) + "px";
        } else {
            nudeometerDIV.style.top = 10 + "px";
        }
        nudeometerDIV.innerText = val;
        var colours = [];
        if (val <= 0) {
            colours = [28, 227, 136];
        } else if (val > 0 && val < 50) {
            colours = [223, 109, 32];
        } else {
            colours = [245, 10, 30];
        }
        nudeometerDIV.style.backgroundColor = `rgb(${colours[0]}, ${colours[1]}, ${colours[2]})`;
        nudeometerDIV.style.display = hide ? "none" : "block";
    }
    updateAutoSkipTimerBar(enable, time) {
        var autoSkipTimer = document.querySelector("#autoSkipTimer");
        if (!autoSkipTimer) {
            autoSkipTimer = document.createElement("div");
            autoSkipTimer.setAttribute("id", "autoSkipTimer");
        }
        document.querySelector("#videowrapper").appendChild(autoSkipTimer);
        var annoyingButton = document.querySelector("#abovevideosexybtn");
        if (annoyingButton) {
            autoSkipTimer.style.top = annoyingButton.offsetHeight + "px";
        } else {
            autoSkipTimer.style.top = 0;
        }
        if (enable) {
            autoSkipTimer.style.display = "block";
            autoSkipTimer.style.animation = `autoSkipKeyframe ${time / 1000}s linear`;
            var newEle = autoSkipTimer.cloneNode(true);
            autoSkipTimer.parentNode.replaceChild(newEle, autoSkipTimer);

        } else {
            autoSkipTimer.style.display = "none";
        }
    }
    setStyleSheets() {
        var styleSheet = document.querySelector("#injectedStyles");
        if (!styleSheet) {
            styleSheet = document.createElement("style");
            styleSheet.setAttribute("id", "injectedStyles");
            document.body.appendChild(styleSheet);
        }

        styleSheet.innerHTML = `
        ${debug ? `
        #dirtyAnalysedIMG {
            filter: blur(15px);
        }
        #dirtyAnalysedIMG:hover {
            filter: blur(0px);
        }` : ""}
        .nudePerson {
            filter: blur(${this.NBAW.settings.video.Blur["Amount of Blur"]}px);
        }
        ${this.NBAW.settings.video.Blur["Allow mouseover preview"] ? `
        .nudePerson:hover {
            animation-name: unBlur;
            animation-duration: ${this.NBAW.settings.video.Blur["Mouseover Blur Fade Time"] / 1000}s;
        }` : ''}
        
        @keyframes unBlur {
            from {filter: blur(${this.NBAW.settings.video.Blur["Amount of Blur"]}px)}
            to {filter: blur(0px)}
        }
        `;
    }
    skipChat() {
        if (debug) console.log("Skipping Chat!");
        if (this.NBAW.settings.video["Auto Skip"]["Send anti-masturbatory message on autoskip"]) {
            var antiPerv = this.NBAW.antiPervMSGS;
            this.NBAW.sendMessage(antiPerv[Math.floor((Math.random() * antiPerv.length))]);
        }
        var autoSkipNotifierDOM = document.createElement("div");
        autoSkipNotifierDOM.setAttribute("id", "autoSkipNotifier");
        autoSkipNotifierDOM.innerText = `Nudity Detected, Ended Chat!`
        document.querySelector(".logbox").children[0].appendChild(autoSkipNotifierDOM);
        this.kms();
    }
    setManualOverride(value) {
        if (debug) console.log("setting manual override " + value);
        this.manualNotNude = value;
        if (this.metaBackend) this.update();
        var overRideButton = document.querySelector("#markBTN");
        if (overRideButton) {
            overRideButton.innerText = this.manualNotNude ? "Reset Not Nude!" : "Mark As Not Nude!";
        }
    }
    update() {
        if (!this.webRTCConnection) return;
        if (this.webRTCConnection.connectionState != "connected") return;
        var avg = getArrAvg(this.badArr, 5);
        this.setBlur(avg); // *********** Need to update this to allow to be set/configured **********
        this.updateQuickOptions(avg);
        this.manageAutoSkip(avg);
        this.updateBadometer(avg);
        this.setStyleSheets();
        if (debug) this.predictionsDom.innerHTML = `<br><h1 style="color:red">${this.badBool ? "DIRTY STRANGER!" : "GOOD STRANGER"} (quickRefresh threshold), NUDITY SCORE: ${this.badArr[this.badArr.length - 1]}<br>AVG NUDITY Score: ${avg}</h1>`;
        this.badBool = avg > this.NBAW.settings.video["Scan Delays"].Threshold;
    }
    manageAutoSkip(avg) { // maybe have a button with a timer just incase to manually override
        if (debug) console.log("nudePerson score: " + avg + " threshold: " + this.NBAW.settings.video["Auto Skip"].Threshold);
        if (this.manualNotNude) {
            this.updateAutoSkipTimerBar(false);
        } else {
            if (this.NBAW.settings.video["Auto Skip"].Enable && !(this.NBAW.settings.video["Auto Skip"]["Enable dont skip after time"] && Date.now() - this.startTime > this.NBAW.settings.video["Auto Skip"]["Dont skip after time"])) {
                if (this.NBAW.settings.video["Auto Skip"].Threshold <= avg && !this.autoSkipTimeout) {
                    if (debug) console.log("nudePerson score above threshold, setting timeout");
                    this.updateAutoSkipTimerBar(true, this.NBAW.settings.video["Auto Skip"].Delay);
                    this.autoSkipTimeout = setTimeout(() => {
                        if (debug) console.log("skipTimeout running");
                        avg = getArrAvg(this.badArr, 5);
                        if (this.NBAW.settings.video["Auto Skip"].Threshold <= avg && !this.manualNotNude && this.webRTCConnection.connectionState == "connected") {
                            this.skipChat();
                        }
                        this.updateAutoSkipTimerBar(false);
                        this.autoSkipTimeout = null;
                    }, this.NBAW.settings.video["Auto Skip"].Delay);
                }
            }
        }
    }
    kms(stranger) {
        if (debug) console.log("Running KMS on video");
        if (this.checkTimeout) clearTimeout(this.checkTimeout);
        this.setBlur(0, true);
        this.updateBadometer(0, true);
        this.updateAutoSkipTimerBar(false);
        if (debug) console.log(this.badArr);
        if (debug) console.log(`AVG nudePerson score over all: ${getArrAvg(this.badArr, this.badArr.length)}, last score: ${this.badArr[this.badArr.length - 1]}`);
        this.metaBackend.disconn();
        this.NBAW.currentPerson = null;
    }
    setBlur(avg, disconn, start) {
        if ((this.NBAW.settings.video.Blur.Enable && !disconn)) {
            if (avg >= this.NBAW.settings.video.Blur.Threshold && !this.manualNotNude) {
                if (!this.otherVid.classList.contains("nudePerson")) this.otherVid.style.filter = this.otherVid.classList.add("nudePerson");
            } else {
                if (this.otherVid.classList.contains("nudePerson")) this.otherVid.classList.remove("nudePerson");
            }
        } else if (start && this.NBAW.settings.video.Blur.Enable) {
            if (!this.otherVid.classList.contains("nudePerson")) this.otherVid.style.filter = this.otherVid.classList.add("nudePerson");
        } else {
            if (this.otherVid.classList.contains("nudePerson")) this.otherVid.classList.remove("nudePerson");
        }
    }
    checkNudity() {
        this.detectNudity().then((retOBJ) => {
            var nudeScore = retOBJ.nudeScore;
            var predictions = retOBJ.predictions.map(ele => {
                return { "probability": Math.floor(ele.probability * 100) / 100, "className": ele.className }
            });
            this.badArr.push(nudeScore);
            this.update();
            if (debug) {
                this.hiddenCanvas.convertToBlob().then(blob => {
                    var imgOut = new Image();
                    var urlCreator = window.URL || window.webkitURL;
                    imgOut.setAttribute("id", this.badBool ? "dirtyAnalysedIMG" : "cleanAnalysedIMG");
                    imgOut.src = urlCreator.createObjectURL(blob);
                    imgOut.onload = () => {
                        if (document.querySelector("#dirtyAnalysedIMG")) document.querySelector("#dirtyAnalysedIMG").remove();
                        if (document.querySelector("#cleanAnalysedIMG")) document.querySelector("#cleanAnalysedIMG").remove();

                        insertAfter(imgOut, document.querySelector(".logitem"));
                    }

                    //document.querySelector(".logbox").appendChild(imgOut);
                });
                this.predictionsDom.innerHTML += JSON.stringify(predictions, null, 2);
            }


            this.checkTimeout = setTimeout(() => {
                window.requestAnimationFrame(() => {
                    try {
                        this.checkNudity();
                    } catch (e) {
                        if (debug) console.log("error with checking nudity on request animation frame: " + e);
                    }

                });
            }, ((nudeScore > this.NBAW.settings.video["Scan Delays"].Threshold) || (getArrAvg(this.badArr, 5) > this.NBAW.settings.video["Scan Delays"].Threshold) && this.NBAW.settings.video["Scan Delays"]["Enable Quick Delay"]) ? this.NBAW.settings.video["Scan Delays"]["Quick Delay"] : this.NBAW.settings.video["Scan Delays"]["Normal Delay"]); // ******** Need to make these dynamic to the load ********
        }).catch(err => {
            if (debug) console.log("error with detect nudity, promise rejected: " + err)
        });
    }
    createPredictionsDom() {
        this.logItems = document.querySelectorAll(".logitem");
        this.predictionsDom = document.createElement("div");
        insertAfter(this.predictionsDom, this.logItems[this.logItems.length - 1]);
        this.predictionsDom.setAttribute("id", "predictions");
    }
    getStrangerFrame() { // unreliable
        return new Promise((resolve, reject) => {
            this.imageCapture.grabFrame().then(img => {
                this.hiddenCanvasCTX.transferFromImageBitmap(img);
                if (checkIfIMGEmpty(this.hiddenCanvas).getImageData(0, 0, canvasWidth, canvasHeight)) {
                    if (debug) console.log("failed, frame was empty, trying again!");
                    window.requestAnimationFrame(() => {
                        this.getStrangerFrame().then(() => resolve());
                    });
                } else {
                    resolve();
                }
            }).catch(e => {
                if (debug) console.log("failed to get frame, trying again!");
                window.requestAnimationFrame(() => {
                    this.getStrangerFrame().then(() => resolve());
                });
            });
        });
    }
    detectNudity() {
        return new Promise((resolve, reject) => {
            //reject(`${this}, ${this.webRTCconnection}`)
            if (this.webRTCConnection.connectionState != "connected") {
                return reject("web RTC not connected, no new frame to process");
                /*this.webRTCConnection.onconnectionstatechange = () => {
                    if(this.webRTCConnection.connectionState == "connected"){
                        this.detectNudity().then(returned => resolve(returned));
                    }
                };*/
            }
            // can use this loadCanvas() instead
            this.loadCanvas().then(() => {
                this.NBAW.model.classify(this.hiddenCanvas).then(predictions => {
                    var pornProb = predictions.find(ele => ele.className == "Porn").probability;
                    var sexyProb = predictions.find(ele => ele.className == "Sexy").probability;
                    var neutralProb = predictions.find(ele => ele.className == "Neutral").probability;
                    var nudeScore = Math.floor((pornProb + sexyProb - (neutralProb * 0.75)) * 100);
                    resolve({ "nudeScore": nudeScore, "predictions": predictions });
                });
            });
        });
    }
    loadCanvas(res) { // might not use
        this.hiddenCanvasCTX.drawImage(this.otherVid, 0, 0, canvasWidth, canvasHeight); // Hidden canvas set here
        return new Promise((resolve, reject) => {
            resolve = res ? res : resolve;
            var newCanvasContents = this.hiddenCanvasCTX.getImageData(0, 0, canvasWidth, canvasHeight);
            if (checkIfIMGEmpty(newCanvasContents)) {
                window.requestAnimationFrame(() => { // ******** Mayyybe have a delay here to stop recursion going too quick *******
                    if (this.webRTCConnection.connectionState == "connected") this.loadCanvas(resolve);
                });
            } else {
                resolve();
            }
        });
    }
    beforeManualDisconnect() {
        /*
        if(this.NBAW.settings.video.Misc["Send Cockblocker Promotional Message On Skip"]){
            this.metaBackend.sendMessage("I'm using Cock Blocker For Omegle on the chrome extension store!");
        } */
    }
    messageRecieved(msg) {

    }
}
class AntiSpamText {
    constructor(metaBackend, NBAW) {
        this.meta = metaBackend;
        this.NBAW = NBAW;
        this.sendMessageTimeout = null;
        this.afkAutoSkip = null;
        this.timeConnected = 0;
        this.autoSkipped = false;
        this.msgs = [];
        this.addManualBotBTN();
        if (debug) console.log(`anti spam text created!`);
        this.meta.addEvent('strangerConnected', () => {
            this.connected()
        }, false);
        this.meta.addEvent('strangerDisconnected', () => {
            this.kms(true);
        }, false);
        this.meta.addEvent('typing', () => {
            this.typing(true);
        }, false);
        this.meta.addEvent('stoppedTyping', () => {
            this.typing(false);
        }, false);
        this.meta.addEvent('gotMessage', (msg) => {
            this.messageRecieved(msg);
        }, false);

        //this.setCurrentPerson();
    }

    setCurrentPerson() {// really shouldn't need this, I assume it might be a bug with chrome
        if (this.NBAW.currentPerson != this) {
            if (debug) console.log(`this.NBAW.currentPerson is not set GRR, ${this.NBAW.currentPerson} and ${this}`);
            this.NBAW.currentPerson = this;
        }
    }
    connected() {
        this.setCurrentPerson();
        this.timeConnected = Date.now();
        if (this.NBAW.settings.text["Message On Connect"]["Send a message on connect"]) {
            this.sendMessageTimeout = setTimeout(() => {
                var msgOut = this.NBAW.settings.text["Message On Connect"]["Message to send on connect"];
                this.meta.showMsgSent("you", msgOut);
                this.meta.sendMessage(msgOut);
            }, this.NBAW.settings.text["Message On Connect"]["Delay to send message"]);
        }
        if (this.NBAW.settings.text["Auto Skip"]["Auto Skip On Stranger AFK"]) {
            this.afkAutoSkip = setTimeout(() => {
                this.autoSkipped = true;
                this.kms(true);
            }, this.NBAW.settings.text["Auto Skip"]["Auto Skip On Stranger AFK Delay"]);
            this.showAutoSkipTimer(this.NBAW.settings.text["Auto Skip"]["Auto Skip On Stranger AFK Delay"]);
        }
    }
    messageRecieved(msg) {
        this.clearAutoSkipTimeout();
        this.msgs.push({ sent: false, msg: msg, time: Date.now() });
        if (this.NBAW.settings.text["Auto Skip"]["Horny Guys"]) {
            if (this.msgs.filter(msg => !msg.sent).length <= 2) {
                if (debug) console.log("Scanning for horny guys!");
                if (this.scanForHornyGuy()) {
                    if (debug) console.log("Horny guy found, msgs: " + this.msgs.filter(msg => !msg.sent).flatMap((msg) => { return msg.msg }));
                    this.autoSkipped = true;
                    this.kms(true);
                }
            }
        }
        if (this.NBAW.settings.text["Auto Skip"]["Bots"]) {
            if (debug) console.log("Scanning for bots!");
            if (this.scanForBot()) {
                if (debug) console.log("Bot found, msgs: " + this.msgs.filter(msg => !msg.sent).flatMap((msg) => { return msg.msg }));
                this.autoSkipped = true;
                this.kms(true);
            }
        }
    }
    typing(started) {
        this.clearAutoSkipTimeout();
    }
    beforeManualDisconnect() {

    }
    kms(stranger, findNew) {
        if (!this.NBAW.currentPerson) return;
        if (this.timeConnected != this.NBAW.currentPerson.timeConnected) return; // checks to see if it needs to "kms"
        if (debug) console.log("Running KMS on text");
        this.saveChat();
        this.clearAutoSkipTimeout();
        window.requestAnimationFrame(addBotReportButtonText); // slight delay so it doesnt come up too soon or early
        if (this.sendMessageTimeout) clearTimeout(this.sendMessageTimeout);
        if (this.meta) this.meta.disconn();
        if ((this.NBAW.settings.text["Auto Refind"]["Enable"] && (stranger || this.autoSkipped)) || findNew) {
            if ((this.msgs.length <= this.NBAW.settings.text["Auto Refind"]["Maximum amount of messages to auto skip after"]) || findNew) {
                this.meta.findNew();
            }
        }
        this.NBAW.currentPerson = null;

    }
    saveChat() {
        let chat = {
            "Start Time": this.timeConnected,
            "Messages": this.msgs
        }
        this.NBAW.addChat(chat);
    }
    update() {

    }
    checkMSGforBot(msg) {

    }
    showAutoSkipTimer(time) {
        var autoSkipTimer = document.querySelector("#autoSkipTimerText");
        if (!autoSkipTimer) {
            autoSkipTimer = document.createElement("div");
            autoSkipTimer.setAttribute("id", "autoSkipTimerText");
            autoSkipTimer.setAttribute("onclick", "ANBAW.currentPerson.clearAutoSkipTimeout();");
            var logBox = document.querySelector(".logbox");
            logBox.insertBefore(autoSkipTimer, logBox.children[0]);
        }

        if (time && this.NBAW.settings.text["Auto Skip"]["Enable Cancel AutoSkip Timer Bar"]) {
            autoSkipTimer.style.display = "block";
            autoSkipTimer.style.animation = `autoSkipKeyframe ${time / 1000}s linear`;
            var newEle = autoSkipTimer.cloneNode(true);
            autoSkipTimer.parentNode.replaceChild(newEle, autoSkipTimer);
        } else {
            autoSkipTimer.style.display = "none";
        }
    }
    clearAutoSkipTimeout() {
        if (this.afkAutoSkip && this.afkAutoSkip != null) {
            clearTimeout(this.afkAutoSkip);
            this.showAutoSkipTimer(false);
        }
    }
    msgSent(msg) {
        this.msgs.push({ sent: true, msg: msg, time: Date.now() });
    }
    scanForHornyGuy() {
        var arr = this.msgs.filter(msg => !msg.sent);
        var genderSaid = false;
        arr.forEach(msg => {
            msg = msg.msg.toLowerCase();
            var allowPhraseSaid = false;
            var genderSaidInMSG = false;
            var saidHorny = false;
            var wordArr = msg.split(/[^a-z'’]+/g).filter(word => word.length > 0);
            wordArr.forEach(msgWord => {
                genderConsts.male.forEach(word => {
                    if (msgWord == word) genderSaidInMSG = true;
                });
            });

            allowPhrases.forEach(phrase => {
                if (msg.includes(phrase)) {
                    allowPhraseSaid = true;
                }
            });
            hornyMSGS.forEach(hMsg => {
                if (msg.includes(hMsg)) saidHorny = true;
            });
            if (!(genderSaid || allowPhraseSaid) && genderSaidInMSG && (wordArr.length < 35 || !saidHorny)) genderSaid = true;
        });

        return genderSaid;
    }
    scanForBot() {// TODO: complete this method
        var msgsRecieved = this.msgs.filter(msg => !msg.sent);

    }
    addManualBotBTN() {
        var tdDom = document.createElement("td");
        var botBTN = document.createElement("div");
        botBTN.classList.add("extraBTNwrapper");
        botBTN.setAttribute("onclick", "ANBAW.currentPerson.manualBotClicked(this)");
        botBTN.setAttribute("id", "botBTN");
        botBTN.innerHTML = `<button class="extraBTN"><div class="botBtnTxt">Bot?</div><div class="botBtnInfo">Skip And Report Them!</div></button>`;
        var disconnectBTN = document.querySelector(".disconnectbtncell");
        tdDom.appendChild(botBTN);
        disconnectBTN.parentNode.insertBefore(tdDom, disconnectBTN.nextSibling);
    }
    manualBotClicked(button) {
        let info = button.querySelector(".botBtnInfo");
        if (info.innerText == "Skip And Report Them!") {
            info.innerText = "Are you sure?";
        } else {
            this.autoSkipped = true;
            this.kms(false, true);
            this.NBAW.exportLastAsBot();
        }
    }
}

function getArrAvg(arr, nums) {
    var tot = 0;
    if (!nums) var nums = 0;
    if (arr.length - nums < 0) nums = arr.length;
    for (var i = arr.length - nums; i < arr.length; i++) {
        if (!arr[i] && debug) console.log(`invalid! in arr, ${arr.length}, ${i}`);
        tot += arr[i];
    }
    return Math.floor((tot / (nums)) * 100) / 100;
}
function checkIfIMGEmpty(img) {
    for (var i = 0; i < img.data.length; ++i) {
        if (img.data[i] != 0) return false;
    }
    return true;
}
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
function setMetaBackend(backend) {

    publicMetaBackend = backend;
    ANBAW.newMetaBackend(backend);
}
function change(val, info) {
    //console.log(`Change ran: ${val}, ${info}`);
    if (!ANBAW && debug) return console.log("no ANBAW");
    switch (val) {
        case "beforeManualDisconnect":
            if (ANBAW.currentPerson) ANBAW.currentPerson.beforeManualDisconnect();
            break;
        case "disconnected":
            if (ANBAW.currentPerson) ANBAW.currentPerson.kms(false);

            break;
        case "connected":

            break;
        case "message":

            break;
        case "commonLikes":

            break;
        case "new WEBRTC connection": // depreciated
            //ANBAW.newRTCconnection(info);
            break;
    }
}
function addBotReportButtonText() {
    if (ANBAW.currentPerson != null) return;
    let items = document.querySelectorAll(".logitem");
    if (items.length > 1) {
        let button = document.createElement("div");
        button.innerText = "Report As Bot?";
        button.setAttribute("onclick", "ANBAW.exportLastAsBot()");
        button.classList.add("botReportButton");
        insertAfter(button, items[items.length - 1]);
    }
}
async function editStartPage() { // TODO
    var table = document.createElement("table");
    var intro = document.querySelector("#introtext");
    var mobileNote = document.querySelector("#mobilesitenote");
    mobileNote.style.display = "none";
    intro.style.display = "none";
    var xi = document.querySelector("#intro").querySelector("img");
    var introText = "You have cockblocker installed, it should help prevent nudity on omegle and if enabled, the text bot blocker to help skip bots.";
    var popupUrl = await ANBAW.getWebPages();
    if (debug) console.log(popupUrl.popup);
    table.innerHTML = `<tr><td id="note"><br><br>${introText}</td><td><iframe id="popupIframe" src="${popupUrl.popup}"></iframe></td></tr>`;
    document.querySelector("#intro").insertBefore(table, intro);
    document.querySelector("#note").insertAdjacentElement("afterbegin", xi);
}
function resetRandID() {
    Cookie.write('randid', "", {
        duration: 365,
        domain: document.domain,
        path: '/'
    });
}
function getUpdatedSettings() {
    chrome.runtime.sendMessage(extensionID, { action: "get updated settings" }, async function (response) {
        if (!response && debug) return console.log("error, invalid response when getting updated settings");
        //console.log("GOT UPDATED SETTINGS"+JSON.stringify(response));
        ANBAW.updateSettings(response.settings);
        getUpdatedSettings();
    });
}
function initialise() {
    chrome.runtime.sendMessage(extensionID, { action: "get start settings" }, async function (response) {
        if (response.settings) {
            if (!ANBAW) {
                // response.nsfwJSmodelURL, { type: "graph" }
                ANBAW = new AntiNudeButItActuallyWorks(antiPervMSGS, nsfwjs, response.settings);
                await editStartPage();
            } else {
                ANBAW.updateSettings(response.settings);
            }
        }
    });
    try {
        getUpdatedSettings();
    } catch (e) {
        if (debug) console.log("error with getting updated settings: " + e);
    }
    if (debug) resetRandID();
}
if (document.readyState != "complete") {
    document.body.onload = () => {
        initialise();
    };
} else {
    initialise();
}
