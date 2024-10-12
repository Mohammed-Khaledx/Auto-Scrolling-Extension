let activeScroll = false;


let scroll = false;
let scrollAmount = 0;
let currentPosition;
let lastPosition;

function handleDoubleClick(e) {
  currentPosition = e.clientY;
  scrollAmount = 0;
  lastPosition = currentPosition;
  document.addEventListener("mousemove", (p) => {
    currentPosition = p.clientY;
    // console.log(currentPosition - lastPosition);
    scrollAmount = (currentPosition - lastPosition) / 10;
  });
  autoScroll();
}
//
function autoScroll() {
  if (!scroll) {
    return;
  }
  window.scrollBy(0, scrollAmount);
  requestAnimationFrame(autoScroll);
}


// double click listener
document.addEventListener("dblclick", function (e) {
  if (activeScroll) {
    scroll = !scroll;
    handleDoubleClick(e);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message.action);
  if (message.action === "disable") {
    activeScroll = false;
  } else if (message.action === "enable") {
    activeScroll = true;
  }
});
