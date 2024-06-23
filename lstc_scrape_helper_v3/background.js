function updateExtensionState(tab) {
  if (tab.url && tab.url.startsWith("https://www.ls-tc.de/en/stock/")) {
    chrome.action.setTitle({tabId: tab.id, title: "Extract LS-TC Instrument Info"});
    return true;
  } else {
    chrome.action.setTitle({tabId: tab.id, title: "This extension only works on LS-TC stock pages"});
    return false;
  }
}

function executeContentScript(tabId) {
  chrome.scripting.executeScript({
    target: {tabId: tabId},
    files: ['content.js']
  });
}

chrome.action.onClicked.addListener((tab) => {
  if (updateExtensionState(tab)) {
    executeContentScript(tab.id);
  }
});

// Update the extension state and potentially execute when a tab becomes visible
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (updateExtensionState(tab)) {
      executeContentScript(tab.id);
    }
  });
});

// Handle tab updates (e.g., when URL changes)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    if (updateExtensionState(tab)) {
      executeContentScript(tabId);
    }
  }
});