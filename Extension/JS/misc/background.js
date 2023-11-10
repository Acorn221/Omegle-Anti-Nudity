var currentSettings = null;
var debug = false;

const textMsgsUpdateFrequency = 10000;//43200000;//(100*60*60*24*5) every 5 days
const bot_msg_expiration = 1209600000;
const apiURL = "https://ogibaaufkc.execute-api.eu-west-1.amazonaws.com/Prod/cb-Test";
var adjustableSettings = {
    "video": {
        inputs: [
            {
                name: "Blur",
                description: "This Setting Will Blur Nudity",
                advanced: false,
                show: true,
                vars: [
                    {
                        type: "bool",
                        name: "Enable",
                        alt: "Enable/Disable Blurring",
                        default: true,
                        show: true
                    },
                    {
                        type: "slider",
                        name: "Threshold",
                        min: "-80",
                        max: "95",
                        alt: "This will determine at what point the stranger's video will be blurred",
                        default: 30,
                        show: true
                    },
                    {
                        type: "slider",
                        name: "Amount of Blur",
                        min: "0",
                        max: "50",
                        alt: "This is how blurred the strangers video will be, sometimes the AI is wrong so its good to be able to manually see if they are nude or not",
                        default: 20,
                        show: true
                    },
                    {
                        type: "bool",
                        name: "Allow mouseover preview",
                        alt: "This will allow you to hover your mouse over the strangers video to see if they are nude or not",
                        default: true,
                        show: true
                    },
                    {
                        type: "slider",
                        name: "Mouseover Blur Fade Time",
                        timer: true,
                        min: "0",
                        max: "5000",
                        alt: "This is how long it takes for the blur to completley fade wtih your mouse over",
                        default: 3000,
                        show: true
                    }
                ]
            },
            {
                name: "Auto Skip",
                description: "Auto-skips Nudity",
                advanced: false,
                show: true,
                vars: [
                    {
                        type: "bool",
                        name: "Enable",
                        alt: "Use with caution!",
                        default: true,
                        show: true
                    },
                    {
                        type: "slider",
                        name: "Threshold",
                        min: "-80",
                        max: "95",
                        alt: "This will determine at what point the stranger will be skipped",
                        default: 60,
                        show: true
                    },
                    {
                        type: "slider",
                        name: "Delay",
                        timer: true,
                        min: "0",
                        max: "15000",
                        alt: "This will be how long this will wait if their nudity score is above the threshold",
                        default: 1500,
                        show: true
                    },
                    {
                        type: "bool",
                        name: "Enable dont skip after time",
                        alt: "Use with caution!",
                        default: true,
                        show: true
                    },
                    {
                        type: "slider",
                        name: "Dont skip after time",
                        timer: true,
                        min: "5000",
                        max: "60000",
                        alt: "This will be how long it will take for someone to be confirmed safe for work so auto skip doesn't skip them when you get speaking",
                        default: 15000,
                        show: true
                    },
                    {
                        type: "bool",
                        name: "Send anti-masturbatory message on autoskip",
                        alt: "This will just send a funny message to make the stranger contemplate their life choices and hopefully stop using omegle to get off",
                        default: true,
                        show: true
                    }
                ]
            },
            {
                name: "Scan Delays",
                description: "This determines how quickly the strangers video feed gets scanned for nudity, adjust them to make it easier on your CPU",
                advanced: true,
                show: true,
                vars: [
                    {
                        type: "slider",
                        name: "Normal Delay",
                        timer: true,
                        alt: "This will be the interval in scanning the strangers video when the nudity score is below the threshold",
                        min: "50",
                        max: "15000",
                        default: 3000,
                        show: true
                    },
                    {
                        type: "bool",
                        name: "Enable Quick Delay",
                        alt: "This will determine whether or not the quick delay is used",
                        default: true,
                        show: true
                    },
                    {
                        type: "slider",
                        name: "Quick Delay",
                        timer: true,
                        alt: "This will be the interval in scanning the strangers video when the nudity score is above the threshold",
                        min: "50",
                        max: "15000",
                        default: 500,
                        show: true
                    },
                    {
                        type: "slider",
                        name: "Threshold",
                        min: "-80",
                        max: "95",
                        alt: "This will determine at what point the stranger's video will be scanned with the quick delay",
                        default: 20,
                        show: true
                    },
                ]
            },
            {
                name: "Misc",
                description: "Other Settings",
                show: true,
                vars: [
                    {
                        type: "bool",
                        name: "Display nudity score",
                        alt: "The nudity score is the number shown over the strangers video",
                        default: true,
                        show: true
                    }/*,
                    {
                        type: "bool",
                        name: "Send Cockblocker Promotional Message On Skip",
                        alt: "whenever you skip, a message will be sent promoting this extension when this setting is enabled"
                    }*/
                ]
            }
        ],
        domName: ".videoSettings"
    },
    "text": {
        inputs: [
            {
                name: "Message On Connect",
                description: "This will be the message that gets sent to the stranger when you connect",
                advanced: false,
                show: true,
                vars: [
                    {
                        type: "bool",
                        name: "Send a message on connect",
                        alt: "When this is on, the message will be sent on connect",
                        default: false,
                        show: true
                    },
                    {
                        type: "text",
                        name: "Message to send on connect",
                        alt: "This is the message to be sent on connect",
                        default: "Hi",
                        show: true
                    },
                    {
                        type: "slider",
                        name: "Delay to send message",
                        timer: true,
                        min: 0,
                        max: 5000,
                        alt: "This is how long it will take for your message to send after you have connected",
                        default: 2500,
                        show: true
                    }
                ]
            },
            {
                name: "Auto Skip",
                description: "This will attempt to automatically skip bots (click the bar to stop the timer)",
                advanced: false,
                show: true,
                vars: [
                    {
                        type: "bool",
                        name: "Bots",
                        alt: "This tries to predict whether or not the stranger is a bot",
                        default: true,
                        show: false
                    },
                    {
                        type: "bool",
                        name: "Horny Guys",
                        alt: "This will skip the horny guys looking for girls, who start with their gender",
                        default: false,
                        show: false
                    },
                    {
                        type: "bool",
                        name: "Auto Skip On Stranger AFK",
                        alt: "If the stranger doesn't reply/start typing within a time, they will be skipped",
                        default: false,
                        show: true
                    },
                    {
                        type: "slider",
                        name: "Auto Skip On Stranger AFK Delay",
                        alt: "This is how long the stranger has to start typing/send their message before they are automatically skipped",
                        timer: true,
                        min: 2500,
                        max: 20000,
                        default: 8000,
                        show: true
                    },
                    {
                        type: "bool",
                        name: "Enable Cancel AutoSkip Timer Bar",
                        alt: "This is the bar that is in the chat that goes down to indicate when the stranger is going to be skipped",
                        default: true,
                        show: true
                    }
                ]
            },
            {
                name: "Auto Refind",
                description: "Whenever the chat ends, this (if enabled) will find another chat",
                advanced: false,
                show: true,
                vars: [
                    {
                        type: "bool",
                        name: "Enable",
                        alt: "Whenever the chat ends, this will start another chat",
                        show: true,
                        default: false
                    },
                    {
                        type: "slider",
                        name: "Maximum amount of messages to auto skip after",
                        alt: "If you've had a long chat, this will let you manually refind and give you the option to save it",
                        show: true,
                        timer: false,
                        default: 6,
                        min: 2,
                        max: 20
                    }
                ]
            },
            {
                name: "Auto Reply",
                description: "This will automatically reply to people, dependent on what they say",
                advanced: false,
                show: false,
                vars: [
                    {
                        type: "bool",
                        name: "Reply when asked age",
                        alt: "This will reply whenever you are asked your age",
                        default: false,
                        show: false
                    },
                    {
                        type: "text",
                        name: "Age",
                        alt: "this will be replied whenever your asked your age",
                        default: 0,
                        show: false
                    }
                ]
            },
            {
                name: "Auto Save Chats",
                description: "This will automatically save your text chats!",
                advanced: false,
                show: false,
                vars: [
                    {
                        type: "bool",
                        name: "Save Chats",
                        alt: "This will toggle the chat auto save",
                        default: false,
                        show: true
                    },
                    {
                        type: "slider",
                        name: "Minimum amount of messages to save a chat",
                        alt: "If this number of messages is passed, the chat will be saved",
                        show: true,
                        default: 5,
                        min: 0,
                        max: 30
                    }
                ]
            }
        ],
        domName: ".textSettings"
    }
};
var defaultSettings = createDefaultSettings(adjustableSettings);

