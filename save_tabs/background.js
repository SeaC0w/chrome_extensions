
chrome.browserAction.onClicked.addListener(
  function() {
    var name = prompt("Enter bookmarks folder name: ", Math.random().toString());
    chrome.tabs.query({currentWindow: true}, function(tabs) {
      chrome.bookmarks.create({'title': name}, function(result) {
        for (item in tabs) {
          alert(item);
          chrome.bookmarks.create({'parentId': result.id,
                                   'title': tabs[item].title,
                                   'url': tabs[item].url});
        }
      });
    });
  });
