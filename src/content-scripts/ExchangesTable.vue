<template>
    <div class="ExchangeTableDiv">
        <b-overlay :show="!exchangesLoaded" rounded="sm">
            <div >
                <div>
                    <b-table :no-border-collapse="true" tbody-tr-class="cursor-pointer  box rounded-pill"
                    :show-empty="true"  class="b-table-2" :fields="fields"
                    style=" white-space: nowrap;" responsive   :items="exchangeData.data">
                    <template #cell(exchange)="data">
                        <div>
                            <a :href="data.item.trade_url" target="blank_" class="exchangetdLink">
                            <div class="">
                                <div style="padding-top:3px;">{{ data.value }}
                                </div>
                            </div>
                        </a>
                        </div>
                    </template>
                    <template #cell(volume)="data">
                        <div>
                           
                                <div class="">
                                    <div style="padding-top:3px">${{ toInterNationalNumber(data.value?data.value:0) }}
                                    </div>
                                </div>
                           
                        </div>
                    </template>
                    <template #cell(pair)="data">
                        <div>
                                <div class="">
                                    <div style="padding-top:3px">{{ data.item.base}}/{{ data.item.target}}
                                    </div>
                                </div>
                           
                        </div>
                    </template>
                   
                </b-table>
                  </div>
                  <div class="mx-2 mb-2">
                    <b-row>
                        <b-col cols="12" sm="6"
                            class="d-flex align-items-center justify-content-center justify-content-sm-start">
                        </b-col>
                        <!-- Pagination -->
                        <b-col cols="12" sm="6"
                            class="d-flex align-items-center justify-content-center justify-content-sm-end">
    
                            <b-pagination id="pagination" v-model="pageNumber" :total-rows="exchangeData.total"
                                :per-page="exchangeData.per_page" first-number last-number class="mb-0 mt-1 mt-sm-0"
                                prev-class="prev-item" next-class="next-item"
                                style="background-color:transaprent !important;">
                                <template #prev-text style="background-color:transaprent !important;">
                                    <!-- <feather-icon icon="ChevronLeftIcon" size="18"
                                        style="background-color:transaprent !important;" /> -->
                                </template>
                                <template #next-text style="background-color:transaprent !important;">
                                    <!-- <feather-icon icon="ChevronRightIcon" size="18"
                                        style="background-color:transaprent !important;" /> -->
                                </template>
                            </b-pagination>
    
                        </b-col>
    
                    </b-row>
                </div>
            </div>
            </b-overlay>
    </div>
</template>
<script>
    import {
        BTable,
        BOverlay,
        BTabs,
        BTab,
        BFormCheckbox,
        BRow,BCol,BPagination

    } from 'bootstrap-vue-3'
    import axios from 'axios'
    import fieldsData from './fields'
    export default {
        components: {
            BTable,
            BOverlay,
            BTabs,
        BTab,
        BFormCheckbox,
        BRow,BCol,BPagination
        },
        props:{
            token:Object
        },
        data() {
            return {
                exchangesLoaded: false,
                exchangeData:[],
                pageNumber:1,
                isBusy:false,
                fields: fieldsData,
          

            }
        },
        methods:{
            loadExchanges() {
                this.exchangesLoaded= false;
                this.isBusy = true;
                axios.post('https://moonsniper.co/api/exchanges-by-token-extention?token='+this.token.symbol+'&page=' + this.pageNumber).then(res => {
                    if (res.data.status == true) {
                        this.exchangeData = res.data.exchanges;
                        this.exchangesLoaded= true;
                    }
                    this.isBusy = false;

                })

            },
            toInterNationalNumber(val) {
                if (val)
                    return new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 15,
                    }).format(val);
            },
        },  
        mounted()
        {
            this.loadExchanges()
        },
       
        watch:{
            'pageNumber': function (newVal, oldVal) {
                if (oldVal && newVal) {
                    this.loadExchanges(false)
                }
            },
        }
    }

</script>
<style>
.ExchangeTableDiv .b-overlay {
    /*height: 100px !important;*/
}
#moon-app-popup .table{
    border-spacing: 0px 7px !important;
    border-collapse: separate;
}
#moon-app-popup .table tr td:first-child {
    border-top-left-radius: 50em;
    border-bottom-left-radius: 50em;
}
#moon-app-popup .table tr td:last-child {
    border-top-right-radius: 50em;
    border-bottom-right-radius: 50em;
}
#moon-app-popup .table tbody tr {
    box-shadow: inset 1px 2px 1px 0px rgb(82 243 109);
    border-radius: 50rem !important;
    background: linear-gradient(172deg, rgba(43, 255, 77, 0.3) 3.11%, rgba(0, 0, 0, 0) 20.06%), rgba(255, 255, 255, 0.07);
    border: none !important;
}
#moon-app-popup .table thead tr th {
    background: transparent;
    border: none !important;
}
#moon-app-popup .page-link {
    z-index: 3;
    color: rgb(136, 131, 131) !important;
    background: transparent !important;
    border: none !important;
}
#moon-app-popup li.page-item.active .page-link {
    z-index: 3;
    color: rgb(255, 255, 255) !important;
    background: transparent !important;
    border: none !important;
}
.exchangetdLink{
    color: #000;
   }
.tw-dark  .exchangetdLink{
 color: rgb(255, 255, 255) !important;
}

.exchangetdLink tr td{
    padding: 0.72rem 2rem;
}
</style>