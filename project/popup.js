// event listeners for button clicks
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("b1").addEventListener("click", clickedb1);
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("b2").addEventListener("click", clickedb2);
});

// deletes all sites listed to interact with
function clickedb1() {
  chrome.storage.sync.get({
    sites: []
  }, function(items) {
    var sites = items.sites;
    if (sites[0]) {
      chrome.storage.sync.set({
        sites: []
      }, function() {});
      document.getElementById("p1").innerHTML = "Sites reset!";
    }
    else {
      document.getElementById("p1").innerHTML = "No sites to reset!";
      return;
    }
  });
}

// accesses options page
function clickedb2() {
  chrome.runtime.openOptionsPage();
}