var sendUpdatedSettings = [];

var target = {};
var handler = {
    set: function (target, prop, newval) {
        sendUpdatedSettings.forEach(client => {
            try {
                client({ settings: newval });
            } catch (e) {
                console.log("err sending updated settings to client");
            }
            sendUpdatedSettings = [];
        });
    }
};
var proxy = new Proxy(target, handler);
chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([
            {
                // fires when "www.omegle.com" is opened
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { hostEquals: 'www.omegle.com' },
                    })
                ],
                // And shows the extension's page action.
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
    //if(debug) chrome.storage.sync.set(chrome.storage.sync.set({"settings": defaultSettings}));
    chrome.storage.sync.get('settings', function (data) {
        if (data.settings) {
            currentSettings = recursiveKeyUpdater(data.settings, defaultSettings);
        } else {
            currentSettings = defaultSettings;
        }
        chrome.storage.sync.set({ "settings": currentSettings }, function () {
            console.log('Settings Set:' + JSON.stringify(currentSettings));
        });
    });
    getUpdatedBotMSGS();
});

chrome.webRequest.onBeforeRequest.addListener(
    function () {
        return { redirectUrl: chrome.runtime.getURL("JS/injected/omegle.js") }
        //return {cancel: true};
    },
    {
        urls: ["*://*.omegle.com/static/omegle.js*"]
    },
    ["blocking"]
);
chrome.runtime.onConnect.addListener(function (port) {
    console.log("Connected!");
    getUpdatedBotMSGS();
    /*if(!currentSettings){
        chrome.storage.sync.get('settings', function(data) {
            port.postMessage({settings: data.settings, adjustableSettings: adjustableSettings});
            currentSettings = data.settings;
        });
    } else {
        port.postMessage({settings: currentSettings, adjustableSettings: adjustableSettings});
    }*/
    port.onMessage.addListener(function (request) {
        console.log(JSON.stringify(request));
        switch (request.action) {
            case "get settings":
                if (!currentSettings) {
                    chrome.storage.sync.get('settings', function (data) {
                        data.settings.nsfwJSmodelURL = chrome.runtime.getURL("/JS/nudeJS-model/");
                        port.postMessage({ settings: data.settings, adjustableSettings: adjustableSettings });
                    });
                } else {
                    port.postMessage({ settings: currentSettings, adjustableSettings: adjustableSettings });
                }
                break;
            case "set settings":
                chrome.storage.sync.set({ "settings": request.settings }, function () {
                    currentSettings = request.settings;
                    proxy.settings = request.settings;
                });
                break;
            case "get bot messages":
                chrome.storage.local.get('textMsgs', (o) => {
                    port.postMessage({ textMsgs: o.textMsgs });
                });
                break;
            case "set bot messages":
                chrome.storage.local.set({ "textMsgs": request.textMsgs });
                break;
        }
    });
});

