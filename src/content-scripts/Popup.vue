<script>
import { defineComponent, ref, onMounted, reactive, toRefs } from "vue";
import axios from "axios";
import PopupContent from './PopupContent.vue';
// import {
//       BAlert
//     } from 'bootstrap-vue'
export default defineComponent({
  compatConfig: { MODE: 3 },
  setup() {
    const visible = ref(false);
    const coin = ref('');
    const data = ref(null);
    const closePopup  = ()=>{
      visible.value = false;
      coin.value = ''
    }
    const loadCoinById = (id)=>{
        axios.post(`https://moonsniper.co/api/extention-coin-data-coingecko?coin=${id}`)
        .then(res=>{
         data.value = res.data
        })
    } 

    const state = reactive({
      currentTab: null
    });

    onMounted(() => {
      chrome.runtime.sendMessage({ type: "POPUP_INIT" }, async tab => {
        state.currentTab = await tab;
        //console.log(state.currentTab);
      });
    });
    return {
      visible,
      coin,
      data,
      closePopup,
      loadCoinById,
      ...toRefs(state)
    };
  },
  components:{
    PopupContent
  }
});
</script>
<template>
  <div class="overlay dark-layout" v-show="visible" >
    <div class="popup">
      <div class="cancel-button cursor-pointer  bg-gray-400  rounded-sm" @click="closePopup">X</div>
      <!-- <pre>{{ currentTab }}</pre> -->
     <PopupContent :coin="coin" :active="visible"/>
    </div>
  </div>
</template>

<style>
.overlay {
  @apply fixed inset-0 w-full h-full bg-black bg-opacity-10 z-50;
}

.cancel-button{
   position: absolute;
    right: 3px;
    top: 2px;
    font-size: 15px;
    font-weight: bold;
    padding: 2px 8px;
 
}

.popup {
  @apply absolute top-4 right-4 bg-white shadow-lg p-4 rounded-md w-72;
  position:relative;
  max-height: 90vh;
  overflow-y:auto;
  top:50px;
   width:1000px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
}
.accordion-button:focus {
  z-index: 3;
  box-shadow: none !important;
  border-color:none !important;
  outline: 0px;
}
</style>
