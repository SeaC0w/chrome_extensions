
//blocking code
chrome.storage.sync.get({
  sites: []
}, function(items) {
  var blocks = [];
  for (item in items.sites) {
    blocks.push("*://" + items.sites[item] + "/*");
  }
  chrome.webRequest.onBeforeRequest.addListener(
          function(details) {
            // chrome.tabs.create({"url": "https://www.reddit.com/r/Overwatch/"});
            // return;
            // details.url = "https://en.wikipedia.org/wiki/My_Little_Pony%3A_Friendship_Is_Magic";
            // return {cancel: true};
            chrome.tabs.update({url: "https://en.wikipedia.org/wiki/My_Little_Pony%3A_Friendship_Is_Magic"});
          },
          {urls: blocks},
          ["blocking"]);
});
