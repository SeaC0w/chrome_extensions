
// Saves options to chrome.storage
function save_options() {
  var stop = document.getElementById('block').value;
  var sites;
  chrome.storage.sync.get({
    sites: []
  }, function(items) {
    sites = items.sites;
    if (sites.find(function(item) {
       return (item == stop);
    })) {
      document.getElementById('status').textContent = 'Site already present.';
      document.getElementById('block').value = 'www.example.com';
      return;
    }
    sites.push(stop);
    chrome.storage.sync.set({
      sites: sites
    }, function() {
      chrome.tabs.reload();
    });
  });
}

// Restores list of sites blocked to the options page
// as a checkbox list to allow removal of sites from blocked list
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    sites: []
  }, function(items) {
    document.getElementById('list_sites').innerHTML = '';
    for (item in items.sites) {
      document.getElementById('list_sites').innerHTML += '<input type="checkbox" id="check' +
       item + '" name="bsites">' + items.sites[item] + ' <br>';
    }
  });
}

// handles unblocking of selected sites
function unblock() {
  chrome.storage.sync.get({
    sites: []
  }, function(items) {
    var blocked = items.sites;
    var arr = [];
    for (item in blocked) {
      arr.push(document.getElementById('check' + item).checked);
    }
    var track = (arr.length-1);
    for (i=(arr.length-1); i >= 0; i--) {
      if (arr[i] == true) {
        var temp = blocked[track];
        blocked[track] = blocked[i];
        blocked[i] = temp;
        track--;
      }
    }
    for (i = 1; i < (arr.length - track); i++) {
      blocked.pop();
    }
    chrome.storage.sync.set({
      sites: blocked
    }, function() {
      if (arr.length - track == 1){
        document.getElementById('status2').textContent = 'No sites selected.';
      }
      else {
        chrome.tabs.reload();
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('unblock').addEventListener('click', unblock);
