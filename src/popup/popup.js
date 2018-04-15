let opcion = document.getElementById('opcion1');
opcion.onclick = function(element) {
    chrome.tabs.executeScript(
        {file: 'out/src/commands/opcion.js'}
    );
};