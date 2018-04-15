(function() {
    const key = 'other keyyyyyyyyyyyyyy';
    const __local_key = '__local_key';
    chrome.storage.local.set({__local_key: key}, function() {
        console.log('Value is set to ' + key);
    });
  })();