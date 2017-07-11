
// Saves options to chrome.storage
function save_sites() {
  var stop = document.getElementById('block').value;
  var sites;
  chrome.storage.sync.get({
    sites: []
  }, function(items) {
    sites = items.sites;
    // checks if requested site is already present
    if ((sites.find(function(item) {
       return (item == stop);
    })) || !(stop)) {
      document.getElementById('status').textContent = 'Site already present.';
      return false;
    }
    sites.push(stop);
    chrome.storage.sync.set({
      sites: sites
    }, function() {
      chrome.tabs.reload();
    });
  });
  return false;
}

// Saves options to chrome.storage, allows for multiple sites
// seems to work, but save_sites() works for sure
function save_sites2() {
  var x = document.getElementById('block').value;
  while (x.includes(" ")){
    x = x.replace(" ", "");
  }
  var arra = x.split(",");
  var sites; var stop;
  chrome.storage.sync.get({
    sites: []
  }, function(items) {
    sites = items.sites;

    if (!(arra[0])) {
      document.getElementById('status').textContent = 'No sites entered.';
      return;
    }
    // --- NEEDS TO BE DONE FOR EACH SITE ---
    // checks if requested site is already present
    for (i in arra) {
      stop = arra[i];
      if ((sites.find(function(item) {
         return (item == stop);
      })) || !(stop)) {
        //never shown due to reload below, fix unknown
        document.getElementById('status').textContent = 'Some sites already present.';
      }
      else {
        sites.push(stop);
      }
    }
    // -------

    chrome.storage.sync.set({
      sites: sites
    }, function() {
      chrome.tabs.reload();
    });
  });
  return false;
}

// Restores list of sites blocked to the options page
// as a checkbox list to allow removal of sites from blocked list
function get_sites() {
  chrome.storage.sync.get({
    sites: []
  }, function(items) {
    document.getElementById('list_sites').innerHTML = '';
    console.log(items.sites);
    for (item in items.sites) {
      // restores sites as checkboxes in case user wants to remove them
      document.getElementById('list_sites').innerHTML +=
       '<input type="checkbox" id="check' +
       item + '" name="bsites"> ' + items.sites[item] + ' <br>';
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

document.addEventListener('DOMContentLoaded', get_sites);
document.getElementById('save').addEventListener('click', save_sites2);
document.getElementById('unblock').addEventListener('click', unblock);
