
import { createApp } from "vue";
import Popup from "./Popup.vue";
import "@/styles/main.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
const MOUNT_EL_ID = "as-awesome-extension";
let mountEl = document.getElementById(MOUNT_EL_ID);
if (mountEl) {
  mountEl.innerHTML = "";
}
mountEl = document.createElement("div");
mountEl.setAttribute("id", MOUNT_EL_ID);
document.body.appendChild(mountEl);
  const vm = createApp(Popup)
  .mount(mountEl);
    


/////////////////////////////
var option = document.createElement("td");
option.classList = "table-td-moon"
var domain = window.location.href;
let featureBoxRight = [];
if(domain.includes("coingecko.com"))
{
 featureBoxRight = document.querySelectorAll('div.coin-table tbody tr');
 if (featureBoxRight) {
  for (let i = 0; i < featureBoxRight.length; i++) {

    var symbol = featureBoxRight[i].querySelectorAll('a span')[1].innerHTML.trim();

    option.innerHTML = '<span ><img style=" width:40px; cursor: pointer;" class="moon-logo" src="https://moonsniper.co/images/moon/icon/fullcolor.png"></span>';
    option.setAttribute("style","width: 53px; ")

    featureBoxRight[i].prepend(option.cloneNode(true));

    //Add data of symbol
    var specificMoon = featureBoxRight[i].getElementsByTagName("span")[0];

    specificMoon.addEventListener('click', triggerPopup, false);
    specificMoon.symbol = symbol;
  }
}
}
else if(domain.includes("coinmarketcap.com"))
{
  var thHtml = document.createElement("th");
  thHtml.classList = "table-th-moon stickyTop";
  thHtml.innerHTML ="Moon"
   document.querySelector('.cmc-body-wrapper table thead tr').prepend(thHtml.cloneNode(true));


   featureBoxRight = document.querySelectorAll('.cmc-body-wrapper table tbody tr');
   if (featureBoxRight) {
    for (let i = 0; i < featureBoxRight.length; i++) {
      let symbol;
      if(featureBoxRight[i].querySelector('.coin-item-symbol') != null)
      {
         symbol = featureBoxRight[i].querySelector('.coin-item-symbol').innerHTML.trim();
      }
      option.innerHTML = '<span ><img style=" width:40px; cursor: pointer;" class="moon-logo" src="https://moonsniper.co/images/moon/icon/fullcolor.png"></span>';
      option.setAttribute("style","width: 53px; padding-left:0; padding-right:0")
      featureBoxRight[i].prepend(option.cloneNode(true));
      //Add data of symbol
      var specificMoon = featureBoxRight[i].getElementsByTagName("span")[0];
  
      specificMoon.addEventListener('click', triggerPopup, false);
      if(symbol)
      specificMoon.symbol = symbol;
    }
  }
   
}else if(domain.includes("dexscreener.com"))
{
  featureBoxRight = document.querySelectorAll('.custom-j3hajj a.chakra-link.custom-1oo4dn7');


   if (featureBoxRight) {
    for (let i = 0; i < featureBoxRight.length; i++) {
      var dexSpan = document.createElement("span");
      dexSpan.classList = "table-td-moon chakra-badge custom-1hloedr"
      var symbol = featureBoxRight[i].querySelector('span.chakra-text.custom-q28k12').innerHTML.trim();
      dexSpan.innerHTML = '<span ><img style=" width:40px; cursor: pointer;" class="moon-logo" src="https://moonsniper.co/images/moon/icon/fullcolor.png"></span>';
      dexSpan.setAttribute("style","width: 53px; padding-left:0; padding-right:0")
      featureBoxRight[i].firstChild.prepend(dexSpan.cloneNode(true));
      var specificMoon = featureBoxRight[i].getElementsByTagName("span")[0];
      specificMoon.addEventListener('click', triggerPopup, false);
      if(symbol)
      specificMoon.symbol = symbol;
    }
  }
  featureBoxRight = document.querySelectorAll('div.coin-table tbody tr');
}
else{
   featureBoxRight = document.querySelectorAll('div.coin-table tbody tr');

}



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




function triggerPopup(event){
  event.stopPropagation()
  console.log("popup triggered with symbol: " + event.currentTarget.symbol);
  vm.visible = !vm.visible;
  if(event.currentTarget.symbol)
  {
    vm.coin =event.currentTarget.symbol;
  }

  
  /* let tdNode = event.target.parentNode.parentNode.parentNode;
  let ReqTd = tdNode.querySelector('.cg-sticky-third-col');
  document.querySelector(".modal").classList.add("show"); */
}


//////////////////////////////////////

chrome.runtime.onMessage.addListener(message => {
  if (message.toggleVisible) {
    vm.visible = !vm.visible;
  }
});
