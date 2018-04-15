let chrome = window['chrome'];

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        console.log('message incoming');
        if (sender.tab == null){
            console.log(message.request);
            fetch(message.url, message.request)
                .then(console.log)
                .catch(console.error);
        }
    }
);