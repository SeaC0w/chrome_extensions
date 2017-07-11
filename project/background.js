
// blocking code, currently redirects to Wikipedia page for My_Little_Pony
chrome.storage.sync.get({
  sites: []
}, function(items) {
  var blocks = [];
  for (item in items.sites) {
    blocks.push("*://" + items.sites[item] + "/*");
  }
  chrome.webRequest.onBeforeRequest.addListener(
          function(details) {
            // return {cancel: true};
            if (blocks[0]) {
              //chrome.tabs.update({url:
                //"https://en.wikipedia.org/wiki/My_Little_Pony%3A_Friendship_Is_Magic"});
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
