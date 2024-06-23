function extractInstrumentInfo() {
  let scripts = document.getElementsByTagName('script');
  let instrumentId = null;
  
  for (let script of scripts) {
    let match = script.textContent.match(/showInstrumentInChart\(\$\("#chart1"\),\s*"(\d+)"/);
    if (match) {
      instrumentId = match[1];
      break;
    }
  }
  
  if (instrumentId) {
    let pageTitle = document.title.trim();
    let jsonData = {
      "symbol": pageTitle,
      "ID": instrumentId
    };
    
    let jsonString = JSON.stringify(jsonData, null, 2);
    
    navigator.clipboard.writeText(jsonString).then(function() {
      alert('JSON data copied to clipboard:\n' + jsonString);
    }, function() {
      alert('Failed to copy JSON data to clipboard.');
    });
  } else {
    alert('No instrument ID found on this page.');
  }
}

// This will be called when the content script is injected by the background script
extractInstrumentInfo();

// This listener is for when the extension is loaded as a content script on page load
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "extract") {
    extractInstrumentInfo();
  }
});