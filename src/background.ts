var requestBodies = {};
var requestHeaders = [];

chrome.webRequest.onBeforeRequest.addListener(
// chrome.webRequest.onBeforeSendHeaders.addListener(  
  function(details) {
    if (details.initiator.indexOf('chrome-extension') != -1 ){
      return {};
    }
    if (details.method === 'POST' && details.requestBody.raw != null) {
      var rawBody = decodeURIComponent(String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[0].bytes)));
      var body = JSON.parse(rawBody.replace(/^(\w+)=/,'{"$1":').replace(/&(\w+)=([^&$]+)/g, ',"$1":"$2"') + "}");
      body.variables.input.message.text = "NONONONONONONONO!!";
      var newRawBody = `variables=${JSON.stringify(body.variables)}`;
      Object.keys(body).forEach( (key) => {
        if (key != 'variables'){
          newRawBody += `&${key}=${body[key]}`
        }
      })
      console.log(newRawBody);
      requestBodies[details.requestId] = newRawBody;
    }
      return {};
  },
  {urls: ["https://www.facebook.com/webgraphql/mutation/*"]},
  ["blocking", 'requestBody']);

  chrome.webRequest.onBeforeSendHeaders.addListener(
      function(details) {
        console.log(details);
          if (details.initiator.indexOf('chrome-extension') != -1 ){
            while (details.requestHeaders.length > 0) details.requestHeaders.pop();
            var newHeaders = requestHeaders.pop()
            return {requestHeaders: newHeaders};
          }
          if ( details.method === 'POST' && requestBodies[details.requestId] != null ) {

            var headers = details.requestHeaders.reduce((object, header) => Object.assign(object, { [header.name]: header.value }), {});
            requestHeaders.push(JSON.parse(JSON.stringify(details.requestHeaders)));
            var request = {headers: headers, method: "POST", body: requestBodies[details.requestId]};
            var url = details.url;

            console.log('sending new request');
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {url, request})
            });

            // delete requestBodies[details.requestId];

            return {cancel: true}
          }

          return {};
      },
      {urls: ["https://www.facebook.com/webgraphql/mutation/*"]},
      ["blocking", 'requestHeaders']);

// chrome.webRequest.onBeforeSendHeaders.addListener(
//   function(details) {
//           console.log(details.requestHeaders);
//   },
//   {urls: ["https://www.facebook.com/webgraphql/mutation/*"]},
//   ['requestHeaders']);