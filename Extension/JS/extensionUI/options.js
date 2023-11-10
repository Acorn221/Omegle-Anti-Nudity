// initialise the global settings variables
var defaultSettings = null;
var currentSettings = null;
var adjustableSettings = null;

const debug = false;

// connect to the extension background.js port
var port = chrome.runtime.connect();

port.postMessage({ action: "get settings" });

// on reply of settings, set the global variables then initialise 
port.onMessage.addListener(function (msg) {
    if (debug) console.log(`got message: ` + JSON.stringify(msg));
    currentSettings = msg.settings;
    adjustableSettings = msg.adjustableSettings;
    defaultSettings = createDefaultSettings(msg.adjustableSettings);
    init("video");
    init("text");
});

// {blur: {amount: 20, threshold: 40, mouseOverShow: true, mouseOverFadeTime: 2000}, debug: true, 
//autoSkip: {threshold: 70, delay: 4000}, 
//quickRefresh: {normalDelay: 5000, quickDelay: 300, threshold: 35}};
/*
var adjustableSettings = {
    "video":{ 
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
                        default:20,
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
                vars: [
                    {
                        type: "bool",
                        name: "Display nudity score",
                        alt: "The nudity score is the number shown over the strangers video",
                        default: true,
                        show: true
                    },
                    {
                        type: "bool",
                        name: "Send Cockblocker Promotional Message On Skip",
                        alt: "whenever you skip, a message will be sent promoting this extension when this setting is enabled"
                    }
                ]
            }
        ],
        domName: ".videoSettings"
    },
    "text": {
        inputs: [
            {
                name: "Auto Skip",
                description: "This will attempt to automatically skip bots",
                advanced: false,
                show: true,
                vars: [
                    {
                        type: "bool",
                        name: "Auto Skip Bots",
                        alt: "This tries to predict whether or not the stranger is a bot",
                        default: true,
                        show: false
                    },
                    {
                        type: "bool",
                        name: "Skip Horny Guys",
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
                        timer: true,
                        min: 2500,
                        max: 20000,
                        default: 8000,
                        show: true
                    }
                ]
            },
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
                        default: 1000,
                        show: true
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
            }
        ],
        domName: ".textSettings"
    }
};
*/


function init(type) {
    if (debug) console.log("current settings: " + JSON.stringify(currentSettings));
    if (debug) console.log(`Name: ${adjustableSettings[type].domName}, type: ${type}`);
    document.querySelector(adjustableSettings[type].domName).innerHTML = "";
    createSettings(type);
    createDefultSettingsBTN(type);
}


function createDefultSettingsBTN(type) {
    var defaultSettingsBTN = document.createElement("div");
    defaultSettingsBTN.classList.add("defaultSettingsBTN");
    defaultSettingsBTN.innerText = "Revert To Default Settings";
    defaultSettingsBTN.onclick = () => {
        currentSettings[type] = defaultSettings[type];
        setSettings();
        init(type);
    };
    document.querySelector(adjustableSettings[type].domName).appendChild(defaultSettingsBTN);
}
function createSettings(settingType) {
    adjustableSettings[settingType].inputs.forEach(setting => {
        if (debug) console.log(setting.name, setting.show);
        if (setting.show) {
            if (debug) console.log("Setting: " + setting.name);
            var optionDOM = document.createElement("div");
            optionDOM.classList.add("option");
            document.querySelector(adjustableSettings[settingType].domName).appendChild(optionDOM);

            var nameDOM = document.createElement("div");
            var descriptionDOM = document.createElement("div");

            nameDOM.classList.add("name");
            nameDOM.innerText = setting.name;
            descriptionDOM.classList.add("description");
            descriptionDOM.innerText = setting.description;

            optionDOM.appendChild(nameDOM);
            optionDOM.appendChild(descriptionDOM);

            var varsDOM = document.createElement("div");
            varsDOM.classList.add("vars");
            optionDOM.appendChild(varsDOM);
            setting.vars.forEach(input => {
                if (input.show) {
                    switch (input.type) {
                        case "slider":
                            var slideContainerDOM = document.createElement("div");
                            slideContainerDOM.classList.add("slidecontainer");
                            varsDOM.appendChild(slideContainerDOM);
                            var optNameDOM = document.createElement("div");
                            optNameDOM.classList.add("optName");
                            optNameDOM.innerText = `${input.name}: (${input.timer ? ((currentSettings[settingType][setting.name][input.name] / 1000).toFixed(2)) + "s" : currentSettings[settingType][setting.name][input.name]})`;
                            slideContainerDOM.appendChild(optNameDOM);
                            var sliderDOM = document.createElement("input");
                            sliderDOM.oninput = () => {
                                optNameDOM.innerText = `${input.name}: (${input.timer ? ((sliderDOM.value / 1000).toFixed(2)) + "s" : sliderDOM.value})`;
                            };
                            sliderDOM.onchange = () => {
                                currentSettings[settingType][setting.name][input.name] = sliderDOM.value;
                                setSettings();
                            };
                            sliderDOM.setAttribute("type", "range");
                            sliderDOM.setAttribute("min", input.min);
                            sliderDOM.setAttribute("max", input.max);
                            sliderDOM.classList.add("slider");
                            sliderDOM.value = currentSettings[settingType][setting.name][input.name];
                            slideContainerDOM.appendChild(sliderDOM);
                            break;
                        case "bool":
                            var optNameDOM = document.createElement("div");
                            optNameDOM.classList.add("optName");
                            optNameDOM.innerText = `${input.name}: `;
                            varsDOM.appendChild(optNameDOM);
                            var labelDOM = document.createElement("label");
                            labelDOM.setAttribute("title", input.alt);
                            labelDOM.classList.add("switch");
                            varsDOM.append(labelDOM);
                            var checkBox = document.createElement("input");
                            checkBox.setAttribute("type", "checkbox");
                            labelDOM.appendChild(checkBox);
                            var toggleSpanDOM = document.createElement("span");
                            toggleSpanDOM.classList.add("toggle");
                            labelDOM.appendChild(toggleSpanDOM);
                            checkBox.checked = currentSettings[settingType][setting.name][input.name];
                            checkBox.onchange = () => {
                                currentSettings[settingType][setting.name][input.name] = checkBox.checked;
                                setSettings();
                            };

                            break;
                        case "text":
                            var optNameDOM = document.createElement("div");
                            optNameDOM.classList.add("optName");
                            optNameDOM.innerText = `${input.name}: `;
                            varsDOM.appendChild(optNameDOM);
                            var textInput = document.createElement("input");
                            textInput.setAttribute("type", "text");
                            textInput.classList.add("textInput");
                            textInput.value = currentSettings[settingType][setting.name][input.name];
                            textInput.onkeyup = () => {
                                if (debug) console.log("curr setting: " + setting.name + " Input name: " + input.name + " val: " + textInput.value);
                                currentSettings[settingType][setting.name][input.name] = textInput.value;
                                setSettings();
                            };
                            varsDOM.appendChild(textInput);
                            break;
                    }
                }
            });

            if (debug) console.log(optionDOM);
        }
    });
}
function setSettings() {
    /*chrome.storage.sync.set({settings: currentSettings}, function() {
        if(debug) console.log("saved settings: "+JSON.stringify(currentSettings));
        chrome.runtime.sendMessage({settings: currentSettings},
        function (response) {
            if(debug) console.log("recieved: "+response);
        });
    })*/
    port.postMessage({ action: "set settings", settings: currentSettings });
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
/*
button.addEventListener('click', function() {
    chrome.storage.sync.set({color: item}, function() {
      if(debug) console.log('color is ' + item);
    })
});
*/