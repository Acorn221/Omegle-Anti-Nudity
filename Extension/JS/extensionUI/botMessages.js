var textMsgs = {};

// create the connection
var port = chrome.runtime.connect();

// request bot messages from "chrome.runtime.onMessageExternal" in /background.js:25
port.postMessage({ action: "get bot messages" });

/*
To set textMsgs back, use:
port.postMessage({action: "set bot messages", textMsgs: textMsgs});
*/

// process reply from "chrome.runtime.onMessageExternal"
port.onMessage.addListener((msg) => {
    textMsgs = msg.textMsgs;
    // debugging the response
    console.log(`got response`);
    console.log(msg);
    init();
});

/*
 
*/
/**
 * This function loops through testMsgs, creates a new html element then adds it to the "messages" class
 * TODO: Finish
 */
function init() {
    // loop through all the text messages
    for (let msg of textMsgs.reportedMessages) {
        let message = document.createElement("div");
        message.classList.add("reportedMessages");
        document.querySelector(".messages").appendChild(message);
        let expandButton = document.createElement("div");
        expandButton.classList.add("expandButton");
        expandButton.innerHTML = "<p>+</p>"; // TODO: remove all innerHTML edits
        message.appendChild(expandButton);
        let localDom = document.createElement("div");
        localDom.classList.add("local");
        localDom.innerText = msg.local ? "Reported by you!" : "Reported by other Users!";
        message.appendChild(localDom);
        //let enableDom = document.createElement("div");
        //enableDom.classList.add("")
        createToggle("Enabled", msg.enabled, () => {
            console.log("hello");
        }, message);
        let messagesContainer = document.createElement("div");
        messagesContainer.classList.add("messagesContainer");
        for (let txt of msg.Messages_Recieved) {
            let txtDom = document.createElement("div");
            txtDom.classList.add("message");
            txtDom.innerText = txt;
            messagesContainer.appendChild(txtDom);
        }
        message.appendChild(messagesContainer);

        //message.innerHTML += JSON.stringify(msg, true, 2);

    }

}


/**
 * Creates a toggle to skip the bot message or not
 * 
 * @param {String} name Name of the toggle
 * @param {Boolean} checked The state of the checkbox
 * @param {function} callback 
 * @param {object} parent 
 */
function createToggle(name, checked, callback, parent) {
    let container = document.createElement("div");
    let optNameDOM = document.createElement("div");
    let labelDOM = document.createElement("label");
    let checkBox = document.createElement("input");
    let toggleSpanDOM = document.createElement("span");

    container.classList.add("toggleContainer");

    optNameDOM.classList.add("optName");
    optNameDOM.innerText = `${name}: `;
    container.appendChild(optNameDOM);

    labelDOM.classList.add("switch");
    container.append(labelDOM);

    checkBox.setAttribute("type", "checkbox");
    labelDOM.appendChild(checkBox);

    toggleSpanDOM.classList.add("toggle");
    labelDOM.appendChild(toggleSpanDOM);
    checkBox.setAttribute("checked", checked);
    //if(callback) checkBox.setAttribute("onchange", callback.name+"()");

    parent.appendChild(container);
    checkBox.onchange = callback;
    //return container;
}