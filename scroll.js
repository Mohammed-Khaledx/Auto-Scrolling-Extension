document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggle-btn");
  const label = document.querySelector(".label");

  toggleBtn.addEventListener("click", () => {
    const isActive = toggleBtn.classList.contains("active");

    if (isActive) {
      // toggleBtn.textContent = "Start Auto Scroll";
      label.textContent = "Disabled";
      toggleBtn.classList.remove("active");
      toggleBtn.classList.add("inactive");
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabId = tabs[0].id;
        chrome.scripting.executeScript(
          {
            target: { tabId: tabId },
            files: ["content.js"],
          },
          () => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "disable" });
          }
        );
      });
    } else {
      label.textContent = "Enabled";
      toggleBtn.classList.remove("inactive");
      toggleBtn.classList.add("active");
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabId = tabs[0].id;
        chrome.scripting.executeScript(
          {
            target: { tabId: tabId },
            files: ["content.js"],
          },
          () => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "enable" });
          }
        );
      });
    }
  });
});
