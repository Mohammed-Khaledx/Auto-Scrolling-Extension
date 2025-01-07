document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  const toggleBtn = document.getElementById("toggle-btn");
  const label = document.querySelector(".label");

  function updateUI(enabled) {
    label.textContent = `Auto Scrolling ${enabled ? "Enabled" : "Disabled"}`;
    container.classList.toggle("active", enabled);
  }

  function updateState(enabled) {
    const state = enabled ? "enabled" : "disabled";
    localStorage.setItem("scrollState", state);

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["content.js"],
      }, () => {
        chrome.tabs.sendMessage(tabs[0].id, { 
          action: enabled ? "enable" : "disable" 
        });
      });
    });

    updateUI(enabled);
  }

  // Initialize state
  const lastState = localStorage.getItem("scrollState");
  const isEnabled = lastState === "enabled";
  
  if (!lastState) {
    localStorage.setItem("scrollState", "disabled");
  }
  
  updateState(isEnabled);

  container.addEventListener("click", () => {
    const newState = !container.classList.contains("active");
    updateState(newState);
  });
});
