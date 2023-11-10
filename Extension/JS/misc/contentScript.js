//alert("hi");

//alert(document ? "invalid" : "valid");

/* 
old libs:
"https://cdn.rawgit.com/adriancooney/console.image/c9e6d4fd/console.image.min.js"
"https://unpkg.com/@tensorflow/tfjs@1.2.8"
"https://unpkg.com/nsfwjs@2.2.0/dist/nsfwjs.min.js"
    chrome.runtime.getURL("JS/libs/glfx.js"),
    chrome.runtime.getURL("JS/libs/draggable.bundle.js")
*/
var libraries = [
    chrome.runtime.getURL("JS/injected/nsfwjs.min.js"),
    chrome.runtime.getURL("JS/injected/mainInjected.js"),
];


libraries.forEach(lib => {
    //console.log(lib);
    var script = document.createElement('script');
    script.src = lib;
    script.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(script);
});

var extensionID = chrome.runtime.getURL("").split("/")[2];

var script = document.createElement('script');
script.innerHTML = `
var extensionID = "${extensionID}";
var debug = false;
var experimental = false;// not sure if i'll use this
`;
(document.head || document.documentElement).appendChild(script);

/*var modelURLPointer = document.createElement('div');
modelURLPointer.setAttribute("id", "modelURL");
modelURLPointer.setAttribute("url", chrome.runtime.getURL("/JS/nudeJS-model/"));
(document.head || document.documentElement).appendChild(modelURLPointer);*/

/*chrome.storage.sync.get('settings', function(data) {
    var settingsScript = document.createElement("script"); // need to change to https://developer.chrome.com/extensions/messaging
    settingsScript.innerHTML = `
    var settings = ${JSON.stringify(data)}
    `;
    (document.head || document.documentElement).appendChild(settingsScript);
}); */

