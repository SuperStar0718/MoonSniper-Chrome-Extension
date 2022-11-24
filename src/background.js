chrome.action.onClicked.addListener(async tab => {
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { toggleVisible: true });
  }
});

async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log({ tab });
  return tab;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case "POPUP_INIT":
      getCurrentTab().then(sendResponse);
      return true;
    default:
      break;
  }
});


// This is the service worker script, which executes in its own context
// when the extension is installed or refreshed (or when you access its console).
// It would correspond to the background script in chrome extensions v2.

console.log(
    "This prints to the console of the service worker (background script)"
);

// Importing and using functionality from external files is also possible.
//importScripts("service-worker-utils.js");

// If you want to import a file that is deeper in the file hierarchy of your
// extension, simply do `importScripts('path/to/file.js')`.
// The path should be relative to the file `manifest.json`.

const iframeHosts = ["moonsniper.co"];
chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: iframeHosts.map((h, i) => i + 1),
    addRules: iframeHosts.map((h, i) => ({
      id: i + 1,
      condition: {
        domains: [chrome.runtime.id],
        urlFilter: `||${h}/`,
        resourceTypes: ["sub_frame"],
      },
      action: {
        type: "modifyHeaders",
        responseHeaders: [
          { header: "X-Frame-Options", operation: "remove" },
          { header: "Frame-Options", operation: "remove" },
        ],
      },
    })),
  });
});

