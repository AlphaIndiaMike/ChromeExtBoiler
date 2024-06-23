## This Chrome extension does the following:

* It adds a browser action (button) to Chrome.
* When the button is clicked, it searches the current page for the showInstrumentInChart function call.
* If found, it extracts the second parameter (the instrument ID).
* It then copies this ID to the clipboard and shows an alert.

## To use this extension:

* Create a new directory for your extension.
* Save each part of the code (manifest.json, background.js, content.js) as separate files in this directory.
* In Chrome, go to chrome://extensions/, enable "Developer mode", and click "Load unpacked".
* Select your extension directory.

## Migration to V3

1. In manifest.json:

* Changed manifest_version to 3.
* Replaced browser_action with action.
* Changed background to use a service_worker instead of scripts.
* Added the scripting permission, which is needed for Manifest V3 to inject scripts.


2. In background.js:

* Changed chrome.browserAction.onClicked to chrome.action.onClicked.
* Instead of sending a message, we now use chrome.scripting.executeScript to inject and run the content script.


3. In content.js:

* Moved the main functionality into a function extractInstrumentId().
* Added a direct call to this function, which will run when the script is injected by the background script.
* Kept the message listener for compatibility with the content script that's loaded on page load.