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

The extension should now appear in your Chrome toolbar. When you're on a page with the target function, click the extension button to extract the instrument ID.

Note: This extension uses Manifest V2, which is being phased out. For a production extension, you'd want to update to Manifest V3, which involves some changes to the structure and permissions.

This solution assumes the function call is present in a script tag on the page. If it's dynamically inserted or part of an external script, you might need a more complex approach.