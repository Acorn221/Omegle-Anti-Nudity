var experimental = false;

var isPopup = !!chrome.storage;

var currentPage = null;
var antiPervMSGS = [
    "https://youtu.be/oxCTKIL8OEI",
    "https://youtu.be/z1n9Jly3CQ8",
    "https://youtu.be/MADvxFXWvwE"
];

const externalLinks = [
    { id: "nsfwJSlink", url: "https://github.com/infinitered/nsfwjs", name: "nsfwJS Library" },
    { id: "modelLink", url: "https://github.com/GantMan/nsfw_model/releases", name: "mobilenet_v2_140_224" },
    { id: "iSawYourWilly", url: "https://youtu.be/z1n9Jly3CQ8?t=24", name: "NSPCC: I saw your willy" },
    { id: "noToNonces", url: "https://youtu.be/gw1j_f2_dFg", name: "Callum Adams - NO NONCESENSE" },
    { id: "sexOffenderShuffle", url: "https://www.youtube.com/watch?v=VfCYZ3pks48", name: "Sex Offender Shuffle" },
    { id: "idealsDonateLink", url: "https://bit.ly/3gVVOxM", name: "Donate!" }
];

const classes = [
    "infoTable",
    "backButton",
    "title",
    "videoSettings",
    "introText",
    "info",
    "donate",
    "howToUse",
    "textSettings",
    //    "botMessages"
];
const buttons = [
    { "button name": "videoSettingsButton", "class name": "videoSettings" },
    { "button name": "howToUseButton", "class name": "howToUse" },
    { "button name": "infoButton", "class name": "info" },
    { "button name": "donateButton", "class name": "donate" },
    { "button name": "backButton", "class name": "home" },
    { "button name": "textSettingsButton", "class name": "textSettings" },
    //   { "button name": "botMessagesButton", "class name": "botMessages" }
];
if (isPopup) {
    chrome.storage.sync.get('currentPage', function (data) {
        if (data == undefined) {
            currentPage = "home";
            chrome.storage.sync.set({ "currentPage": "home" });
        } else {
            currentPage = data.currentPage;
            showScreen(data.currentPage);
        }
    });
}


buttons.forEach(button => {
    document.querySelector("#" + button["button name"]).onclick = () => {
        showScreen(button["class name"]);
    };
});

externalLinks.forEach(link => {
    document.querySelector("#" + link.id).onclick = () => {
        if (isPopup) {
            chrome.tabs.create({ url: link.url });
        } else {
            window.open(link.url, "_blank");
        }

    };
});

function showScreen(screen) {
    currentPage = screen;
    if (isPopup) chrome.storage.sync.set({ "currentPage": currentPage });
    switch (screen) {
        case "info":
            showHide(classes, ["info", "backButton"]);
            break;
        case "donate":
            showHide(classes, ["donate", "backButton"]);
            break;
        case "howToUse":
            showHide(classes, ["howToUse", "backButton"]);
            break;
        case "videoSettings":
            showHide(classes, ["videoSettings", "backButton"]);
            break;
        case "home":
            showHide(classes, ["title", "infoTable", "introText"]);
            break;
        case "textSettings":
            showHide(classes, ["textSettings", "backButton"]);
            break;
        case "botMessages":
            showHide(classes, ["botMessages", "backButton"]);
    }
}

function showHide(hideArr, showArr) {
    hideArr.forEach(ele => {
        if (!document.querySelector("." + ele)) return console.log(ele + " INVALID");
        document.querySelector("." + ele).style.display = "none";
    });
    showArr.forEach(ele => {
        if (!document.querySelector("." + ele)) return console.log(ele + " INVALID");
        if (ele == "infoTable") {
            document.querySelector("." + ele).style.display = "";
        } else {
            document.querySelector("." + ele).style.display = "block";
        }
    });
}