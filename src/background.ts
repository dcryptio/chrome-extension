function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
      if(details.method === 'POST') {
        console.log(details);
        var postedString = decodeURIComponent(String.fromCharCode.apply(null,
          new Uint8Array(details.requestBody.raw[0].bytes)));
        console.log(postedString);
        let i = postedString.indexOf('variables={');
        let j = postedString.indexOf('&__user');
        let variables = JSON.parse(postedString.substring(i+10,j));
        console.log(variables);
        variables.input.message.text = "no postié esto";
        let newVariables = JSON.stringify(variables);
        let newString = postedString.substring(0,i+10) + newVariables + postedString.substring(j);
        console.log(newString);
        // return {requestBody: newString};
        return {cancel: true};
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