let activeScroll = false;
let scroll = false;
let scrollAmount = 0;
let currentPosition;
let lastPosition;
let animationFrameId = null;

function handleDoubleClick(e) {
  currentPosition = e.clientY;
  scrollAmount = 0;
  lastPosition = currentPosition;
  
  const handleMouseMove = (p) => {
    currentPosition = p.clientY;
    scrollAmount = (currentPosition - lastPosition) / 10;
  };

  document.body.style.cursor = 'ns-resize';
  document.addEventListener("mousemove", handleMouseMove);
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      scroll = false;
      document.body.style.cursor = 'default';
      document.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    }
  });

  autoScroll();
}

function autoScroll() {
  if (!scroll) {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    document.body.style.cursor = 'default';
    return;
  }
  window.scrollBy(0, scrollAmount);
  animationFrameId = requestAnimationFrame(autoScroll);
}

document.addEventListener("dblclick", function (e) {
  if (activeScroll) {
    scroll = !scroll;
    handleDoubleClick(e);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || !message.action) return;
  
  activeScroll = message.action === "enable";
  scroll = false;
  
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  
  if (!activeScroll) {
    document.body.style.cursor = 'default';
  }
});