chrome.runtime.onMessageExternal.addListener(async function (request, sender, sendResponse) {
    switch (request.action) {
        case "get start settings":
            chrome.storage.sync.get('settings', function (data) {
                data.settings.nsfwJSmodelURL = chrome.runtime.getURL("/JS/injected/nudeJS-model/");
                sendResponse(data);
            });
            break;
        case "set settings":
            chrome.storage.sync.set({ "settings": request }, function () {
                sendResponse("done");
            });
            break;
        case "get updated settings":
            sendUpdatedSettings.push(sendResponse);
            return true;
            break;
        case "send bot msgs":
            manageBotMessages([request.data], false);
            //addMSGStoCache(request.data);
            //sendBotMSGS(request.data);
            break;
        case "get bot messages":
            chrome.storage.local.get('textMsgs', function (data) {
                sendResponse(data.textMsgs);
            });
            break;
        case "update bot msgs":
            break;
        case "get web pages":
            console.log("Got web pages request!");
            sendResponse(
                {
                    "popup": chrome.runtime.getURL("popup.html"),
                    "options": chrome.runtime.getURL("options.html"),
                    "botMessages": chrome.runtime.getURL("botMessages.html")
                }
            );
            break;
    }
});

async function sendBotMSGS(data) {// sends *data* to the server

    data.forEach((x, index) => {
        data[index] = {
            "Report_Type": x.Report_Type,
            "Last_Active": x.Last_Active,
            "Messages_Recieved": x.Messages_Recieved,
            "Messages_Recieved_Timing": x.Messages_Recieved_Timing
        };
    });

    while (data.length > 25) { // max dynamoDB batch write size, must reoccour to add
        await sendBotMSGS(data.slice(0, 24));
        data = data.slice(25);
    }
    let params = {
        submitReport: true,
        Items: data
    };
    return new Promise((resolve, reject) => {
        try {
            fetch(apiURL, { method: 'POST', body: JSON.stringify(params) }).then(r => r.json()).then(r => {
                resolve(r);
                console.log(r);
            });
        } catch (e) {
            reject(e);
        }

    });

}
function getUpdatedBotMSGS() {
    chrome.storage.local.get('textMsgs', (o) => {
        if (!!o.textMsgs) { // if o is not 'undefined'
            if (o.textMsgs.lastUpdated) {
                if (o.textMsgs.lastUpdated > Date.now() - textMsgsUpdateFrequency) return;
            }
        }

        fetch(apiURL, { method: 'GET' }).then(r => r.json()).then(r => {
            manageBotMessages(r.reportedMessages, true);
        });
    });
}
function recursiveKeyComparitor(oldOBJ, newOBJ) {
    var oldKeys = Object.keys(oldOBJ);
    var newKeys = Object.keys(newOBJ);
    if (JSON.stringify(oldKeys) != JSON.stringify(newKeys)) return false;
    for (var i = 0; i < oldKeys.length; i++) {
        var key = oldKeys[i];
        if (typeof (oldOBJ[key]) == "object") {
            if (!recursiveKeyComparitor(oldOBJ[key], newOBJ[key])) {
                return false;
            }
        }
    }
    return true;
}
function recursiveKeyUpdater(oldOBJ, newOBJ) {
    var returnedOBJ = {};
    var newKeys = Object.keys(newOBJ);
    for (var i = 0; i < newKeys.length; i++) {
        if (typeof (newOBJ[newKeys[i]]) == "object") {
            if (typeof (oldOBJ[newKeys[i]]) != "undefined") {
                returnedOBJ[newKeys[i]] = recursiveKeyUpdater(oldOBJ[newKeys[i]], newOBJ[newKeys[i]]);
            } else {
                returnedOBJ[newKeys[i]] = newOBJ[newKeys[i]];
            }
        } else if (typeof (oldOBJ[newKeys[i]]) != "undefined") {
            returnedOBJ[newKeys[i]] = oldOBJ[newKeys[i]];
        } else {
            returnedOBJ[newKeys[i]] = newOBJ[newKeys[i]];
        }
    }
    return returnedOBJ;
}
function createDefaultSettings(adjustableSettings) {
    var returnedOBJ = {};
    var keys = Object.keys(adjustableSettings);
    for (var i = 0; i < keys.length; i++) {
        returnedOBJ[keys[i]] = {};
        var inputs = adjustableSettings[keys[i]].inputs;
        for (var j = 0; j < inputs.length; j++) {
            returnedOBJ[keys[i]][inputs[j].name] = {};
            var vars = inputs[j].vars;
            for (var x = 0; x < vars.length; x++) {
                returnedOBJ[keys[i]][inputs[j].name][vars[x].name] = vars[x].default;
            }
        }
    }
    return returnedOBJ;
}
function manageBotMessages(newMessages, external, updating) {
    chrome.storage.local.get('textMsgs', async (o) => {
        if (!o.textMsgs) {
            o.textMsgs = { reportedMessages: [], lastUpdated: Date.now() };
        } else {
            o.textMsgs.reportedMessages.forEach((msg, index, arr) => {
                if (msg.Last_Active < Date.now() - bot_msg_expiration && !msg.local) {
                    arr.splice(index, 1);
                }
            });
        }
        if (newMessages) {
            if (external) {
                o.textMsgs.lastUpdated = Date.now();
                newMessages.forEach((msg, index, arr) => {
                    arr[index].local = false;
                    if (arr[index].Txt) {
                        arr[index].Messages_Recieved = arr[index].Txt;
                        delete arr[index].Txt;
                    }

                    if (o.textMsgs.reportedMessages.find(x => x.Messages_Recieved == arr[index].Messages_Recieved)) {
                        arr.splice(index, 1);
                    }
                });
            } else {
                newMessages.forEach((msg, index, arr) => {
                    arr[index].local = true;
                    arr[index].sentToServer = false;
                });
                let unsentLocalMessages = o.textMsgs.reportedMessages.filter(msg => msg.local && !msg.sentToServer);
                if (unsentLocalMessages.length >= 10) {
                    await sendBotMSGS(unsentLocalMessages);
                    o.textMsgs.reportedMessages.forEach((msg, index, arr) => {
                        if (!msg.sentToServer) arr[index].sentToServer = true;
                    });
                }
            }
            newMessages.forEach((msg, index, arr) => {
                arr[index].enabled = true;
                arr[index].timesEncountered = 0;
            });
            console.log({ messagesPushed: newMessages });
            o.textMsgs.reportedMessages.push(...newMessages);
            createArrEquals();
            o.textMsgs.reportedMessages = o.textMsgs.reportedMessages.filter((messages, index, self) =>
                index === self.findIndex((t) => (
                    t.Messages_Recieved.equals(messages.Messages_Recieved)
                ))); // keeps them unique
        }
        chrome.storage.local.set({ 'textMsgs': o.textMsgs });
    });
}
function setLocalMsgsToUnsent() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('textMsgs', async (o) => {
            o.textMsgs.reportedMessages.forEach((msg, index, arr) => {
                if (msg.sentToServer && msg.local) arr[index].sentToServer = false;
            });
            chrome.storage.local.set({ 'textMsgs': o.textMsgs }, () => { resolve() });
        });
    });
}
function sendMessagesToServer() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('textMsgs', async (o) => {
            let unsentLocalMessages = o.textMsgs.reportedMessages.filter(msg => msg.local && !msg.sentToServer);
            await sendBotMSGS(unsentLocalMessages).catch(e => reject(e));
            o.textMsgs.reportedMessages.forEach((msg, index, arr) => {
                if (!msg.sentToServer) arr[index].sentToServer = true;
            });
            chrome.storage.local.set({ 'textMsgs': o.textMsgs });
            resolve(unsentLocalMessages);
        });
    });
}
function getAllBotMessages() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('textMsgs', async (o) => {
            resolve(o);
        });
    });
}
function getUnsentReportedMessages() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('textMsgs', async (o) => {
            let unsentLocalMessages = o.textMsgs.reportedMessages.filter(msg => msg.local && !msg.sentToServer);
            resolve(unsentLocalMessages);
        });
    });
}
function createArrEquals() {
    if (Array.prototype.equals) return; // if it exists, dont run

    Array.prototype.equals = function (array) {
        // if the other array is a falsy value, return
        if (!array)
            return false;

        // compare lengths - can save a lot of time 
        if (this.length != array.length)
            return false;

        for (var i = 0, l = this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array[i]))
                    return false;
            }
            else if (this[i] != array[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    }
    // Hide method from for-in loops
    Object.defineProperty(Array.prototype, "equals", { enumerable: false });
} // credits to https://stackoverflow.com/a/14853974
function addBotMessage(data) {
    chrome.storage.local.get('textMsgs', (o) => {
        if (!Array.isArray(o.textMsgs.reportedMessages)) o.textMsgs.reportedMessages = [];
        data.local = true;
        data.sentToServer = false;
        chrome.storage.local.set({ 'textMsgs': o.textMsgs });
    });

} // obsolete
function addMSGStoCache(data) {
    chrome.storage.local.get('reportedMSGS', (o) => {
        if (!Array.isArray(o.reportedMSGS)) o.reportedMSGS = [];
        o.reportedMSGS.push(data);
        if (o.reportedMSGS.length >= 10) {
            sendBotMSGS(o.reportedMSGS);
            chrome.storage.local.set({ 'reportedMSGS': [] });
        } else {
            chrome.storage.local.set({ 'reportedMSGS': o.reportedMSGS });
        }
    });
} // obsolete
function sendMSGScache() { // testing func
    chrome.storage.local.get('reportedMSGS', (o) => {
        sendBotMSGS(o.reportedMSGS).then((r) => {
            chrome.storage.local.set({ 'reportedMSGS': [] });
            if (r.botMSGS) {
                r.lastUpdated = Date.now();
                chrome.storage.local.set({ 'textMsgs': r.botMSGS });
            }
        });
    });
} // obsolete