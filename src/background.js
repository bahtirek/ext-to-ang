chrome.action.onClicked.addListener(buttonClicked);
function buttonClicked(tab) {
  chrome.tabs.sendMessage(tab.id, "inject");
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['runtime.js']
  });
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['polyfills.js']
  });
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['main.js']
  });
  console.log('inject background');
}