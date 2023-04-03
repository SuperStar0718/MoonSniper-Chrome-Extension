// import axios from "axios";
import BASE_URL from "../base_url";

chrome.action.onClicked.addListener(async tab => {
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, {
      toggleVisible: true
    });
  }
});

async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  console.log({
    tab
  });
  return tab; 
}
let coins = {};
chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
  switch (request.type) {
    case "POPUP_INIT":
      getCurrentTab().then(sendResponse);
      return true;
      case "getLivePrice":
        console.log('called getLivePrice');
         fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${request.coinsStr}&vs_currencies=USD`, {
          method: 'GET',
        })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          coins = response;
           sendResponse({ message:coins});
        });
        // sendResponse({ message:'coins'});

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
        responseHeaders: [{
            header: "X-Frame-Options",
            operation: "remove"
          },
          {
            header: "Frame-Options",
            operation: "remove"
          },
        ],
      },
    })),
  });
});
let tokenId = '';
chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === "coinalert") {
    callNotification();

  }
  console.log("alarm");

});

async function callNotification() { 
  return 0;
   chrome.storage.local.get(['token'], function(result) {
  tokenId = result.token;

if (tokenId == '') {
  return false;
}
let pricesWs;
let alerts;
let user;
let coinPrice;
let alerted = [];
 fetch(BASE_URL + 'api/load-user-alert-list', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${tokenId}`
    }
  })
  .then(response => response.json())
  .then(async (response) => {
    alerts = response.data;
      if (alerts.length > 0) {
        alerts.forEach(element => {
          alerted.push({id:element.id})
          if(element.type == 'App\\Notifications\\NotifyCoinAlert'){
            chrome.notifications.create({
              type: "basic",
              iconUrl: chrome.runtime.getURL("/assets/logo128.png"),
              title: element.data.coin_name + " Alert! Priority: " + element.data.priority,
              message: element.note,
              silent: false
            },
            () => {}
          )
          }else{
            chrome.notifications.create({
              type: "basic",
              iconUrl: chrome.runtime.getURL("/assets/logo128.png"),
              title: element.data.name + " Alert! Priority: High",
              message: element.note,
              silent: false
            },
            () => {}
          )
          }
          
        });
     console.log(alerted);  
      fetch(BASE_URL+'api/mark-alerts',
      {
        method: 'POST',
        body: JSON.stringify({data:alerted}),
          headers: {
          'Authorization': `Bearer ${tokenId}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      })
      .then(response=>response.json())
      .then(response=>{
      })
    }
     
    
    }

  );

  });
 
}