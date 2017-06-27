document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("b1").addEventListener("click", clickedb1);
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("b2").addEventListener("click", clickedb2);
});

function clickedb1() {
  var name = prompt("Enter bookmarks folder name: ", Math.random().toString());
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    chrome.bookmarks.create({'title': name}, function(result) {
      for (item in tabs) {
        chrome.bookmarks.create({'parentId': result.id,
                                 'title': tabs[item].title,
                                 'url': tabs[item].url});
      }
    });
  });
}

function clickedb2() {
  document.getElementById("p1").innerHTML = "Wololo!";
}
