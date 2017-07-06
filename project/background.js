
//blocking code
chrome.storage.sync.get({
  sites: []
}, function(items) {
  var blocks = [];
  for (item in items.sites) {
    blocks.push("*://" + items.sites[item] + "/*");
  }
  console.log(blocks)
  chrome.webRequest.onBeforeRequest.addListener(
          function(details) { return {cancel: true}; },
          {urls: blocks},
          ["blocking"]);
});

// chrome.webRequest.onBeforeRequest.addListener(
//         function(details) { return {cancel: true}; },
//         {urls: ["*://www.facebook.com/*", "*://www.reddit.com/*"]},
//         ["blocking"]);
