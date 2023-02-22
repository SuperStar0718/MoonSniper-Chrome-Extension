import BASE_URL  from "../../base_url";
var alarmName = 'coinalert';

function checkAlarm(callback) {

}

function createAlarm() {

  chrome.alarms.create(alarmName, {
    delayInMinutes: 0.0833333333,
    periodInMinutes: 0.0833333333
  });
}

function cancelAlarm() {
  chrome.alarms.clear(alarmName);
}

function moveAlarm() {
  setCookie();
  chrome.alarms.getAll(function (alarms) {
    var hasAlarm = alarms.some(function (a) {
      return a.name == alarmName;
    });
    if (hasAlarm) {
      // chrome.alarms.clearAll()
      // cancelAlarm();
      console.log('h1')
      // createAlarm();
    } else {
      console.log('h2')
      allowAlarmForUser();
      createAlarm();

    }
  })

}
chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason == "install"){
            chrome.alarms.clearAll()

  }else if(details.reason == "update"){
    console.log('installed');
    chrome.alarms.clearAll()

  }
});
let token = '';

async function setCookie() {
  await chrome.cookies.getAll({
    url: BASE_URL
  }, function (cookies) {
    for (var i = 0; i < cookies.length; i++) {
      if (cookies[i].name == 'token') {
        token = cookies[i].value;
      }

    }
    if (token != '') {
      chrome.storage.local.set({
        'token': token
      }, function () {
        console.log('Token is stored');
      });
      chrome.storage.local.get(['token'], function (result) {
        token = result.token;
      });

    } else {
      chrome.storage.local.set({
        'token': ''
      }, function () {
      });
      setTimeout(() => {
        setCookie();
       }, 5000);
    }
  });
}
async function allowAlarmForUser() {
  console.log('token',token)
  await chrome.cookies.getAll({
    url: BASE_URL
  }, function (cookies) {
    for (var i = 0; i < cookies.length; i++) {
      if (cookies[i].name == 'token') {
        token = cookies[i].value;
      }
    }
  });
  if (token != '') {
   
    let text = "Please Allow Notifications";
      if (confirm(text) == true) {
        fetch(BASE_URL + 'api/allow-coin-alerts', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      }
      chrome.storage.local.set({
        'token': token
      }, function () {
      });
  } else {
      setTimeout(() => {
       allowAlarmForUser();
        
      }, 1000);
  }


}






// let tbutton  = document.getElementById("toggleAlarm");

// tbutton.addEventListener("click", function() {
//   console.log('Toggle Alarm');
//   moveAlarm();
// });
moveAlarm();
