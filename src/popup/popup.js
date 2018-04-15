console.log('init');

document.getElementById('opcion1').onclick = function (element) {
    chrome.tabs.executeScript({
        file: 'out/src/commands/opcion.js'
    });
};

chrome.storage.local.get(['__local_key'], function (result) {
    document.getElementById('keyholder').value = result.__local_key;
});

document.getElementById('generate').onclick = function (element) {
    var execute = chrome.tabs.executeScript({
            file: 'out/src/commands/generate.js'
        },
        _ => {
            chrome.storage.local.get(['__local_key'], function (result) {
                console.log('Value currently is ' + result.__local_key);
                document.getElementById('keyholder').value = result.__local_key;
            })
        }
    )
};

document.getElementById('share').onclick = function (element) {
    chrome.tabs.executeScript({
        file: 'out/src/commands/share.js'
    });
};