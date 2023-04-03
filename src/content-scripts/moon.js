chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('Received message:', request);
    // Handle the message and send a response
    if (request.type === 'get_data') {
      chrome.runtime.sendMessage({ type: "getLivePrice", coinsStr: request.coinsStr }, function(response) {
        console.log( response);
       sendResponse(response);
      });
    }
  });
  
  window.addEventListener("message", function(event) {
    // We only accept messages from this window to itself [i.e. not from any iframes]
    if (event.source != window)
      return;
    if (event.data.type && (event.data.type == "get_data")) {
    //   console.log( event.data.coinsStr);
  
      chrome.runtime.sendMessage({ type: "getLivePrice", coinsStr: event.data.coinsStr }, function(response) {
        window.postMessage({ type: "return_price_to_site", coinsStr: response }, "*");

      });
    } // else ignore messages seemingly not sent to yourself
  }, false);

  window.postMessage({ type: "app_installed_true", text: "" }, "*");
