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

chrome.commands.onCommand.addListener((command) => {

  //Cntr-Shift-S
  if (command === 'trigger_select') {
    //chrome.tabs.executeScript(null, {file: 'component.js'});
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, "trigger_select");  
    });
  }
  
  //Cntr-Shift-U
  if (command === 'get_screenshot') {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, "get_screenshot");  
    });
  }
});

chrome.alarms.onAlarm.addListener(() => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, "stop-video-recording");  
  });
})