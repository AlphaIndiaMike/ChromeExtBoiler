chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "extract") {
      let scripts = document.getElementsByTagName('script');
      for (let script of scripts) {
        let match = script.textContent.match(/showInstrumentInChart\(\$\("#chart1"\),\s*"(\d+)"/);
        if (match) {
          let instrumentId = match[1];
          navigator.clipboard.writeText(instrumentId).then(function() {
            alert('Instrument ID ' + instrumentId + ' copied to clipboard!');
          }, function() {
            alert('Failed to copy instrument ID to clipboard.');
          });
          break;
        }
      }
    }
  });