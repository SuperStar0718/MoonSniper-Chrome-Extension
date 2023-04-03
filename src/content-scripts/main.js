import {
  createApp
} from "vue";
import Popup from "./Popup.vue";
import "@/styles/main.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
const MOUNT_EL_ID = "as-awesome-extension";
import BASE_URL from "../../base_url";
let mountEl = document.getElementById(MOUNT_EL_ID);
if (mountEl) {
  mountEl.innerHTML = "";
}
mountEl = document.createElement("div");
mountEl.setAttribute("id", MOUNT_EL_ID);
document.body.appendChild(mountEl);
const vm = createApp(Popup).mount(mountEl);



/////////////////////////////
var option = document.createElement("td");
option.classList = "table-td-moon"
var domain = window.location.href;
let featureBoxRight = [];
if (domain.includes("coingecko.com")) {
  if(domain.includes("coingecko.com/en/coins"))
  {
    featureBoxRight = document.querySelectorAll('[data-controller="coins-information"]');
    let el1 = featureBoxRight[0].querySelectorAll('div div div:nth-child(2)')[0];
    let el2 = featureBoxRight[0].querySelectorAll('div div div:nth-child(2)')[0];
    option.innerHTML = '<span ><img style=" width:40px; cursor: pointer;" class="moon-logo" src="'+BASE_URL+'images/moon/icon/fullcolor.png"></span>';
    option.setAttribute("style", "width: 53px; ")
    el2.prepend(option.cloneNode(true));
    let ab = el1.innerHTML.trim();
    var symbol =ab.match(/\(([^)]+)\)/)[1];
    var specificMoon = el2.getElementsByTagName("span")[0];

    specificMoon.addEventListener('click', triggerPopupSingleCoin, false);
    specificMoon.symbol = symbol;
  }else{
    const elementToDuplicate = document.querySelector('.cg-sticky-col-header');
// Create a new element that is a copy of the original element
    const duplicatedElement = elementToDuplicate.cloneNode(true);
    // Append the new element to the same parent element as the original element
    elementToDuplicate.parentNode.insertBefore(duplicatedElement, elementToDuplicate.parentNode.firstChild);
  featureBoxRight = document.querySelectorAll('div.coin-table tbody tr');
  if (featureBoxRight) {
    for (let i = 0; i < featureBoxRight.length; i++) {

      var symbol = featureBoxRight[i].querySelectorAll('a span')[1].innerHTML.trim();

      option.innerHTML = '<span ><img style=" width:40px; cursor: pointer;" class="moon-logo" src="'+BASE_URL+'images/moon/icon/fullcolor.png"></span>';
      option.setAttribute("style", "width: 53px; ")

      featureBoxRight[i].prepend(option.cloneNode(true));

      //Add data of symbol
      var specificMoon = featureBoxRight[i].getElementsByTagName("span")[0];

      specificMoon.addEventListener('click', triggerPopup, false);
      specificMoon.symbol = symbol;
    }
  }
}
} else if (domain.includes("coinmarketcap.com")) {
  var thHtml = document.createElement("th");
  thHtml.classList = "table-th-moon stickyTop";
  thHtml.innerHTML = "Moon"
  document.querySelector('.cmc-body-wrapper table thead tr').prepend(thHtml.cloneNode(true));


  featureBoxRight = document.querySelectorAll('.cmc-body-wrapper table tbody tr');
  if (featureBoxRight) {
    for (let i = 0; i < featureBoxRight.length; i++) {
      let symbol;
      if (featureBoxRight[i].querySelector('.coin-item-symbol') != null) {
        symbol = featureBoxRight[i].querySelector('.coin-item-symbol').innerHTML.trim();
      } else {
        symbol = featureBoxRight[i].querySelector('.crypto-symbol').innerHTML.trim();
      }
      option.innerHTML = '<span ><img style=" width:40px; cursor: pointer;" class="moon-logo ' + symbol + '" src="'+BASE_URL+'images/moon/icon/fullcolor.png"></span>';
      option.setAttribute("style", "width: 53px; padding-left:0; padding-right:0")
      featureBoxRight[i].prepend(option.cloneNode(true));
      //Add data of symbol
      var specificMoon = featureBoxRight[i].getElementsByTagName("span")[0];

      specificMoon.addEventListener('click', triggerPopup, false);
      if (symbol)
        specificMoon.symbol = symbol;
    }
  }

} else if (domain.includes("dexscreener.com")) {
  featureBoxRight = document.querySelectorAll('.custom-j3hajj a.chakra-link.custom-1oo4dn7');


  if (featureBoxRight) {
    for (let i = 0; i < featureBoxRight.length; i++) {
      var dexSpan = document.createElement("span");
      dexSpan.classList = "table-td-moon chakra-badge custom-1hloedr"
      var symbol = featureBoxRight[i].querySelector('span.chakra-text.custom-q28k12').innerHTML.trim();
      dexSpan.innerHTML = '<span ><img style=" width:40px; cursor: pointer;" class="moon-logo" src="'+BASE_URL+'images/moon/icon/fullcolor.png"></span>';
      dexSpan.setAttribute("style", "width: 53px; padding-left:0; padding-right:0")
      featureBoxRight[i].firstChild.prepend(dexSpan.cloneNode(true));
      var specificMoon = featureBoxRight[i].getElementsByTagName("span")[0];
      specificMoon.addEventListener('click', triggerPopup, false);
      if (symbol)
        specificMoon.symbol = symbol;
    }
  }
  featureBoxRight = document.querySelectorAll('div.coin-table tbody tr');
} else if (domain.includes("binance.com")) {
  if (domain.includes("binance.com/en/markets")) {
    featureBoxRight = document.querySelectorAll('.css-vlibs4');
    if (featureBoxRight) {
      for (let i = 0; i < featureBoxRight.length; i++) {
        let symbol;

        option.innerHTML = '<span ><img style=" width:25px; cursor: pointer;" class="moon-logo ' + symbol + '" src="'+BASE_URL+'images/moon/icon/fullcolor.png"></span>';
        option.setAttribute("style", "width: 25px; padding-left:0; padding-right:0; margin-right: 6px;")
        featureBoxRight[i].firstChild.prepend(option.cloneNode(true));
        var specificMoon = featureBoxRight[i].getElementsByTagName("span")[0];
        specificMoon.addEventListener('click', triggerPopup2, false);

      }
    }
  }

}else if (domain.includes("coinbase.com")) {
  if (domain.includes("coinbase.com/explore")) {
    featureBoxRight = document.querySelectorAll('.cds-table-top40r1 tbody tr');
    if (featureBoxRight) {
      for (let i = 0; i < featureBoxRight.length; i++) {
        let symbol;
        option.innerHTML = '<span ><img style=" width:25px; cursor: pointer;" class="moon-logo ' + symbol + '" src="'+BASE_URL+'images/moon/icon/fullcolor.png"></span>';
        option.setAttribute("style", "width: 25px; padding-left:0; padding-right:0; margin-right: 6px;")
        featureBoxRight[i].firstChild.firstChild.firstChild.prepend(option.cloneNode(true));
        var specificMoon = featureBoxRight[i].getElementsByTagName("span")[0];
        specificMoon.addEventListener('click', triggerPopup3, false);

      }
    }
  }

}
var moonDiv = document.createElement("div");
moonDiv.classList = "open-moon-sniper-app"
let DivBox = document.querySelectorAll('[class="tw-flex tw-justify-end tw-items-center"]');
let element1 = DivBox[0].querySelectorAll('div')[0];
moonDiv.innerHTML = '<span id="openSite"><img style=" width:40px; cursor: pointer;" class="moon-logo" src="'+BASE_URL+'images/moon/icon/fullcolor.png"></span>';
moonDiv.setAttribute("style", "width: 53px; display: none")
element1.prepend(moonDiv.cloneNode(true));
var specificMoonDiv = element1.getElementsByTagName("span")[0];
specificMoonDiv.addEventListener('click', function() { openIframe(); }, false);
// coingecko.com/en/coins/ethereum  
const body = document.querySelector('body');

