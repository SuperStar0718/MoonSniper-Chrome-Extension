// import axios from "axios";

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
let token = '';
let BASE_URL = 'https://moonsniper.co/';
chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === "remindme") {
    callNotification();

  }

});
async function callNotification() {
  chrome.cookies.getAll({
    url: BASE_URL
  }, function (cookies) {
    console.log(cookies);
    for (var i = 0; i < cookies.length; i++) {
      if (cookies[i].name == 'token') {
        token = cookies[i].value;
      }

    }
  });


  if (token == '') {
    return false;
  }
  let pricesWs;
  let alerts;
  let user;
  let coinPrice;
  let alerted = [];
  await fetch(BASE_URL + 'api/load-user-alert-list', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(async (response) => {
        console.log(response.user);
        alerts = [];
        let Message = '';
        let coins = '';
        alerts = response.data;
        user = response.user;
        alerts.forEach(elementCoin => {
          coins += elementCoin.data.coin_id + ',';
        });
        await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=USD`, {
            method: 'GET',
          })
          .then(response => response.json())
          .then(response => {
            alerts.forEach(forPrice => {
              if (response[forPrice.data.coin_id] && response[forPrice.data.coin_id].usd) {
                forPrice.data.coindata.current_price = response[forPrice.data.coin_id].usd
              }
            });
          });
        alerts.forEach(element => {
          coinPrice = null;
          let notify = false;
          let notifyPrice = false;
          let notifyVolume = false;
          let notifyROI = false;
          let notifyMCap = false;
          let notifyUnlock = false;
          let notifySentiment = false;

          Message = '';
          if (element.data.min_price != null || element.data.max_price != null) {
            if (element.data.min_price != null && parseFloat(element.data.min_price) > parseFloat(element.data.coindata.current_price)) {
              Message += 'Price is: ' + element.data.coindata.current_price + '$';
              notify = true;
              notifyPrice = true;
            } else
            if (element.data.max_price != null && parseFloat(element.data.max_price) < parseFloat(element.data.coindata.current_price)) {
              Message += 'Price is: ' + element.data.coindata.current_price + '$';
              notify = true;
              notifyPrice = true;
            }
          } else {
            notifyPrice = true;
          }

          if (element.data.min_tradingper24h != null || element.data.max_tradingper24h != null) {
            if (element.data.min_tradingper24h != null && parseFloat(element.data.min_tradingper24h) > parseFloat(element.data.coindata.current_price)) {
              if (notify) {
                Message += ',';
                notify = false;
              }
              Message += 'Volume is: ' + element.data.coindata.current_price.toFixed(2) + '%';
              notify = true;
              notifyVolume = true;
            } else if (element.data.max_tradingper24h != null && parseFloat(element.data.max_tradingper24h) < parseFloat(element.data.coindata.price_change_percentage_24h)) {
              if (notify) {
                Message += ',';
                notify = false;
              }
              Message += 'Volume is: ' + element.data.coindata.price_change_percentage_24h.toFixed(2) + '%';
              notify = true;
              notifyVolume = true;

            }
          } else {
            notifyVolume = true;
          }

          if (element.data.min_roipercentage != null || element.data.max_roipercentage != null) {
            if (element.data.min_roipercentage != null && parseFloat(element.data.min_roipercentage) > parseFloat(element.data.coindata.roi_percentage)) {
              if (notify) {
                Message += ',';
                notify = false;
              }
              Message += 'ROI% is: ' + element.data.coindata.roi_percentage.toFixed(2) + '%';
              notify = true;
              notifyROI = true;
            } else if (element.data.max_roipercentage != null && parseFloat(element.data.max_roipercentage) < parseFloat(element.data.coindata.roi_percentage))

              if (notify) {
                Message += ',';
                notify = false;
              } {
                Message += 'ROI% is: ' + element.data.coindata.roi_percentage.toFixed(2) + '%';
                notify = true;
                notifyROI = true;

              }
          } else {
            notifyROI = true;
          }

          if (element.data.min_marketcap != null || element.data.max_marketcap != null) {

            if (parseFloat(element.data.min_marketcap) > parseFloat(element.data.coindata.market_cap)) {

              if (notify) {
                Message += ',';
                notify = false;
              }
              Message += 'Market Cap is: ' + element.data.coindata.market_cap.toFixed(2) + '$';
              notify = true;
              notifyMCap = true;
            } else if (parseFloat(element.data.max_marketcap) < parseFloat(element.data.coindata.market_cap)) {

              if (notify) {
                Message += ',';
                notify = false;
              }
              Message += 'Market Cap is: ' + element.data.coindata.market_cap.toFixed(2) + '$';
              notify = true;
              notifyMCap = true;

            }
          } else {
            notifyMCap = true;

          }

          if (element.data.min_nextunlock != null || element.data.max_nextunlock != null) {
            if (element.data.min_nextunlock != null && parseFloat(element.data.min_nextunlock) > parseFloat(element.data.coindata.next_unlock_percent_of_tokens)) {

              if (notify) {
                Message += ',';
                notify = false;
              }
              Message += 'Next Unlock Percentage is: ' + element.data.coindata.next_unlock_percent_of_tokens.toFixed(2) + '%';
              notify = true;
              notifyUnlock = true;
            } else if (element.data.max_nextunlock != null && parseFloat(element.data.max_nextunlock) < parseFloat(element.data.coindata.next_unlock_percent_of_tokens)) {

              if (notify) {
                Message += ',';
                notify = false;
              }
              Message += 'Next Unlock Percentage is: ' + element.data.coindata.next_unlock_percent_of_tokens.toFixed(2) + '%';
              notify = true;
              notifyUnlock = true;

            }
          } else {
            notifyUnlock = true;

          }

          if (element.data.min_socialsentiments != null || element.data.max_socialsentiments != null) {
            if (element.data.min_socialsentiments != null && parseFloat(element.data.min_socialsentiments) > parseFloat(element.data.coindata.average_sentiment_change)) {

              if (notify) {
                Message += ',';
                notify = false;
              }
              Message += 'Social Sentiment Change is: ' + element.data.coindata.average_sentiment_change.toFixed(2) + '%';
              notify = true;
              notifySentiment = true;
            } else if (element.data.max_socialsentiments != null && parseFloat(element.data.max_socialsentiments) < parseFloat(element.data.coindata.average_sentiment_change)) {

              if (notify) {
                Message += ',';
                notify = false;
              }
              Message += 'Social Sentiment Change is: ' + element.data.coindata.average_sentiment_change.toFixed(2) + '%';
              notify = true;
              notifySentiment = true;
            }
          } else {
            notifySentiment = true;
          }

          if (notifySentiment && notifyPrice && notifyVolume && notifyROI && notifyMCap && notifyUnlock && notifySentiment) {
            let alertItem = JSON.parse(user.allow_alerts);

            alerted.push({
              id: element.id,
              note: Message
            })

            if (alertItem && alertItem[0] && alertItem[0].CoinAlert) {
              chrome.notifications.create({
                  type: "basic",
                  iconUrl: chrome.runtime.getURL("/assets/logo128.png"),
                  title: element.data.coin_name + " Alert! Priority: " + element.data.priority,
                  message: Message,
                  silent: false
                },
                () => {}
              )
            }

          }

        });
      }

    );
  if (alerted.length > 0) {
    fetch(BASE_URL+'api/add-alerts',
    {
      method: 'POST',
      body: JSON.stringify({data:alerted}),
         headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
    .then(response=>response.json())
    .then(response=>{
      console.log(response);
    })
  }
}