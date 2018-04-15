import * as $ from "jquery";

let chrome = window['chrome'];

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        if (sender.tab == null){
            fetch(message.url, message.request)
                .then(console.log)
                .catch(console.error);
        }
    }
);


function nodeInsertedCallback(event) {
    console.log('called!');
    $('div.userContent._5pbx').each(( idx, el) => {
        let match = el.innerHTML.match(/===(\w+)===.+===(\w+)===.+===(\w+)===/);
        if (match != null){
            let id = match[1];
            let key = match[2];
            let user = match[3];
            chrome.runtime.sendMessage({id, key, user}, response => el.innerText = response.text );
        }
    })
    // [].forEach.call(document.getElementsByClassName('userContent _5pbx'), el => {
    //     let match = el.innerHTML.match(/===(\w+)===.+===(\w+)===.+===(\w+)===/);
    //     if (match != null){
    //         let id = match[1];
    //         let key = match[2];
    //         let user = match[3];
    //         chrome.runtime.sendMessage({id, key, user}, function(response){
    //             el.innerText = response.text;
    //         });
    //     }
    // })
};

// document.addEventListener('DOMNodeInserted', nodeInsertedCallback);
$('document').ready(nodeInsertedCallback);