if (body) {
  var div = document.createElement("div");
  div.classList = "div-moon"
  div.innerHTML = '<span class="click-modal"  data-toggle="modal" data-target="#myModal" style="display:none;" ></span>';

  body.prepend(div.cloneNode(true));
}

/* fetch(chrome.runtime.getURL('/innerpage/template.html')).then(r => r.text()).then(html => {
  document.body.insertAdjacentHTML('beforeend', html);
  // not using innerHTML as it would break js event listeners of the page
}); */




function triggerPopup(event) {
  event.stopPropagation()
  console.log("popup triggered with symbol: " + event.currentTarget.symbol);
  vm.visible = !vm.visible;
  if (event.currentTarget.symbol) {
    vm.coin = event.currentTarget.symbol;
  }


  /* let tdNode = event.target.parentNode.parentNode.parentNode;
  let ReqTd = tdNode.querySelector('.cg-sticky-third-col');
  document.querySelector(".modal").classList.add("show"); */
}
function triggerPopupSingleCoin(event) {
  event.stopPropagation()
  console.log("popup triggered with symbol: " + event.currentTarget.symbol);
  vm.visible = !vm.visible;
  if (event.currentTarget.symbol) {
    vm.coin = event.currentTarget.symbol;
  }


  /* let tdNode = event.target.parentNode.parentNode.parentNode;
  let ReqTd = tdNode.querySelector('.cg-sticky-third-col');
  document.querySelector(".modal").classList.add("show"); */
}

