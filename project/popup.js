// event listeners for button clicks
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("b1").addEventListener("click", clickedb1);
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("b2").addEventListener("click", clickedb2);
});

// placeholder button
function clickedb1() {
  document.getElementById("p1").innerHTML = "Wololo!";
}

// accesses options page
function clickedb2() {
  chrome.runtime.openOptionsPage();
}
