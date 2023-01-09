var alarmName = 'remindme';
function checkAlarm(callback) {

}
function createAlarm() {

  chrome.alarms.create(alarmName, {
    delayInMinutes: 0.5, periodInMinutes: 0.5 });
}
function cancelAlarm() {
  chrome.alarms.clear(alarmName);
}
function doToggleAlarm() {
  chrome.alarms.getAll(function(alarms) {
    var hasAlarm = alarms.some(function(a) {
      console.log(a.name);
      return a.name == alarmName;
    });
    if (hasAlarm) {
      cancelAlarm();
      console.log("Alarm");
      // createAlarm();
    } else {

      allowAlarmForUser();
      createAlarm();
     
    }   
  })
 
}
let token = '';
let BASE_URL = 'http://localhost:8000/';
function allowAlarmForUser(){
  
    chrome.cookies.getAll({
    url: BASE_URL
  }, function (cookies) {
    console.log(cookies);
    for (var i = 0; i < cookies.length; i++) {
      if (cookies[i].name == 'token') {
        token = cookies[i].value;
      }

    }
    if(token != '')
    {
      let text = "Please Allow Notifications";
        if (confirm(text) == true) {
          fetch(BASE_URL+'api/allow-coin-alerts',
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
          )
        } 
    }else{
      allowAlarmForUser();
    }
  });
}
let tbutton  = document.getElementById("toggleAlarm");

tbutton.addEventListener("click", function() {
  console.log('Toggle Alarm');
  doToggleAlarm();
});
doToggleAlarm();
