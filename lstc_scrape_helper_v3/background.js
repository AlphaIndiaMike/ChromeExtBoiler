chrome.action.onClicked.addListener((tab) => {
  if (tab.url.startsWith("https://www.ls-tc.de/en/stock/")) {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['content.js']
    });
    chrome.action.setTitle({tabId: tab.id, title: "Extract LS-TC Instrument Info"});
  } else {
    chrome.action.setTitle({tabId: tab.id, title: "This extension only works on LS-TC stock pages"});
  }
});

// Update the extension icon and title when a tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    updateExtensionState(tab);
  }
});

// Update the extension icon and title when a tab is activated
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    updateExtensionState(tab);
  });
});

function updateExtensionState(tab) {
  if (tab.url && tab.url.startsWith("https://www.ls-tc.de/en/stock/")) {
    chrome.action.setTitle({tabId: tab.id, title: "Extract LS-TC Instrument Info"});
  } else {
    chrome.action.setTitle({tabId: tab.id, title: "This extension only works on LS-TC stock pages"});
  }
}