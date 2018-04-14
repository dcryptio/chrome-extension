// function str2ab(str) {
//   var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
//   var bufView = new Uint16Array(buf);
//   for (var i=0, strLen=str.length; i < strLen; i++) {
//     bufView[i] = str.charCodeAt(i);
//   }
//   return buf;
// }

var requestBodies = {};

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
      var newRawBody = "";
      // for( var k in body ) {
      //   newRawBody += `&${k}=${}`
      // }
      requestBodies[details.requestId] = JSON.stringify(body);
      // details.requestBody = body;
    }

      // for (var i = 0; i < details.requestHeaders.length; ++i) {
      //     if (details.requestHeaders[i].name === 'User-Agent') {
      //     details.requestHeaders.splice(i, 1);
      //     break;
      //     }
      // }
      // return {requestHeaders: details.requestHeaders};
      return {};
  },
  {urls: ["https://www.facebook.com/webgraphql/mutation/*"]},
  ["blocking", 'requestBody']);

  chrome.webRequest.onBeforeSendHeaders.addListener(
      function(details) {
          if (details.initiator.indexOf('chrome-extension') != -1 ){
            return {};
          }
          if ( details.method === 'POST' && requestBodies[details.requestId] != null ) {

            console.log(details.requestHeaders);
            var headers = details.requestHeaders.reduce((object, header) => Object.assign(object, { [header.name]: header.value }), {});
            // var headers = {};
            headers["Content-Type"] = "application/json";

            console.log(headers);
            console.log(requestBodies[details.requestId]);

            fetch(details.url,{
                headers: headers,
                method: "POST",
                body: requestBodies[details.requestId]
            })
            .then(console.log)
            .catch(console.error);

            // var xmp = new XMLHttpRequest();
            // xmp.open("POST", details.url, true);
            // for (var header in details.requestHeaders) {
            //   xmp.setRequestHeader(header, details.requestHeaders[header]);
            // }
            // xmp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
            // xmp.onreadystatechange = function() {
            //   console.log(xmp.response);
            // }
            // xmp.send(requestBodies[details.requestId]);
            // console.log(xmp);

            delete requestBodies[details.requestId];

            return {cancel: true}
          }
    
          // for (var i = 0; i < details.requestHeaders.length; ++i) {
          //     if (details.requestHeaders[i].name === 'User-Agent') {
          //     details.requestHeaders.splice(i, 1);
          //     break;
          //     }
          // }
          // return {requestHeaders: details.requestHeaders};
          return {};
      },
      {urls: ["https://www.facebook.com/webgraphql/mutation/*"]},
      ["blocking", 'requestHeaders']);