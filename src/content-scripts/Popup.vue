<script>
  import {
    defineComponent,
    ref,
    onMounted,
    reactive,
    toRefs
  } from "vue";
  import axios from "axios";
  import PopupContent from './PopupContent.vue';
  // import {
  //       BAlert
  //     } from 'bootstrap-vue'
  export default defineComponent({
    compatConfig: {
      MODE: 3
    },
    setup() {
      const visible = ref(false);
      const visible2 = ref(false);
      const coin = ref('');
      const data = ref(null);
      const closePopup = () => {
        visible.value = false;
        coin.value = ''
      }
      const closePopup2 = () => {
        visible2.value = false;
      }
      const loadCoinById = (id) => {
        axios.post(`https://moonsniper.co/api/extension-coin-data-coingecko?coin=${id}`)
          .then(res => {
            data.value = res.data
          })
      }

      const state = reactive({
        currentTab: null
      });

      onMounted(() => {
        chrome.runtime.sendMessage({
          type: "POPUP_INIT"
        }, async tab => {
          state.currentTab = await tab;
          //console.log(state.currentTab);
        });
      });
      return {
        visible,
        visible2,
        coin,
        data,
        closePopup,
        closePopup2,
        loadCoinById,
        ...toRefs(state)
      };
    },
    components: {
      PopupContent
    }
  });
</script>
<template>
  <div class="tw-dark">
    <div class="overlay MoonApp-div" v-show="visible">
      <div class="popup">
        <div class="cancel-button cursor-pointer  bg-gray-400  rounded-sm" @click="closePopup">X</div>
        <!-- <pre>{{ currentTab }}</pre> -->
        <PopupContent :coin="coin" :active="visible" />
      </div>
    </div>
    <div class="overlay MoonApp-div" v-show="visible2">
      <div class="popup">
        <div class="cancel-button cursor-pointer  bg-gray-400  rounded-sm" @click="closePopup2">X</div>
        <!-- <pre>{{ currentTab }}</pre> -->

        <iframe v-if="visible2" src="https://moonsniper.co/dashboard" title="W3Schools Free Online Web Tutorials"></iframe>
      </div>
    </div>
  </div>

</template>

<style>
  .overlay {
    @apply fixed inset-0 w-full h-full bg-black bg-opacity-10 z-50;
  }

  .cancel-button {
    position: absolute;
    font-size: 15px;
    font-weight: bold;
    padding: 2px 8px;
    right: 12px;
    z-index: 999999999;
    top: 7px;
  }

  .popup {
    @apply absolute top-4 right-4 bg-white shadow-lg p-4 rounded-md w-72;
    position: relative;
    overflow-x: hidden;
    top: 50px;
    width: 900px;
    -moz-border-radius: 5px;
    border-radius: 30px;
    margin-left: auto;
    margin-right: auto;
    padding: 0.8rem 1.4rem !important;
  }

  .tw-dark .MoonApp-div .popup {
    background: #232228 !important;
    border-color: #3b4253;
  }

  #as-awesome-extension {
    z-index: 999;
    position: sticky;
  }

  .css-13euu76 {
    padding-left: 42px !important;
  }

  @font-face {
    font-family: "Poppins-Light";
    src: local("Poppins-Light"),
      url(../fonts/Poppins-Light.ttf) format("truetype");
  }
</style>