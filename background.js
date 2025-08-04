let blockHour = 20; // Default 8 PM
let blockMinute = 0;
let blockAction = 'white'; // Default action
let isBlocking = false;

// Initialize block time and action immediately and log it
chrome.storage.sync.get(['blockHour', 'blockMinute', 'blockAction'], function(data) {
  blockHour = data.blockHour !== undefined ? data.blockHour : 20;
  blockMinute = data.blockMinute !== undefined ? data.blockMinute : 0;
  blockAction = data.blockAction || 'white';
  console.log('Initial settings:', blockHour, ':', blockMinute, 'Action:', blockAction);
  setupBlocking();
});

// Update settings on storage changes and log it
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'sync') {
    let updated = false;
    if (changes.blockHour) {
      blockHour = changes.blockHour.newValue;
      console.log('Block hour updated to:', blockHour);
      updated = true;
    }
    if (changes.blockMinute) {
      blockMinute = changes.blockMinute.newValue;
      console.log('Block minute updated to:', blockMinute);
      updated = true;
    }
    if (changes.blockAction) {
      blockAction = changes.blockAction.newValue;
      console.log('Block action updated to:', blockAction);
      updated = true;
    }
    if (updated) setupBlocking();
  }
});

// Function to set up or remove blocking based on time
function setupBlocking() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  console.log('Checking time:', currentHour, ':', currentMinute, 'vs', blockHour, ':', blockMinute);

  const shouldBlock = currentHour > blockHour || (currentHour === blockHour && currentMinute >= blockMinute);
  if (shouldBlock && !isBlocking) {
    // Add listener for new tabs
    chrome.tabs.onUpdated.addListener(handleTabUpdate);
    console.log('Added tab update listener for blocking');
    isBlocking = true;
    // Force inject into existing facebook.com tabs
    chrome.tabs.query({ url: '*://*.facebook.com/*' }, function(tabs) {
      tabs.forEach(tab => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
        }, () => {
          if (chrome.runtime.lastError) {
            console.error('Error injecting into existing tab', tab.id, ':', chrome.runtime.lastError);
          } else {
            console.log('Injected into existing tab:', tab.id);
          }
        });
      });
    });
  } else if (!shouldBlock && isBlocking) {
    chrome.tabs.onUpdated.removeListener(handleTabUpdate);
    console.log('Removed tab update listener, blocking disabled');
    isBlocking = false;
  }
}

// Handler for tab updates
function handleTabUpdate(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('facebook.com')) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    }, () => {
      if (chrome.runtime.lastError) {
        console.error('Error injecting script into tab', tabId, ':', chrome.runtime.lastError);
      } else {
        console.log('Injected content script into tab:', tabId);
      }
    });
  }
}

setInterval(setupBlocking, 	60000 );