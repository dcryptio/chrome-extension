chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        console.log(details);
        for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'User-Agent') {
            details.requestHeaders.splice(i, 1);
            break;
            }
        }
        return {requestHeaders: details.requestHeaders};
    },
    {urls: ["<all_urls>"]},
    ["blocking", "requestHeaders"]);