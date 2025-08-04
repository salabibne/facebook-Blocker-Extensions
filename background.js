let blockHour = 20; // Default 8 PM
let blockMinute = 0;
let blockAction = 'white'; // Default action

// Initialize block time and action
chrome.storage.sync.get(['blockHour', 'blockMinute', 'blockAction'], function(data) {
  blockHour = data.blockHour !== undefined ? data.blockHour : 20;
  blockMinute = data.blockMinute !== undefined ? data.blockMinute : 0;
  blockAction = data.blockAction || 'white';
  console.log('Initial settings:', blockHour, ':', blockMinute, 'Action:', blockAction);
});

// Update settings on storage change
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'sync') {
    if (changes.blockHour) {
      blockHour = changes.blockHour.newValue;
      console.log('Block hour updated to:', blockHour);
    }
    if (changes.blockMinute) {
      blockMinute = changes.blockMinute.newValue;
      console.log('Block minute updated to:', blockMinute);
    }
    if (changes.blockAction) {
      blockAction = changes.blockAction.newValue;
      console.log('Block action updated to:', blockAction);
    }
  }
});

// Check if it's blocking time
function isPastBlockTime() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  return currentHour > blockHour || (currentHour === blockHour && currentMinute >= blockMinute);
}

// Handle tab updates
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('facebook.com')) {
    if (isPastBlockTime()) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content.js']
      }, () => {
        if (chrome.runtime.lastError) {
          console.error('Error injecting script into tab', tabId, ':', chrome.runtime.lastError);
        } else {
          console.log('Blocked Facebook tab:', tabId);
        }
      });
    }
  }
});
