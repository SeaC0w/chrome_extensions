
// Saves options to chrome.storage
function save_options() {
  var stop = document.getElementById('block').value;
  var sites;
  chrome.storage.sync.get({
    sites: []
  }, function(items) {
    sites = items.sites;
    sites.push(stop);
    console.log(sites);
    chrome.storage.sync.set({
      sites: sites
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    sites: []
  }, function(items) {
    document.getElementById('list_sites').innerHTML = '';
    for (item in items.sites) {
      document.getElementById('list_sites').innerHTML += items.sites[item] + ' <br>';
    }
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
