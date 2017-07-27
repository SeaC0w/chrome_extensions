
// blocking code, currently shows BLOCK alert before canceling request
chrome.storage.sync.get({
  sites: []
}, function(items) {
  var blocks = [];
  for (item in items.sites) {
    blocks.push("*://" + items.sites[item] + "/*");
  }
  //webRequest functionality still a little hazy
  chrome.webRequest.onBeforeRequest.addListener(
          function(details) {
            if (blocks[0]) {
                alert("BLOCK");
                return {cancel: true};
            }
            else {
              return {cancel: false};
            }
          },
          {urls: blocks},
          ["blocking"]);
});