function triggerPopup2(event) {
  event.stopPropagation()
  if (domain.includes("binance.com/en/markets/spot")) {
    let ReqTr = event.currentTarget.parentNode.parentNode;
    let symbol;
    if (ReqTr.querySelector('.css-17wnpgm') != null) {
      symbol = ReqTr.querySelector('.css-17wnpgm').innerHTML.trim();
    } else {
      symbol = 'BNB';
    }
    console.log("popup triggered with symbol: " + symbol);
    vm.visible = !vm.visible;
    if (symbol) {
      vm.coin = symbol;
    }
  } else {
    let ReqTr = event.currentTarget.parentNode.parentNode;
    let symbol;
    if (ReqTr.querySelector('.css-1x8dg53') != null) {
      symbol = ReqTr.querySelector('.css-1x8dg53').innerHTML.trim();
    } else {
      symbol = 'BNB';
    }
    console.log("popup triggered with symbol: " + symbol);
    vm.visible = !vm.visible;
    if (symbol) {
      vm.coin = symbol;
    }
  }

}
function triggerPopup3(event) {
  event.stopPropagation()
  if (domain.includes("binance.com/en/markets/spot")) {
    let ReqTr = event.currentTarget.parentNode.parentNode;
    let symbol;
    if (ReqTr.querySelector('.css-17wnpgm') != null) {
      symbol = ReqTr.querySelector('.css-17wnpgm').innerHTML.trim();
    } else {
      symbol = 'BNB';
    }
    console.log("popup triggered with symbol: " + symbol);
    vm.visible = !vm.visible;
    if (symbol) {
      vm.coin = symbol;
    }
  } else {
    let ReqTr = event.currentTarget.parentNode.parentNode;
    let symbol;
    if (ReqTr.querySelector('.css-1x8dg53') != null) {
      symbol = ReqTr.querySelector('.css-1x8dg53').innerHTML.trim();
    } else {
      symbol = 'BNB';
    }
    console.log("popup triggered with symbol: " + symbol);
    vm.visible = !vm.visible;
    if (symbol) {
      vm.coin = symbol;
    }
  }

}
function openIframe(event)
{
  vm.visible2 = true;
}


chrome.runtime.onMessage.addListener(message => {
  if (message.toggleVisible) {
    vm.visible = !vm.visible;
  }
});



 