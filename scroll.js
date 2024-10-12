document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container")
  const toggleBtn = document.getElementById("toggle-btn");
  const label = document.querySelector(".label");

  // Retrieve the last state from localStorage
  const lastState = localStorage.getItem("scrollState");

  if (lastState === "enabled") {
  label.textContent = "Enabled";
  toggleBtn.classList.add("active");
  toggleBtn.classList.remove("inactive");
  } else {
  label.textContent = "Disabled";
  toggleBtn.classList.add("inactive");
  toggleBtn.classList.remove("active");
  }

  container.addEventListener("click", () => {
    const isActive = toggleBtn.classList.contains("active");

    if (isActive) {
      // toggleBtn.textContent = "Start Auto Scroll";
      localStorage.setItem("scrollState","Disabled")
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
      localStorage.setItem("scrollState","enabled")

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
