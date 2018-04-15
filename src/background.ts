import {encryptMessage, getPersonalKey, generatePersonalKey, decryptPost} from "./encryption/fb-encrypt"

let chrome = window['chrome'];

var requestBodies = {};
var requestHeaders = [];

getPersonalKey()
  .then(key => {
    if (key == undefined || key.name == undefined){
      return generatePersonalKey("testKey");
    }
    return key;
  });

chrome.webRequest.onBeforeRequest.addListener(
// chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    if (details.initiator && details.initiator.indexOf('chrome-extension') != -1 ){
      return {};
    }
    if (details.method === 'POST' && details.requestBody.raw != null) {
      var rawBody = decodeURIComponent(String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[0].bytes)));
      var body = JSON.parse(rawBody.replace(/^(\w+)=/,'{"$1":').replace(/&(\w+)=([^&$]+)/g, ',"$1":"$2"') + "}");
      var originalMessage = body.variables.input.message.text

      encryptMessage(originalMessage).then( encrypted => {
        console.log(encrypted);
        body.variables.input.message.text = encrypted;

        var newRawBody = `variables=${JSON.stringify(body.variables)}`;
        Object.keys(body).forEach( (key) => {
          if (key != 'variables'){
            newRawBody += `&${key}=${body[key]}`
          }
        })
        requestBodies[details.requestId] = newRawBody;
      })
    }
    return {};
  },
  {urls: ["https://www.facebook.com/webgraphql/mutation/*"]},
  ["blocking", 'requestBody']);

  chrome.webRequest.onBeforeSendHeaders.addListener(
      function(details) {
        console.log(details);
        if (details.initiator && details.initiator.indexOf('chrome-extension') != -1 ){
          while (details.requestHeaders.length > 0) details.requestHeaders.pop();
          var newHeaders = requestHeaders.pop()
          return {requestHeaders: newHeaders};
        }

        new Promise( (resolve, reject) => setTimeout(resolve, 2000)).then(() => {
          if ( details.method === 'POST' && requestBodies[details.requestId] != null ) {

            var headers = details.requestHeaders.reduce((object, header) => Object.assign(object, { [header.name]: header.value }), {});
            requestHeaders.push(JSON.parse(JSON.stringify(details.requestHeaders)));
            var request = {headers: headers, method: "POST", body: requestBodies[details.requestId]};
            var url = details.url;

            console.log('message outgoing!');

            chrome.tabs.query({active: true}, function(tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {url, request}, function(response){
                chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
              })
            });
          }
        });
        return {cancel: true}
      },
      {urls: ["https://www.facebook.com/webgraphql/mutation/*"]},
      ["blocking", 'requestHeaders']);


chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    decryptPost(request.id, request.key, request.user)
      .then(text => sendResponse({text}))
      .catch(err => sendResponse("Failed to decrypt message!"))
  });
