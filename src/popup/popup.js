
window.onload = async () => {
    var iframe = document.createElement("iframe");
    var loader = chrome.runtime.getURL("popup/loading.gif");
    iframe.style.display = "none";
    iframe.style.height = "100%";
    iframe.style.width = "100%";
    iframe.setAttribute("allow", "");
    iframe.src = "https://moonsniper.co/dashboard?type=extension";
    iframe.id = "moonsniper-iframe";
    var loading = document.createElement("span");
    loading.id = "loading-wrapper";
    // loading.src = loader;
    document.body.appendChild(loading);
    
    setTimeout(function () {
        document.body.appendChild(iframe);
    }, 0);
    if (iframe.attachEvent) {
        iframe.attachEvent("onload", function () {
            handleLoad();
        });
    } else {
        iframe.onload = function () {
            handleLoad();
        };
    }
    
    function handleLoad() {
        iframe.style.display = "block";
        document.querySelector("#loading-wrapper").remove();
    }
  };
  