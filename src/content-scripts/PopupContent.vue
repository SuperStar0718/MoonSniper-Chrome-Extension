<template>
    <div id="moon-app-popup">
        <b-overlay :show="!dataloaded" rounded="sm" :class="{'overlay-height':!dataloaded}">
            <div class="details-modal-container" v-if="dataloaded">
                <div class="w-full justify-content-between d-flex" style="margin-top: 10px; margin-left: 10px;">
                    <div class="d-inline">
                        <div class="rank_slot darkWhiteText" style="margin-bottom: 8px;font-family: 'Poppins-Light'; opacity: 0.6 !important;
                                            font-style: normal;
                                            font-weight: 300;
                                            font-size: 12px;
                                            ">Rank #{{toInterNationalNumber(coindata.market_cap_rank)}}


                        </div>
                        <div class="d-flex" style="margin-top:11px;">
                            <div class="d-flex m-auto">
                                <b-avatar class="bg-light mr-1" v-if="coindata.image" :src="coindata.image">
                                </b-avatar>
                                <span class="marginx1 m-auto a darkWhiteText" style="font-family: 'font-family: 'Poppins-Light';';   font-size: 20px;  font-style: normal;  font-weight: 400;
                                                        width: 105px;
                                                        text-overflow: ellipsis;
                                                        white-space: nowrap;
                                                        overflow: hidden;" data-toggle="tooltip" data-placement="top"
                                    :title="coindata.name" v-if="coindata.name && coindata.name.length > 8 ">
                                    {{coindata.name}}

                                </span>
                                <span class="marginx1 m-auto  darkWhiteText mr-3"
                                    :class="{'w-[105px]':coindata.name && coindata.name.length > 8}" style="font-family: 'font-family: 'Poppins-Light';';
                                                        font-size: 20px; 
                                                        font-style: normal;
                                                        font-weight: 400;
                                                        
                                                        text-overflow: ellipsis;
                                                        white-space: nowrap;
                                                        overflow: hidden;" v-else>
                                    {{coindata.name}}


                                </span>

                                <span class="marginx1 m-auto darkWhiteText mx-2" style="'font-family: 'Poppins-Light';
                                                        font-size: 14px; position: relative;
                                                        font-style: normal; opacity: 0.7;
                                                        font-weight: 300; margin-right: 40px !important;">
                                    <div style="position: absolute; top:-29px; left:4px">
                                        &nbsp; {{coindata.symbol}}
                                    </div>
                                </span>

                            </div>
                            <div class="d-flex ml-[10px] mb-auto mr-auto mt-auto" style="margin-left:10px"
                                :class="{'ml-[30px]':coindata.name && coindata.name.length > 8}">
                                <div class="d-flex">
                                    <span class=""
                                        :class="{'greenFlash':coindata.flash == 1,'redFlash':coindata.flash ==2,'whiteFlash':coindata.flash ==3}"
                                        style="font-family: 'Poppins-Light'; font-style: normal;font-weight: 400; font-size: 20px;"
                                        v-if="coindata.current_price && coindata.current_price>= 0">${{ roundData(coindata.current_price) }}
                                    </span>
                                </div>
                                <div class="d-flex m-auto">
                                    <span
                                        v-if="coindata.price_change_percentage_24h && coindata.price_change_percentage_24h>= 0"
                                        class="btn-success d-flex  marginx1"
                                        style="font-family: 'Poppins-Light';
                                                        font-style: normal;
                                                        font-weight: 300;
                                                        font-size: 12px; margin-top: 2px;border-radius:5px; padding:0px 5px">
                                        <div style="display: inline; margin:auto;">
                                            <i class="cursor-pointer darkWhiteText"
                                                style="margin-right:13px; margin-bottom: 6px;">
                                                <font-awesome-icon icon="fa-solid fa-chevron-up" />
                                            </i>
                                            <!-- <feather-icon size="20" icon="ChevronUpIcon" /> -->
                                        </div>
                                        <span>{{ roundData(coindata.price_change_percentage_24h) }}%</span>

                                    </span>
                                    <span v-else-if="coindata.price_change_percentage_24h"
                                        style="font-size:12px; font-weight: 300; margin-top: 2px;border-radius:5px; padding:0px 5px"
                                        class="btn-danger d-flex marginx1">
                                        <div style="display: inline; margin:auto;">
                                            <i class="cursor-pointer darkWhiteText"
                                                style="margin-right:13px; margin-bottom: 6px;">
                                                <font-awesome-icon icon="fa-solid fa-chevron-up" />
                                            </i>
                                            <!-- <feather-icon size="20" icon="ChevronDownIcon" /> -->
                                        </div>
                                        <span>{{ roundData(coindata.price_change_percentage_24h) }}%</span>

                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-50 d-inline" style="margin-right:20px;">
                        <div class="bg-theme rounded d-inline" style="float: right;"
                            v-if="coindata.contract_address && coindata.contract_address.length>0">

                            <div style="margin-top:-2px">
                                <div class="my-auto darkWhiteText" style="margin-bottom: 8px !important; margin-right: 4px;padding-left:10px; font-family: 'Poppins-Light';
                                                    font-style: normal;
                                                    font-weight: 300;
                                                    font-size: 12px;
                                                ">Contract </div>


                                <b-dropdown size="lg" variant="flat-secondary"
                                    style="padding:0px !important; border-radius: 20px;" id="dropdown-left1" no-caret
                                    class="cunningDrop Contract-div">
                                    <template #button-content>
                                        <div class="darkBackgroundBlack"
                                            v-for="(address,index) in coindata.contract_address.slice(0, 1)"
                                            :key="index" style="display:block; padding: 2px; border-radius: 20px;">
                                            <div class="flex">

                                                <b-img v-if="coindata.image" :src="coindata.image" fluid
                                                    alt="Responsive image" style="margin-right:5px;
                                                     height:36px;   
                                                      position: relative;
                                                                    bottom: 4px;" />
                                                <div style="font-family: 'Poppins-Light'; display:inline-block;
                                                                    font-style: normal;    position: relative;
                                                                    top: 4px;
                                                                    font-weight: 500;
                                                                    font-size: 14px;
                                                                    line-height: 14px; width:90px;white-space: nowrap; 
                                                                    text-align: start;
                                                                    overflow: hidden;
                                                                    text-overflow: ellipsis;">
                                                    <div style="white-space: nowrap; width:90px;  overflow: hidden;
                                                                text-overflow: ellipsis;"
                                                        class="darkWhiteText text-capitalize">
                                                        {{address.platform}}
                                                    </div>
                                                    <div style="white-space: nowrap; width:90px;  overflow: hidden;
                                                                text-overflow: ellipsis;" class="text-secondary ">
                                                        {{address.contract_address}}
                                                    </div>
                                                </div>
                                                <div style="display:flex; float:right; margin-top:-3px">

                                                    <b-button size="sm" class="ml-1 CopyButton"
                                                        @click="doCopy(address.contract_address)"
                                                        variant="outline-primary" pill>
                                                        <i class="cursor-pointer darkWhiteText fa-lg m-1 "
                                                            style="color:#fff; margin: 1rem !important;">
                                                            <font-awesome-icon icon="fa-regular fa-copy" />
                                                        </i>
                                                        <!-- <feather-icon icon="CopyIcon"
                                                                            class="cursor-pointer darkWhiteText" size="20" /> -->
                                                    </b-button>
                                                    <img src='https://moonsniper.co/images/static/metamask.png'
                                                        class="img-fluid" alt="metamask" style="cursor:pointer; width:23px; margin-right:13px;
                                                        height: fit-content;
                                                        margin-top: auto;
                                                        margin-bottom: auto;" @click="say('say')">

                                                    <i class="cursor-pointer "
                                                        style="margin-right:13px; margin-bottom: 6px; color:white">
                                                        <font-awesome-icon icon="fa-solid fa-chevron-down" />
                                                    </i>

                                                </div>

                                            </div>


                                        </div>

                                    </template>
                                    <b-dropdown-form href="#" class="cunningDrop dropdown-mine darkBackgroundBlack"
                                        name="dropdownform2" style="z-index:999;">
                                        <div class="darkBackgroundBlack"
                                            v-for="(address,index) in coindata.contract_address" :key="index"
                                            style="display:flex; padding: 4px;">
                                            <b-img v-if="coindata.image" :src="coindata.image" fluid
                                                alt="Responsive image" style="margin-right:5px; height:36px;" />
                                            <div class="" style="font-family: 'Poppins-Light'; display:inline-block; font-style: normal;
                                                                        font-weight: 500;
                                                                        font-size: 14px;
                                                                        line-height: 14px;
                                                                        ">
                                                <div class="darkWhiteText text-capitalize" style="white-space: nowrap; width:90px;
                                                                        overflow: hidden;
                                                                        text-overflow: ellipsis;">
                                                    {{address.platform}}
                                                </div>
                                                <div class=" text-secondary" style="white-space: nowrap; width:90px;
                                                                        overflow: hidden;
                                                                        text-overflow: ellipsis;">
                                                    {{address.contract_address}}
                                                </div>

                                            </div>
                                            <div style="display:flex; float:right;">


                                                <b-button size="sm" class="ml-1 CopyButton"
                                                    @click="doCopy(address.contract_address)"
                                                    style="margin-right:13px; cursor:pointer; border: none !important;"
                                                    variant="outline-primary" pill>
                                                    <i class="cursor-pointer  fa-lg m-1 "
                                                        style="margin: 1rem !important; color:#fff;">
                                                        <font-awesome-icon icon="fa-regular fa-copy" />
                                                    </i>
                                                </b-button>
                                                <img src='https://moonsniper.co/images/static/metamask.png'
                                                    class="img-fluid" alt="metamask" style="cursor:pointer; width:23px;"
                                                    @click="say('hello')">

                                            </div>


                                        </div>
                                    </b-dropdown-form>

                                </b-dropdown>
                                <!-- <b-form-select v-model="selectedContract">
                                                    <b-form-select-option :value="null" selected>Select</b-form-select-option>
                                                    <b-form-select-option v-for="(address,index) in coindata.contract_address"
                                                        :key="index" :>
                                                        {{ address.platform }}
                                                    </b-form-select-option>
                                                </b-form-select> -->
                            </div>
                            <!-- <div v-if="selectedContract" class="d-flex mt-1 justify-content-end">
                                                <div class="text-nowrap text-truncate" style="width:200px">{{selectedContract}}
                                                </div>
                                                <b-button size="sm" class="ml-1" v-clipboard:copy="selectedContract"
                                                    v-clipboard:success="onCopy" v-clipboard:error="onError"
                                                   variant="outline-primary" pill>Copy!
                                                </b-button>
    
                                            </div> -->


                        </div>
                    </div>
                </div>
                <b-accordion free>
                    <b-accordion-item visible v-if="coindata.sparkline_in_7d&& coindata.sparkline_in_7d.length>0
                                    || coindata.roi_times ||coindata.round_price && coindata.round_price !=0 && coindata.current_price&& coindata.current_price !=0
                                    || coindata.total_volume
                                    ||coindata.market_cap
                                    ||coindata.total_supply_percent" :isVisible="true" title="Market Data"
                        class="open w-100">
                        <b-card class="p-0">
                            <b-card-body class="inner-cbody" style="margin-left: 10px; margin-top: 19px;">
                                <b-row>

                                    <b-col md="10" sm="8" class="text-center sparlineChat mb-1"
                                        style="margin-left: -40px;"
                                        v-if="coindata.sparkline_in_7d&& coindata.sparkline_in_7d.length>0">
                                        <!-- <h5> 7 Days</h5> -->
                                        <div class="position-absolute w-100 d-flex justify-content-between"
                                            style="z-index:99">

                                            <b-tabs content-class="" class="graph_tab graph_tab-1 float-left w-50"
                                                style="font-family: Poppins-Light;font-style: normal;font-weight: 400;font-size: 10px;">
                                                <b-tab active title="Price" @click="toggleChartType('cp')">
                                                    <div></div>
                                                </b-tab>
                                                <b-tab title="MC" @click="toggleChartType('mc')">
                                                    <div></div>
                                                </b-tab>
                                            </b-tabs>
                                            <div class="d-inline-flex float-right"
                                                style="padding-right: 40px !important;">
                                                <b-tabs content-class="" class="graph_tab my-auto graph_tab-2"
                                                    style="font-family: Poppins-Light;font-style: normal;font-weight: 400;font-size: 10px;">
                                                    <b-tab active title="1D"
                                                    @click="loadHistoryChart('24')">
                                                    <div></div>
                                                    </b-tab>
                                                    <b-tab title="7D" @click="loadHistoryChart('7')">
                                                        <div></div>
                                                    </b-tab>
                                                    <b-tab title="14D" @click="loadHistoryChart('14')">
                                                        <div></div>
                                                    </b-tab>
                                                    <b-tab title="1M" @click="loadHistoryChart('30')">
                                                        <div></div>
                                                    </b-tab>
                                                    <b-tab title="3M" @click="loadHistoryChart('90')">
                                                        <div></div>
                                                    </b-tab>
                                                    <b-tab title="1Y" @click="loadHistoryChart('365')">
                                                        <div></div>
                                                    </b-tab>
                                                    <b-tab title="ALL" @click="loadHistoryChart('all')">
                                                        <div></div>
                                                    </b-tab>
                                                 </b-tabs>
                                                <div style="width:20px">
                                                    <!-- <feather-icon size='12' icon='CalendarIcon' /> -->
                                                </div>
                                            </div>
                                        </div>
                                        <div v-show="chartType == 'cp'">
                                            <div v-if="coindata.coingeckoid != null">
                                                <vue-apex-charts red="apexChart1" class="full" width="100%"
                                                    :dataLabels="true" type="area" height="290"
                                                    :options="Price_DaysChart" :series="Price_DaysChartseries">
                                                </vue-apex-charts>
                                            </div>
                                        </div>
                                        <div v-show="chartType == 'mc'">
                                            <div v-if="coindata.coingeckoid != null">
                                                <vue-apex-charts red="apexChart1" class="full" width="100%"
                                                    :dataLabels="true" type="area" height="290"
                                                    :options="MC_DaysChart" :series="MC_DaysChartseries">
                                                </vue-apex-charts>
                                            </div>
                                        </div>
                                        <!-- <sparkline width="300" height="150">
                                                        <sparklineLine :data="coindata.sparkline_in_7d"
                                                            :limit="coindata.sparkline_in_7d?coindata.sparkline_in_7d.length:1000"
                                                            :styles="spLineStyles" />
                                                    </sparkline> -->
                                    </b-col>
                                    <b-col md="2" sm="4" style=" 
                                                    padding-left: 0px !important;
                                                    justify-content: space-between;
                                                    flex-direction: column;">
                                        <div v-if="coindata.total_volume" style="margin-bottom: 10px;">
                                            <span
                                                style="font-family: 'Poppins-Light';font-style: normal;font-weight: 300;font-size: 12px;opacity: 0.5;">
                                                Volume</span>
                                            <div class="" style="font-size:16px; font-weight: 600;">
                                                <span
                                                    style="font-family: 'Poppins-Light';font-style: normal;font-weight: 400;font-size: 15px;">${{ toInterNationalNumber(coindata.total_volume) }}</span>
                                            </div>
                                        </div>
                                        <div v-if="coindata.market_cap" style="margin-bottom: 10px;">
                                            <span
                                                style="font-family: 'Poppins-Light';font-style: normal;font-weight: 300;font-size: 12px;opacity: 0.5;">
                                                Market Cap</span>
                                            <div class="" style="font-size:16px; font-weight: 600;">
                                                <span
                                                    style="font-family: 'Poppins-Light';font-style: normal;font-weight: 400;font-size: 15px;">${{ toInterNationalNumber(coindata.market_cap) }}</span>
                                            </div>
                                        </div>
                                        <div style="margin-bottom: 10px;"
                                            v-if="coindata.roi_times ||coindata.round_price && coindata.round_price !=0 && coindata.current_price&& coindata.current_price !=0">
                                            <span
                                                style="font-family: 'Poppins-Light';font-style: normal;font-weight: 300;font-size: 12px;opacity: 0.5;">
                                                X's from launch</span>
                                            <div class="" style="font-size:16px; font-weight: 600;">
                                                <span
                                                    style="font-family: 'Poppins-Light';font-style: normal;font-weight: 400;font-size: 15px;"
                                                    v-if="coindata.roi_times">{{ xfromlunch(coindata.roi_times,'roi_times') }}X</span>
                                                <span
                                                    style="font-family: 'Poppins-Light';font-style: normal;font-weight: 400;font-size: 15px;"
                                                    v-else-if="coindata.round_price && coindata.round_price !=0 && coindata.current_price&& coindata.current_price !=0 ">{{ xfromlunch(coindata.current_price,coindata.round_price) }}X</span>
                                            </div>
                                        </div>
                                        <div v-if="coindata.total_supply_percent" style="margin-bottom: 10px;">
                                            <span
                                                style="font-family: 'Poppins-Light';font-style: normal;font-weight: 300;font-size: 12px;opacity: 0.5;">
                                                Total Supply:</span>
                                            <div class="" style="font-size:16px; font-weight: 600;">
                                                <span
                                                    style="font-family: 'Poppins-Light';font-style: normal;font-weight: 400;font-size: 15px;">{{ coindata.total_supply_percent }}
                                                    %</span> </div>
                                        </div>
                                        <div class="float-left price_prediction">
                                            <button class="fs-6 " style="font-size: 12px !important;">Price
                                                Prediction</button>
                                        </div>
                                    </b-col>

                                </b-row>
                                <b-row>
                                    <b-col class="p-0">
                                        <p class="poppins-font chart-desc" v-html="coindata.coin_description">

                                        </p>
                                    </b-col>
                                </b-row>

                            </b-card-body>
                        </b-card>
                    </b-accordion-item>
                    <b-accordion-item title="Social Data" class="w-100">
                        <b-card no class="mb-1">
                            <b-card-body>

                                <div class="d-flex flex-wrap justify-content-start">
                                    <div v-if="coindata.website && coindata.website != '' " cols="1" md="2" lg="2"
                                        sm="2" class="radius_gradient" style="width:110px">
                                        <b-card title="" class="mx-auto innerCard text-center str_grey_gradient"
                                            style="max-width:200px;">
                                            <a :href="coindata.website" target="_blank" class="d-block"
                                                style="margin-top:20px; margin-bottom:10px;">
                                                <b-img rounded :src="'https://moonsniper.co/images/static/website.png'"
                                                    fluid class="w-50 mx-auto" alt="Responsive image" />
                                            </a>
                                            <div class="soicalLable soicalLable-2">
                                                Website
                                            </div>
                                        </b-card>
                                    </div>
                                    <div class="radius_gradient" style="width:110px"
                                        v-if="coindata.twitter && coindata.twitter != '' ">
                                        <b-card title="" class="mx-auto innerCard text-center str_grey_gradient"
                                            style="max-width:200px;">
                                            <a :href="coindata.twitter" target="_blank" class="d-block"
                                                style="margin-top:20px; margin-bottom:10px;">
                                                <b-img rounded :src="'https://moonsniper.co/images/static/twitter.png'"
                                                    fluid class="w-50 mx-auto" alt="Responsive image" />
                                            </a>
                                            <div class="soicalLable soicalLable-2" v-if="coindata.twitter_followers">
                                                {{kFormatter(coindata.twitter_followers)}}
                                            </div>
                                            <div class="soicalLable soicalLable-2" v-else>
                                                Twitter
                                            </div>
                                        </b-card>
                                    </div>

                                    <div class="radius_gradient" style="width:110px"
                                        v-if="coindata.telegram && coindata.telegram != '' ">
                                        <b-card title="" class="mx-auto innerCard text-center str_grey_gradient"
                                            style="max-width:200px;">
                                            <a :href="coindata.telegram" target="_blank" class="d-block"
                                                style="margin-top:20px; margin-bottom:10px;">
                                                <b-img rounded :src="'https://moonsniper.co/images/static/telegram.png'"
                                                    fluid class="w-50 mx-auto" alt="Responsive image" />

                                            </a>
                                            <div class="soicalLable soicalLable-2" v-if="coindata.telegram_members">
                                                {{kFormatter(coindata.telegram_members)}}
                                            </div>
                                            <div class="soicalLable soicalLable-2" v-else>
                                                Telegram
                                            </div>
                                        </b-card>
                                    </div>
                                    <div class="radius_gradient" style="width:110px"
                                        v-if="coindata.discord && coindata.discord != '' ">
                                        <b-card title="" class="mx-auto innerCard text-center str_grey_gradient"
                                            style="max-width:200px;">
                                            <a :href="coindata.discord" target="_blank" class="d-block"
                                                style="margin-top:20px; margin-bottom:10px;">
                                                <b-img rounded :src="'https://moonsniper.co/images/static/discord.png'"
                                                    fluid class="w-50 mx-auto" alt="Responsive image" />
                                            </a>
                                            <div class="soicalLable soicalLable-2" v-if="coindata.medium_followers">
                                                {{kFormatter(coindata.medium_followers)}}
                                            </div>
                                            <div class="soicalLable soicalLable-2" v-else>Discord
                                            </div>
                                        </b-card>
                                    </div>
                                    <div class="radius_gradient" style="width:110px"
                                        v-if="coindata.medium && coindata.medium != '' ">
                                        <b-card title="" class="mx-auto innerCard text-center str_grey_gradient"
                                            style="max-width:200px;">
                                            <a :href="coindata.medium" target="_blank" class="d-block"
                                                style="margin-top:20px; margin-bottom:10px;">
                                                <b-img rounded :src="'https://moonsniper.co/images/static/medium.png'"
                                                    fluid class="w-50 mx-auto" alt="Responsive image" />

                                            </a>
                                            <div class="soicalLable soicalLable-2" v-if="coindata.medium_followers">
                                                {{kFormatter(coindata.medium_followers)}}
                                            </div>
                                            <div class="soicalLable soicalLable-2" v-else>Medium
                                            </div>
                                        </b-card>
                                    </div>
                                    <div class="radius_gradient" style="width:110px"
                                        v-if="coindata.reddit && coindata.reddit != '' ">
                                        <b-card title="" class="mx-auto innerCard text-center str_grey_gradient"
                                            style="max-width:200px;">
                                            <a :href="coindata.reddit" target="_blank" class="d-block"
                                                style="margin-top:20px; margin-bottom:10px;">
                                                <b-img rounded :src="'https://moonsniper.co/images/static/reddit.png'"
                                                    fluid class="w-50 mx-auto" alt="Responsive image" />

                                            </a>
                                            <div class="soicalLable soicalLable-2" v-if="coindata.reddit_followers">
                                                {{kFormatter(coindata.reddit_followers)}}
                                            </div>
                                            <div class="soicalLable soicalLable-2" v-else>Reddit
                                            </div>
                                        </b-card>
                                    </div>
                                    <div class="radius_gradient" style="width:110px"
                                        v-if="coindata.whitepaper && coindata.whitepaper != '' ">
                                        <b-card title=""
                                            class="mx-auto innerCard text-center str_grey_gradient whitepaper-card"
                                            style="max-width:200px; ">
                                            <a :href="coindata.whitepaper" target="_blank" class="d-block"
                                                style="margin-top:20px; margin-bottom:10px;">
                                                <b-img rounded
                                                    :src="'https://moonsniper.co/images/static/whitepaper.png'" fluid
                                                    class="w-50 mx-auto bg-light" alt="Responsive image" />

                                            </a>
                                            <div class="soicalLable soicalLable-2" v-if="coindata.whitepaper_followers">
                                                {{kFormatter(coindata.whitepaper_followers)}}
                                            </div>
                                            <div class="soicalLable soicalLable-2" v-else>Whitepaper
                                            </div>
                                        </b-card>
                                    </div>
                                    <div class="radius_gradient " style="width:110px"
                                        v-if="coindata.github && coindata.github != '' ">
                                        <b-card title="" class="mx-auto innerCard text-center str_grey_gradient"
                                            style="max-width:200px;">
                                            <a :href="coindata.github" target="_blank" class="d-block"
                                                style="margin-top:20px; margin-bottom:10px;">
                                                <b-img rounded :src="'https://moonsniper.co/images/static/github.png'"
                                                    fluid class="w-50 mx-auto" alt="Responsive image" />
                                            </a>
                                            <div class="soicalLable soicalLable-2" v-if="coindata.github_followers">
                                                {{kFormatter(coindata.github_followers)}}
                                            </div>
                                            <div class="soicalLable soicalLable-2" v-else>Github
                                            </div>
                                        </b-card>
                                    </div>
                                </div>
                                <div class="text-center mt-1 mb-1 justify-content-start d-flex flex-wrap socialData">


                                    <div class="radius_gradient cursor-pointer" style="width:110px;"
                                        v-if="coindata.average_sentiment">
                                        <b-card title="" class="mx-auto  innerCard text-center str_grey_gradient"
                                            style="max-width:120px;">

                                            <div class="justify-content-center text-nowrap socialText2 "
                                                style="margin-top: 10px; margin-bottom: 12px;">
                                                {{ calculate_social_score(coindata) }}/10</div>

                                            <div class="soicalLable sl2 darkWhiteText lableText">Social Score
                                            </div>

                                        </b-card>
                                    </div>
                                    <div class="radius_gradient cursor-pointer" style="width:110px;"
                                        v-if="coindata.social_mentions_change">
                                        <b-card title="" class="mx-auto innerCard text-center str_grey_gradient"
                                            style="max-width:200px;">
                                            <div class="justify-content-center text-nowrap socialText2 text-success-green "
                                                style="margin-top: 10px; margin-bottom: 12px;"
                                                v-if="coindata.social_mentions_change>=0">
                                                +{{roundData(coindata.social_mentions_change)}} %
                                            </div>
                                            <div class="justify-content-center text-nowrap socialText2 text-danger "
                                                style="margin-top: 10px; margin-bottom: 12px;" v-else>
                                                {{roundData(coindata.social_mentions_change)}} %
                                            </div>
                                            <div class="soicalLable sl2 darkWhiteText lableText">Social Mentions
                                            </div>

                                        </b-card>
                                    </div>

                                    <div class="radius_gradient cursor-pointer" style="width:110px;"
                                        v-if="coindata.average_sentiment">
                                        <b-card title="" class="mx-auto innerCard text-center str_grey_gradient"
                                            style="max-width:200px;">
                                            <div class="justify-content-center text-nowrap socialText2 "
                                                style="margin-top: 10px; margin-bottom: 12px;"
                                                v-if="userData.currentPlan == 'free'">

                                                <i>
                                                    <font-awesome-icon icon="fa-solid fa-lock" />
                                                </i>
                                                <!-- <feather-icon icon="LockIcon" size="30" style="" /> -->
                                            </div>
                                            <div v-else class="justify-content-center text-nowrap socialText2 "
                                                style="margin-top: 10px; margin-bottom: 12px;">
                                                {{roundData(coindata.average_sentiment)}}</div>

                                            <div class="soicalLable sl2 darkWhiteText lableText">Average
                                                Sentiment
                                            </div>

                                        </b-card>
                                    </div>

                                    <div class="radius_gradient cursor-pointer" style="width:110px;" v-if="coindata.social_engagement_change">
                                        <b-card  title="" class="mx-auto innerCard text-center str_grey_gradient"
                                            style="max-width:200px;">
                                            <div class="justify-content-center text-nowrap socialText2 "
                                                style="margin-top: 10px; margin-bottom: 12px;"
                                                v-if="userData.currentPlan == 'free'">
                                                <i>
                                                    <font-awesome-icon icon="fa-solid fa-lock" />
                                                </i>
                                                <!-- <feather-icon icon="LockIcon" size="30" style="" /> -->
                                            </div>
                                            <div class="justify-content-center text-nowrap socialText2 text-success-green"
                                                style="margin-top: 10px; margin-bottom: 12px;"
                                                v-else-if="coindata.social_engagement_change>=0">
                                                +{{roundData(coindata.social_engagement_change)}} %</div>
                                            <div class="justify-content-center text-nowrap socialText2  text-danger"
                                                style="margin-top: 10px; margin-bottom: 12px;" v-else>
                                                {{roundData(coindata.social_engagement_change)}} %</div>
                                            <div class="soicalLable sl2 darkWhiteText lableText">Social
                                                Engagement
                                            </div>

                                        </b-card >
                                    </div>
                                    <div class="radius_gradient cursor-pointer" style="width:110px;">
                                        <b-card title="" class="mx-auto innerCard text-center str_grey_gradient"
                                            style="max-width:200px;">
                                            <div class="justify-content-center text-nowrap socialText2 "
                                                style="margin-top: 10px; margin-bottom: 12px;"
                                                v-if="userData.currentPlan == 'free'">
                                                <i>
                                                    <font-awesome-icon icon="fa-solid fa-lock" />
                                                </i>
                                                <!-- <feather-icon icon="LockIcon" size="30" style="" /> -->
                                            </div>
                                            <div class="justify-content-center text-nowrap socialText2"
                                                style="margin-top: 10px; margin-bottom: 12px;" v-else>2</div>
                                            <div class="soicalLable sl2 darkWhiteText lableText">Bearish
                                                Sentiment
                                            </div>

                                        </b-card>
                                    </div>

                                    <div class="radius_gradient cursor-pointer" style="width:110px;"
                                        v-if="coindata.average_sentiment_change">
                                        <div title="" class="mx-auto innerCard text-center str_grey_gradient"
                                            style="max-width:200px;">
                                            <div class="justify-content-center text-nowrap socialText2 "
                                                style="margin-top: 10px; margin-bottom: 12px;"
                                                v-if="roundData(coindata.average_sentiment_change)>=0">
                                                +{{roundData(coindata.average_sentiment_change)?roundData(coindata.average_sentiment_change):0}}
                                                %</div>
                                            <div class="justify-content-center text-nowrap socialText2 text-danger"
                                                style="margin-top: 10px; margin-bottom: 12px;" v-else>
                                                {{roundData(coindata.average_sentiment_change)?roundData(coindata.average_sentiment_change):0}}
                                                %</div>
                                            <div class="soicalLable sl2 darkWhiteText lableText">Average
                                                Sentiment
                                                change
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </b-card-body>
                        </b-card>
                    </b-accordion-item>
                    <b-accordion-item class="w-100" title="Unlocking Data" v-if="coindata.next_unlock_date_text || supplyChart.series.length >0 ||coindata.next_unlock_status || 
                                    coindata.first_vc_unlock
                                    ||coindata.end_vc_unlock
                                    ||coindata.next_unlock_number_of_tokens
                                    ||coindata.next_unlock_size
                                    ||coindata.next_unlock_percent_of_tokens
                                    ||coindata.seed_price
                                    ||coindata.roi_seed
                                    ||coindata.three_months_unlock_number_of_tokens
                                    ||coindata.three_months_unlock_percent_of_tokens
                                    ||coindata.three_months_unlock_size
                                    ||coindata.six_months_unlock_number_of_tokens
                                    ||coindata.six_months_unlock_percent_of_tokens
                                    ||coindata.six_months_unlock_size
                                    ||coindata.total_supply_percent ">
                        <div class="container d-flex" style="padding:0px;">
                            <div class="d-inline" v-if="coindata.next_unlock_date_text"
                                style="width:20%; font-family: 'Poppins-Light'; margin-right: 24px;  font-style: normal;  font-weight: 400; font-size: 12px;">
                                <span style="opacity: 0.5;">Next Unlock Date</span><br>
                                <span>{{ coindata.next_unlock_date_text}}</span><br>
                            </div>
                            <div class="d-inline" v-else-if="coindata.next_unlock_date"
                                style="width:20%; font-family: 'Poppins-Light'; margin-right: 24px;  font-style: normal;  font-weight: 400; font-size: 12px;">
                                <span style="opacity: 0.5;">Next Unlock Date</span><br>
                                <span>{{ getDateAndTime(coindata.next_unlock_date,'date') }}</span><br>
                                <span
                                    style="opacity: 0.5;">{{ getDateAndTime(coindata.next_unlock_date,'time') }}</span>
                            </div>
                            <div v-if="!coindata.next_unlock_date_text && coindata.next_unlock_date"
                                class="d-inline-flex justify-content-between" style="">
                                <div class="d-iline" style="max-width:65px">
                                    <div class="radius_gradient" style="border-radius:10px">
                                        <div class="str_green_gradient text-center m-auto vertical-items-center"
                                            style="width:64px; height:64px; border-radius: 10px; background: black !important;">
                                            <span
                                                style="font-family: monospace;font-style: normal;font-weight: 400;font-size: 26px; color: #2BFF4D"
                                                v-if="coindata.next_unlock_percent_of_tokens">{{ roundData2(coindata.next_unlock_percent_of_tokens,1) }}%</span><br>
                                            <span
                                                style="font-family: monospace;font-style: normal;font-weight: 400;font-size: 14px; color: #2BFF4D">{{ roundData2(coindata.next_unlock_percent_of_tokens/1000000,2)  }}mil</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- <vac :end-time="new Date().getTime() + 60000">
                                    <template v-slot:process="{ timerOutput }"> -->
                                      
                                <div class="d-flex">
                                    <div class="d-iline text-center" style="margin-left: 12px;">
                                        <div style="max-width:50px">
                                            <div class="radius_gradient" style="border-radius:10px">
                                                <div class="str_green_gradient text-center"
                                                    style="width:49px; height:49px; border-radius: 10px;">
                                                    <span
                                                        style="font-family: monospace;font-style: normal;font-weight: 400;font-size: 25px; color: #2BFF4D">{{ timerOutput.d }}</span><br>
                                                </div>
                                            </div>
                                        </div>
                                        <div>D</div>
                                    </div>
                                    <div class="d-iline text-center" style="margin-left: 12px;">
                                        <div style="max-width:50px">
                                            <div class="radius_gradient" style="border-radius:10px">
                                                <div class="str_green_gradient text-center"
                                                    style="width:49px ; height:49px ; border-radius: 10px;">
                                                    <span
                                                        style="font-family: monospace;font-style: normal;font-weight: 400;font-size: 25px; color: #2BFF4D">{{ timerOutput.h }}</span><br>
                                                </div>
                                            </div>
                                        </div>
                                        <div>H</div>
                                    </div>
                                    <div class="d-iline text-center" style="margin-left: 12px;">
                                        <div style="max-width:50px">
                                            <div class="radius_gradient" style="border-radius:10px">
                                                <div class="str_green_gradient text-center"
                                                    style="width:49px ; height:49px ; border-radius: 10px;">
                                                    <span
                                                        style="font-family: monospace;font-style: normal;font-weight: 400;font-size: 25px; color: #2BFF4D">{{ timerOutput.m }}</span><br>
                                                </div>
                                            </div>
                                        </div>
                                        <div>M</div>
                                    </div>
                                    <div class="d-iline text-center" style="margin-left: 12px;">
                                        <div style="max-width:50px">
                                            <div class="radius_gradient" style="border-radius:10px">
                                                <div class="str_green_gradient text-center"
                                                    style="width:49px ; height:49px ; border-radius: 10px;">
                                                    <span
                                                        style="font-family: monospace;font-style: normal;font-weight: 400;font-size: 25px; color: #2BFF4D">{{ timerOutput.s }}</span><br>
                                                </div>
                                            </div>
                                        </div>
                                        <div>S</div>
                                    </div>
                                </div>
                                <!-- </template> -->
                                <!-- <template v-slot:finish>
                                        <div class="d-flex">
                                            <div class="d-iline text-center" style="margin-left: 12px;">
                                                <div style="max-width:50px">
                                                    <div class="radius_gradient" style="border-radius:10px">
                                                        <div class="str_green_gradient text-center"
                                                            style="width:49px; height:49px; border-radius: 10px;">
                                                            <span
                                                                style="font-family: monospace;font-style: normal;font-weight: 400;font-size: 25px; color: #2BFF4D">0</span><br>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>D</div>
                                            </div>
                                            <div class="d-iline text-center" style="margin-left: 12px;">
                                                <div style="max-width:50px">
                                                    <div class="radius_gradient" style="border-radius:10px">
                                                        <div class="str_green_gradient text-center"
                                                            style="width:49px ; height:49px ; border-radius: 10px;">
                                                            <span
                                                                style="font-family: monospace;font-style: normal;font-weight: 400;font-size: 25px; color: #2BFF4D">00</span><br>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>H</div>
                                            </div>
                                            <div class="d-iline text-center" style="margin-left: 12px;">
                                                <div style="max-width:50px">
                                                    <div class="radius_gradient" style="border-radius:10px">
                                                        <div class="str_green_gradient text-center"
                                                            style="width:49px ; height:49px ; border-radius: 10px;">
                                                            <span
                                                                style="font-family: monospace;font-style: normal;font-weight: 400;font-size: 25px; color: #2BFF4D">00</span><br>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>M</div>
                                            </div>
                                            <div class="d-iline text-center" style="margin-left: 12px;">
                                                <div style="max-width:50px">
                                                    <div class="radius_gradient" style="border-radius:10px">
                                                        <div class="str_green_gradient text-center"
                                                            style="width:49px ; height:49px ; border-radius: 10px;">
                                                            <span
                                                                style="font-family: monospace;font-style: normal;font-weight: 400;font-size: 25px; color: #2BFF4D">00</span><br>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>S</div>
                                            </div>
                                        </div>
                                    </template> -->
                                <!-- </vac> -->

                            </div>
                            <!-- <div v-if="coindata.next_unlock_date_text || coindata.next_unlock_date"
                                class="d-inline ml-2 mt-1" style="border-radius: 10px; margin-left: 45px;">

                                <button v-if="notified == true" @click="notifyMe(coindata.symbol,'none')"
                                    class="rounded-pill px-2 " style=" padding: 8px; font-size: 14px;">
                                    <i>
                                        <font-awesome-icon icon="fa-solid fa-bell" />
                                    </i>
                                    Remove Notification</button>
                                <div v-if="notified == true" style="font-size:12px">Will be notified:
                                    {{ notifyList(notifiedType) }} the unlock</div>
                                <b-dropdown
                                    v-if="validateDateRange(coindata.next_unlock_date_text , coindata.next_unlock_date)"
                                    size="lg" variant="flat-secondary" style="padding:0px !important;"
                                    id="notify-dropdown" no-caret class="cunningDrop-notify">
                                    <template #button-content class="p-0 text-left">
                                        <button v-if="notified != true" class="rounded-pill px-2 "
                                            style=" padding: 8px; font-size: 14px;">
                                            <i>
                                                <font-awesome-icon icon="fa-solid fa-bell" />
                                            </i>
                                            Notify Me</button>


                                    </template>
                                    <b-dropdown-form href="#" v-if="notified != true"
                                        class="cunningDrop-notify-form dropdown-mine darkBackgroundBlack "
                                        name="dropdownform2" style="z-index:999;">
                                        <b-dropdown-item href="#"
                                            v-if="checkdateinertval(coindata.next_unlock_date,coindata.next_unlock_date_text,'1-month-before',)"
                                            @click="notifyMe(coindata.symbol,'1-month-before')">1 Month before
                                        </b-dropdown-item>
                                        <b-dropdown-item href="#"
                                            v-if="checkdateinertval(coindata.next_unlock_date,coindata.next_unlock_date_text,'2-weeks-before')"
                                            @click="notifyMe(coindata.symbol,'2-weeks-before')">2 weeks before
                                        </b-dropdown-item>
                                        <b-dropdown-item href="#"
                                            v-if="checkdateinertval(coindata.next_unlock_date,coindata.next_unlock_date_text,'1-week-before')"
                                            @click="notifyMe(coindata.symbol,'1-week-before')">1 week before
                                        </b-dropdown-item>
                                        <b-dropdown-item href="#"
                                            v-if="checkdateinertval(coindata.next_unlock_date,coindata.next_unlock_date_text,'2-days-before')"
                                            @click="notifyMe(coindata.symbol,'2-days-before')">2 days before
                                        </b-dropdown-item>
                                        <b-dropdown-item href="#"
                                            v-if="checkdateinertval(coindata.next_unlock_date,coindata.next_unlock_date_text,'12-hours-before')"
                                            @click="notifyMe(coindata.symbol,'12-hours-before')">12 hours
                                            before
                                        </b-dropdown-item>
                                        <b-dropdown-item href="#"
                                            v-if="checkdateinertval(coindata.next_unlock_date,coindata.next_unlock_date_text,'10-min-before')"
                                            @click="notifyMe(coindata.symbol,'10-min-before')">10
                                            minutes before
                                        </b-dropdown-item>
                                        <b-dropdown-item href="#" @click="notifyMe(coindata.symbol,'on-time')">
                                            On-time</b-dropdown-item>
                                    </b-dropdown-form>

                                </b-dropdown>
                                <b-dropdown v-else size="lg" variant="flat-secondary" style="padding:0px !important;"
                                    id="notify-dropdown" no-caret class="cunningDrop-notify">
                                    <template #button-content class="p-0">
                                        <button v-if="notified != true" class="rounded-pill px-2 "
                                            style=" padding: 8px; font-size: 14px; background-color: gray;">
                                            <i>
                                                <font-awesome-icon icon="fa-solid fa-bell" />
                                            </i>
                                            Notify Me</button>
                                    </template>

                                </b-dropdown>

                                <button v-if="notified != true" class="rounded-pill px-2" style="padding:6px"
                                    @click="notifyMe(coindata.symbol)">
                                    <i>
                                        <font-awesome-icon icon="fa-solid fa-bell" />
                                    </i>
                                    Notify Me</button>
                                <button v-else class="rounded-pill px-2" style="padding:6px"
                                    @click="notifyMe(coindata.symbol)">
                                    <i>
                                        <font-awesome-icon icon="fa-solid fa-bell" />
                                    </i>
                                    Remove Notification</button>
                            </div> -->
                        </div>
                        <div no class="mb-1">
                            <div style=" margin-top: 19px;">
                                <b-row class="">
                                    <!-- <b-col cols="12" md="6" class="mb-1" xl="6"
                                                        v-if="coindata.next_unlock_date_text">
                                                        <div class="">
                                                            <div class="mr-1">Next Unlock Date: </div>
                                                            <div style="font-weight:600" class=""
                                                                :class="{'blurry-text' :checkUserPlan(coindata.market_cap_rank)}">
                                                                {{coindata.next_unlock_date_text}}</div>
                                                        </div>
                                                    </b-col> -->
                                    <b-col cols="12" md="6" class="mb-1" xl="6" v-if="coindata.next_unlock_status">
                                        <div class="">
                                            <div class="mr-1">Next Unlock Status: </div>
                                            <div style="font-weight:600" class=""
                                                :class="{'blurry-text' :checkUserPlan(coindata.market_cap_rank)}">
                                                {{coindata.next_unlock_status}}</div>
                                        </div>
                                    </b-col>

                                    <b-col cols="12" md="6" class="mb-1" xl="6" v-if="coindata.first_vc_unlock">
                                        <div class="mr-1">First VC Unlock: </div>
                                        <div v-if="checkUserPlan(coindata.market_cap_rank)" style="font-weight:600"
                                            class="blurry-text">
                                            {{coindata.first_vc_unlock}}
                                        </div>
                                        <div v-else style="font-weight:600">
                                            {{dateFormat(coindata.first_vc_unlock)}}
                                        </div>
                                    </b-col>
                                    <b-col cols="12" md="6" class="mb-1" xl="6" v-if="coindata.end_vc_unlock">
                                        <div class="mr-1">End VC Unlock: </div>
                                        <div v-if="checkUserPlan(coindata.market_cap_rank)" style="font-weight:600"
                                            class="blurry-text">
                                            {{coindata.end_vc_unlock}}
                                        </div>
                                        <div v-else style="font-weight:600">
                                            {{dateFormat(coindata.end_vc_unlock)}}
                                        </div>


                                    </b-col>
                                    <b-col cols="12" md="6" class="mb-1" xl="6"
                                        v-if="coindata.next_unlock_number_of_tokens">
                                        <div class="mr-1">Next Unlock Number Of Tokens: </div>
                                        <div v-if="checkUserPlan(coindata.market_cap_rank)" style="font-weight:600"
                                            class="blurry-text">
                                            {{coindata.next_unlock_number_of_tokens}}</div>
                                        <div v-else style="font-weight:600">
                                            {{toInterNationalNumber(coindata.next_unlock_number_of_tokens)}}
                                        </div>
                                    </b-col>

                                    <b-col cols="12" md="6" class="mb-1" xl="6"
                                        v-if="coindata.next_unlock_percent_of_tokens">
                                        <div class="">
                                            <div class="mr-1">Next Unlock Percent Of Tokens: </div>
                                            <div v-if="checkUserPlan(coindata.market_cap_rank)" style="font-weight:600"
                                                class="blurry-text">
                                                {{ coindata.next_unlock_percent_of_tokens }}
                                            </div>
                                            <div style="font-weight:600" v-else>
                                                {{roundData(coindata.next_unlock_percent_of_tokens)}}
                                                %</div>
                                        </div>
                                    </b-col>
                                    <b-col cols="12" md="6" class="mb-1" xl="6" v-if="coindata.next_unlock_size">
                                        <div class="mr-1">Next Unlock Size: </div>
                                        <div class="" style="font-weight:600"
                                            :class="{'blurry-text' :checkUserPlan(coindata.market_cap_rank)}">
                                            {{coindata.next_unlock_size}}</div>
                                    </b-col>
                                    <b-col cols="12" md="6" class="mb-1" xl="6" v-if="coindata.seed_price">
                                        <div class="">
                                            <div class="mr-1">Seed Price: </div>
                                            <div v-if="checkUserPlan(coindata.market_cap_rank)" style="font-weight:600"
                                                class="blurry-text">
                                                {{ coindata.seed_price }}
                                            </div>
                                            <div style="font-weight:600" v-else>
                                                {{toInterNationalNumber(coindata.seed_price)}}
                                            </div>
                                        </div>
                                    </b-col>
                                    <b-col cols="12" md="6" class="mb-1" xl="6" v-if="coindata.roi_seed">
                                        <div class="">
                                            <div class="mr-1">ROI Seed: </div>
                                            <div v-if="checkUserPlan(coindata.market_cap_rank)" style="font-weight:600"
                                                class="blurry-text">
                                                {{ coindata.roi_seed }}
                                            </div>
                                            <div style="font-weight:600" v-else>
                                                ${{coindata.roi_seed}}
                                            </div>
                                        </div>
                                    </b-col>
                                    <b-col cols="12" md="6" class="mb-1" xl="6" v-if="coindata.total_locked">
                                        <div class="">
                                            <div class="mr-1">Total Locked: </div>
                                            <div v-if="checkUserPlan(coindata.market_cap_rank)" style="font-weight:600"
                                                class="blurry-text">
                                                {{ coindata.total_locked }}
                                            </div>
                                            <div style="font-weight:600" v-else>
                                                {{toInterNationalNumber(coindata.total_locked)}}
                                            </div>
                                        </div>
                                    </b-col>
                                    <b-col cols="12" md="6" class="mb-1" xl="6"
                                        v-if="coindata.three_months_unlock_number_of_tokens">
                                        <div class="">
                                            <div class="mr-1">3 Months Unlock # of Tokens </div>
                                            <div v-if="checkUserPlan(coindata.market_cap_rank)" style="font-weight:600"
                                                class="blurry-text">
                                                {{ coindata.three_months_unlock_number_of_tokens }}
                                            </div>
                                            <div style="font-weight:600" v-else>
                                                {{toInterNationalNumber(coindata.three_months_unlock_number_of_tokens)}}
                                            </div>
                                        </div>
                                    </b-col>
                                    <b-col cols="12" md="6" class="mb-1" xl="6"
                                        v-if="coindata.three_months_unlock_percent_of_tokens">
                                        <div class="">
                                            <div class="mr-1">3 Months Unlock Tokens % </div>
                                            <div v-if="checkUserPlan(coindata.market_cap_rank)" style="font-weight:600"
                                                class="blurry-text">
                                                {{ coindata.three_months_unlock_percent_of_tokens }}
                                            </div>
                                            <div style="font-weight:600" v-else>
                                                {{roundData(coindata.three_months_unlock_percent_of_tokens)}}%
                                            </div>
                                        </div>
                                    </b-col>
                                    <b-col cols="12" md="6" class="mb-1" xl="6"
                                        v-if="coindata.three_months_unlock_size">
                                        <div class="">
                                            <div class="mr-1">3 Months Unlock Tokens % </div>
                                            <div v-if="checkUserPlan(coindata.market_cap_rank)" style="font-weight:600"
                                                class="blurry-text">
                                                {{ coindata.three_months_unlock_size }}
                                            </div>
                                            <div style="font-weight:600" v-else>
                                                {{coindata.three_months_unlock_size}}
                                            </div>
                                        </div>
                                    </b-col>

                                    <b-col cols="12" md="6" class="mb-1" xl="6"
                                        v-if="coindata.six_months_unlock_number_of_tokens">
                                        <div class="">
                                            <div class="mr-1">6 Months Unlock # of Tokens </div>
                                            <div v-if="checkUserPlan(coindata.market_cap_rank)" style="font-weight:600"
                                                class="blurry-text">
                                                {{ coindata.six_months_unlock_number_of_tokens }}
                                            </div>
                                            <div style="font-weight:600" v-else>
                                                {{toInterNationalNumber(coindata.six_months_unlock_number_of_tokens)}}
                                            </div>
                                        </div>
                                    </b-col>
                                    <b-col cols="12" md="6" class="mb-1" xl="6"
                                        v-if="coindata.six_months_unlock_percent_of_tokens">
                                        <div class="">
                                            <div class="mr-1">6 Months Unlock Tokens % </div>
                                            <div v-if="checkUserPlan(coindata.market_cap_rank)" style="font-weight:600"
                                                class="blurry-text">
                                                {{ coindata.six_months_unlock_percent_of_tokens }}
                                            </div>
                                            <div style="font-weight:600" v-else>
                                                {{roundData(coindata.six_months_unlock_percent_of_tokens)}}%
                                            </div>
                                        </div>
                                    </b-col>
                                    <b-col cols="12" md="6" class="mb-1" xl="6" v-if="coindata.six_months_unlock_size">
                                        <div class="">
                                            <div class="mr-1">6 Months Unlock Tokens % </div>
                                            <div v-if="checkUserPlan(coindata.market_cap_rank)" style="font-weight:600"
                                                class="blurry-text">
                                                {{ coindata.six_months_unlock_size }}
                                            </div>
                                            <div style="font-weight:600" v-else>
                                                {{coindata.six_months_unlock_size}}
                                            </div>
                                        </div>
                                    </b-col>
                                    <b-col cols="12" md="6" class="mb-1" xl="6" v-if="coindata.total_supply_percent">
                                        <div class="">
                                            <div class="mr-1">Total Supply %</div>
                                            <div v-if="checkUserPlan(coindata.total_supply_percent)"
                                                style="font-weight:600" class="">
                                                {{ coindata.total_supply_percent}} %
                                            </div>
                                            <div style="font-weight:600" v-else>
                                                {{coindata.total_supply_percent}}%
                                            </div>
                                        </div>
                                    </b-col>

                                    <b-col cols="12" md="12">
                                        <span class="mr-1">Supply chart: </span>
                                        <div>

                                            <vue-apex-charts type="donut" height="300" :options="supplyChart.chartOptions"
                                                :series="supplyChart.series" />
                                        </div>
                                    </b-col>

                                    <b-col v-if="vestingDataChart.xaxis.categories.length>0">
                                        <span class="mr-1">Vesting Chart: </span>


                                        <vue-apex-charts class="full" width="100%" :dataLabels="true" type="area"
                                            height="290" :options="vestingDataChart" :series="vestingDataSerice">
                                        </vue-apex-charts>
                                    </b-col>

                                </b-row>

                            </div>
                        </div>
                    </b-accordion-item>
                    <b-accordion-item class="w-100" v-if="TradeHistoryseries[0].data.length>0"
                        title="Trading Volume History">
                        <div>
                            <vue-apex-charts class="full" width="100%" :dataLabels="true" type="line" height="290"
                                :options="TradeHistoryOptions" :series="TradeHistoryseries">
                            </vue-apex-charts>
                        </div>
                    </b-accordion-item>
                    <b-accordion-item class="w-100" title="Exchanges">
                        <ExchangesTable :token="coindata" />

                    </b-accordion-item>


                </b-accordion>
            </div>
            <div class="details-modal-container" :class="{'loadingModal':!dataloaded}" v-if="!dataloaded">
                <div class="w-full justify-content-between d-flex  h-[70vh]"
                    style="margin-top: 10px; margin-left: 10px;">
                </div>
            </div>
        </b-overlay>
    </div>
</template>
<script>
    /* import font awesome icon component */
    import {
        FontAwesomeIcon
    } from '@fortawesome/vue-fontawesome'

    /* import specific icons */

    import axios from 'axios'
    import VueApexCharts from "vue3-apexcharts";
    import ExchangesTable from './ExchangesTable.vue'
    import BootstrapVue3, {
        BTable,
        BTabs,
        BTab,
        BFormCheckbox,
        BAvatar,
        BImg,
        BBadge,
        BPagination,
        BRow,
        BCol,
        BCard,
        BCardHeader,
        BCardBody,
        BModal,

        BDropdown,
        BDropdownItem,
        BDropdownForm,
        BFormRadioGroup,
        BFormRadio,
        BInputGroup,
        BInputGroupAppend,
        BFormInput,
        BButton,
        BFormGroup,
        BCollapse,
        BCardText,
        BFormSelect,
        BFormSelectOption,
        BSpinner,
        BAccordion,
        BOverlay,
    } from 'bootstrap-vue-3'
    import {
        copyText
    } from 'vue3-clipboard'
    import {
        library
    } from '@fortawesome/fontawesome-svg-core'
    import {
        faTwitter
    } from '@fortawesome/free-brands-svg-icons'
    import {
        faCopy
    } from '@fortawesome/free-regular-svg-icons'
    import {
        faLock,
        faBell,
        faChevronDown,
        faChevronUp
    } from '@fortawesome/free-solid-svg-icons'
    library.add(faTwitter, faCopy, faLock, faBell, faChevronDown, faChevronUp)
    import Ripple from 'vue3-whr-ripple-directive'
    export default {
        components: {
            FontAwesomeIcon,
            BootstrapVue3,
            BTable,
            BAccordion,
            BTabs,
            BTab,
            BFormCheckbox,
            BAvatar,
            BImg,
            BBadge,
            BPagination,
            BRow,
            BCol,
            BCard,
            BCardHeader,
            BCardBody,
            BModal,

            BDropdown,
            BDropdownItem,
            BDropdownForm,
            BFormRadioGroup,
            BFormRadio,
            BInputGroup,
            BInputGroupAppend,
            BFormInput,
            BButton,
            BFormGroup,
            BCollapse,
            BCardText,
            BFormSelect,
            BFormSelectOption,
            BSpinner,
            BOverlay,
            VueApexCharts,
            ExchangesTable
        },
        directives: {
            Ripple,

        },
        props: {
            coin: String,
            active: Boolean
        },
        data() {
            return {
                countDownToTime: null,
                countDownToTime2: null,
                timerOutput: [],
                coindata: [],
                dataloaded: false,
                supplyChart: {
                    series: [],

                    chartOptions: {
                        tooltip: {
                            enabled: true,
                            custom: function ({
                                series,
                                seriesIndex,
                                dataPointIndex,
                                w
                            }) {
                                let total = 0;
                                for (let x of series) {
                                    total += x;
                                }
                                let selected = series[seriesIndex]
                                return w.config.labels[seriesIndex] + ": " + selected + "(" + (selected / total *
                                    100).toFixed(2) + "%)";
                            }
                        },
                        chart: {
                            width: 300,
                            type: 'pie',
                        },
                        legend: {
                            show: true,
                            position: 'bottom',
                            fontSize: '14px',
                            fontFamily: 'Montserrat',
                            colors: '#00d4bd',
                            labels: {
                                show: true,
                                colors: '#78909C',
                            },
                        },


                        colors: [
                            '#00d4bd',
                            '#826bf8',
                            '#2b9bf4',
                            '#FFA1A1',
                        ],
                        dataLabels: {
                            enabled: true,
                            formatter(val) {
                                // eslint-disable-next-line radix
                                return `${parseInt(val)}%`
                            },
                        },

                        labels: ['Locked', 'Unlocked', 'Next Unlock'],
                        responsive: [{
                                breakpoint: 992,
                                options: {
                                    chart: {
                                        height: 380,
                                    },
                                    legend: {
                                        position: 'bottom',
                                    },
                                },
                            },

                        ],
                    },
                },
                userData: {
                    currentPlan: 'dadad'
                },
                notifiedType: '',
                notified: false,
                Price_DaysChartseries: [{
                    name: '24 Hours History',
                    data: []
                }],
                Price_DaysChart: {

                    chart: {
                        toolbar: {
                            show: false,
                        },
                        id: '7days-history',
                        height: 290,
                        foreColor: 'black'
                    },
                    dataLabels: {
                        enabled: false
                    },
                    colors: ['#50DC5F'],
                    fill: {
                        shade: 'dark',
                        type: 'gradient',
                        gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.7,
                            gradientToColors: ['#50DC5F 30%'],
                            stops: [0, 90, 100]
                        }
                    },
                    xaxis: {
                        axisBorder: {
                            show: true,
                            color: '#78909C',
                            offsetX: 0,
                            offsetY: 0
                        },
                        labels: {
                            show: true,
                            style: {
                                colors: '#78909C',
                            },
                            x: {
                                format: "dd.MM.yyyy HH:mm"
                            }
                        },
                        categories: [],
                        type: 'datetime',
                    },

                    grid: {
                        show: true,
                        borderColor: '#424244',
                        strokeDashArray: 0,
                        position: 'back',
                        xaxis: {
                            lines: {
                                show: false
                            }
                        },
                        yaxis: {
                            lines: {
                                show: true
                            }
                        },
                        row: {
                            colors: undefined,
                            opacity: 0.5
                        },
                        column: {
                            colors: undefined,
                            opacity: 0.5
                        },

                    },
                    yaxis: {
                        axisBorder: {
                            show: true,
                            color: '#78909C',
                            offsetX: 0,
                            offsetY: 0
                        },
                        type: "value",
                        labels: {
                            show: true,
                            style: {
                                colors: '#78909C',
                            },
                            formatter: function (value) {
                                return value.toFixed(2);
                            }
                        },
                    },
                    stroke: {
                        show: true,
                        curve: 'smooth',
                        lineCap: 'butt',
                        width: 2,
                        dashArray: 0,
                        labels: {
                            show: true,
                            hideOverlappingLabels: true,
                        }
                    },
                    tooltip: {
                        style: {
                            colors: '#78909C',

                        },
                        shared: false,
                        y: {
                            formatter: function (value) {
                                let val =  new Intl.NumberFormat('en-US', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 15,
                                }).format(value);
                                return '$'+val
                            }
                        },
                        x: {
                            format: "dd.MM.yyyy HH:mm"
                        }

                    },

                },
                MC_DaysChartseries: [{
                    name: '24 Hours History',
                    data: []
                }],
                MC_DaysChart: {

                    chart: {
                        toolbar: {
                            show: false,
                        },
                        id: '7days-history',
                        height: 290,
                        foreColor: 'black'
                    },
                    dataLabels: {
                        enabled: false
                    },
                    colors: ['#50DC5F'],
                    fill: {
                        shade: 'dark',
                        type: 'gradient',
                        gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.7,
                            gradientToColors: ['#50DC5F 30%'],
                            stops: [0, 90, 100]
                        }
                    },
                    xaxis: {
                        axisBorder: {
                            show: true,
                            color: '#78909C',
                            offsetX: 0,
                            offsetY: 0
                        },
                        labels: {
                            show: true,
                            style: {
                                colors: '#78909C',
                            },
                            x: {
                                format: "dd.MM.yyyy HH:mm"
                            }
                        },
                        categories: [],
                        type: 'datetime',
                    },

                    grid: {
                        show: true,
                        borderColor: '#424244',
                        strokeDashArray: 0,
                        position: 'back',
                        xaxis: {
                            lines: {
                                show: false
                            }
                        },
                        yaxis: {
                            lines: {
                                show: true
                            }
                        },
                        row: {
                            colors: undefined,
                            opacity: 0.5
                        },
                        column: {
                            colors: undefined,
                            opacity: 0.5
                        },

                    },
                    yaxis: {
                        axisBorder: {
                            show: true,
                            color: '#78909C',
                            offsetX: 0,
                            offsetY: 0
                        },
                        type: "value",
                        labels: {
                            show: true,
                            style: {
                                colors: '#78909C',
                            },
                            formatter: function (value) {
                                return value.toFixed(2);
                            }
                        },
                    },
                    stroke: {
                        show: true,
                        curve: 'smooth',
                        lineCap: 'butt',
                        width: 2,
                        dashArray: 0,
                        labels: {
                            show: true,
                            hideOverlappingLabels: true,
                        }
                    },
                    tooltip: {
                        style: {
                            colors: '#78909C',

                        },
                        shared: false,
                        y: {
                            formatter: function (value) {
                                let val =  new Intl.NumberFormat('en-US', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 15,
                                }).format(value);
                                return '$'+val
                            }
                        },
                        x: {
                            format: "dd.MM.yyyy HH:mm"
                        }

                    },

                },
                chartType: 'cp',
                intervalChat: '24',
                vestingDataSerice: [{
                    name: '7 Days History',
                    data: []
                }],
                vestingDataChart: {

                    chart: {
                        toolbar: {
                            show: false,
                        },
                        id: '7days-history',
                        height: 290,
                        foreColor: 'black',
                        stacked: true,
                    },
                    dataLabels: {
                        enabled: false
                    },
                    colors: ['#50DC5F', '#9351db', '#51b8db', '#0e181c', '#718187', '#e5a0bd', '#8ca837', '#bcf21a',
                        '#d35a2a', '#f4e111'
                    ],

                    fill: {
                        // shade: 'dark',
                        // type: 'gradient',
                        gradient: {
                            // shadeIntensity: 1,
                            // opacityFrom: 0.7,
                            // gradientToColors: ['#50DC5F 30%'],
                            // stops: [0, 90, 100]
                        }
                    },
                    xaxis: {
                        axisBorder: {
                            show: true,
                            color: '#78909C',
                            offsetX: 0,
                            offsetY: 0
                        },
                        labels: {
                            show: true,
                            style: {
                                colors: '#78909C',
                            },
                            x: {
                                format: "dd.MM.yyyy HH:mm"
                            }
                        },
                        categories: [],
                        type: 'datetime',
                    },

                    grid: {
                        show: true,
                        borderColor: '#424244',
                        strokeDashArray: 0,
                        position: 'back',
                        xaxis: {
                            lines: {
                                show: false
                            }
                        },
                        yaxis: {
                            lines: {
                                show: true
                            }
                        },
                        row: {
                            colors: undefined,
                            opacity: 0.5
                        },
                        column: {
                            colors: undefined,
                            opacity: 0.5
                        },

                    },
                    yaxis: {
                        axisBorder: {
                            show: true,
                            color: '#78909C',
                            offsetX: 0,
                            offsetY: 0
                        },
                        type: "value",
                        labels: {
                            show: true,
                            style: {
                                colors: '#78909C',
                            },
                            formatter: function (value) {
                                return value.toFixed(0);
                            }
                        },
                    },
                    stroke: {
                        show: true,
                        curve: 'smooth',
                        lineCap: 'butt',
                        width: 2,
                        dashArray: 0,
                        labels: {
                            show: true,
                            hideOverlappingLabels: true,
                        }
                    },
                    tooltip: {
                        // style: {
                        //     colors: '#78909C',

                        // },
                        // shared: false,
                        // y: {
                        //     formatter: function (value) {
                        //         return new Intl.NumberFormat('en-US', {
                        //             minimumFractionDigits: 0,
                        //             maximumFractionDigits: 15,
                        //         }).format(value);
                        //     }
                        // },
                        // x: {
                        //     format: "dd.MM.yyyy HH:mm"
                        // }
                        x: {
                            show: true,
                            format: 'dd MMM yyyy',
                            formatter: undefined,
                        },

                    },

                },
                selectedContract: null,
                TradeHistoryOptions: {
                    yaxis: {
                        labels: {
                            style: {
                                colors: '#78909C',
                            }
                        },

                    },
                    chart: {
                        id: 'trading-history',
                        height: 290,
                        background: '#54b9eb'
                    },
                    xaxis: {
                        labels: {
                            style: {
                                colors: '#78909C',
                            }
                        },
                        categories: [],
                        type: 'datetime',
                    },

                    colors: ['#54b9eb'],
                    stroke: {
                        show: true,
                        curve: 'smooth',
                        lineCap: 'butt',
                        width: 1,
                        dashArray: 0,
                        labels: {
                            show: true,
                            hideOverlappingLabels: true,
                        }
                    },
                    tooltip: {
                        style: {
                            colors: '#78909C',

                        },
                        shared: false,
                        x: {
                            format: "dd.MM.yyyy HH:mm"
                        }
                    },


                },
                TradeHistoryseries: [{
                    name: 'Trading Volume',
                    data: []
                }],
            }

        },
        methods: {
            doCopy(text) {
                copyText(text, undefined, (error, event) => {
                    if (error) {
                        alert('Can not copy')
                        console.log(error)
                    } else {
                        alert('Copied')
                        console.log(event)
                    }
                })
            },
            say(message) {
                alert("Please connect your metamask")
            },
            loadCoins() {
                this.selectedContract = null;
                this.dataloaded = false
                axios.post(`https://moonsniper.co/api/extension-coin-data-coingecko?coin=${this.coin}`)
                    .then(res => {
                        if (res.data.status == true) {
                            this.coindata = res.data.coin;
                            this.supplyChart.series = [];

                            this.MC_DaysChartseries[0].data = [];
                            this.vestingDataChart.xaxis.categories = [];
                            this.vestingDataSerice = [];
                            if (typeof this.coindata.contract_address == 'string') {
                                this.coindata.contract_address = JSON.parse(this.coindata.contract_address);
                            }
                             this.loadMCHistoryChart('24',1);
                          this.loadPriceHistoryChart('24');
                            this.loadSupplyChart();
                            this.loadVestingChart();
                            this.loadTradeHystory();
                           
                            this.dataloaded = true;
                        }

                    })
            },
            loadSupplyChart() {
                if (this.coindata.max_supply != null || this.coindata.circulating_supply !=
                    null ||
                    this
                    .coindata.next_unlock_number_of_tokens != null ||
                    this.coindata.three_months_unlock_number_of_tokens != null && this
                    .coindata
                    .six_months_unlock_number_of_tokens != null) {
                    var ms = parseFloat(this.coindata.max_supply);
                    if (isNaN(ms))
                        ms = 0.0;
                    var cs = parseFloat(this.coindata.circulating_supply);
                    if (isNaN(cs))
                        cs = 0.0;

                    var nt = parseFloat(this.coindata.next_unlock_number_of_tokens);
                    if (isNaN(nt))
                        nt = 0.0;
                    var val1 = Math.max(ms - cs - nt, 0.0);
                    var val2 = cs;
                    var val3 = nt;
                    this.supplyChart.series = [val1, val2, val3];

                }

            },
            loadTradeHystory() {
                this.TradeHistoryOptions.xaxis.categories = [];
                axios.post(`https://moonsniper.co/api/get_trading_volume_history-extension`, {
                        coin_id: this.coindata.coin_id,
                        symbol: this.coindata.symbol
                    })
                    .then(res => {
                        this.TradeHistoryOptions.xaxis.categories = [];
                        this.TradeHistoryseries[0].data = [];
                        if (res.data[0] && res.data[0].trading_volume_history_json) {
                            this.coindata.trading_volume_history_json = JSON.parse(res.data[0]
                                .trading_volume_history_json);
                            if (this.coindata.trading_volume_history_json.total_volumes) {
                                this.coindata.trading_volume_history_json.total_volumes.forEach(
                                    element => {
                                        this.TradeHistoryseries[0].data.push([parseInt(element[0]),
                                            parseInt(
                                                element[1])
                                        ])
                                    })
                            }


                        }



                    })

            },
            loadVestingChart() {
                if (this.coindata.vesting_chart != null) {
                    let vestingData = JSON.parse(this.coindata.vesting_chart);
                    let keys = Object.keys(vestingData[0])
                    var filteredArray = keys.filter(function (e) {
                        return e !== 'name'
                    })

                    let dataval = [];
                    filteredArray.forEach((element, index) => {
                        this.vestingDataSerice[index] = {};
                        this.vestingDataSerice[index].name = element;
                        let oData = vestingData.map(item => item[element]);
                        this.vestingDataSerice[index].data = oData;
                    });


                    vestingData.forEach(element => {
                        const date = new Date(element.name);
                        const timestamp = date.getTime();
                        this.vestingDataChart.xaxis.categories.push(timestamp);
                    });

                    //   console.log(this.vestingDataSerice);
                }
            },
            toggleChartType(type)
            {
                if(type == 'cp')
                {
                    this.loadPriceHistoryChart(this.intervalChat)
                }else{
                    this.loadMCHistoryChart(this.intervalChat)
                }

            },
            loadHistoryChart(int)
            {
                this.intervalChat = int;
                if(this.chartType == 'cp')
                {
                    this.loadPriceHistoryChart(this.intervalChat)
                }else{
                    this.loadMCHistoryChart(this.intervalChat)
                }
            },
            loadPriceHistoryChart(type) {

                if(this.coindata.coingeckoid != null)
                {
                    axios.post('https://moonsniper.co/api/load-price-chart-by-coin', {
                        coingickoid: this.coindata.coingeckoid ? this.coindata.coingeckoid : 1,
                        type: type,
                    })
                    .then(res => {
                        let name = '24 hours price history'
                        switch (type) {
                            case '24':
                                name = '24 hours price history';
                                break;
                            case '7':
                                name = '7 days price history';
                                break;
                            case '14':
                                name = '14 days price history';
                                break;
                            case '30':
                                name = '30 days price history';
                                break;
                            case '90':
                                name = '90 days price history';
                                break;
                            case '365':
                                name = '365 days price history';
                                break;
                            case 'all':
                                name = 'All time price history';
                                break;
                            default:
                                name = 'All time price history';
                                break;
                        }
                        if (res.data.status) {
                            this.Price_DaysChartseries = [{
                                name: name,
                                data: res.data.chart
                            }];
                         this.chartType= 'cp';

                        }
                    })
          
                }
                 },
            loadMCHistoryChart(type,lev) {
                if(this.coindata.coingeckoid != null)
                {
                axios.post('https://moonsniper.co/api/load-mc-chart-by-coin', {
                        coingickoid: this.coindata.coingeckoid ? this.coindata.coingeckoid : 1,
                        type: type,
                    })
                    .then(res => {
                        let name = '24 hours market cap history'
                        switch (type) {
                            case '24':
                                name = '24 hours market cap history';
                                break;
                            case '7':
                                name = '7 days market cap history';
                                break;
                            case '14':
                                name = '14 days market cap history';
                                break;
                            case '30':
                                name = '30 days market cap history';
                                break;
                            case '90':
                                name = '90 days market cap history';
                                break;
                            case '365':
                                name = '365 days market cap history';
                                break;
                            case 'all':
                                name = 'All time market cap history';
                                break;
                            default:
                                name = 'All time history';
                                break;
                        }
                        if (res.data.status) {
                            this.MC_DaysChartseries = [{
                                name: name,
                                data: res.data.chart
                            }];
                            if(lev !=1)
                            {
                            this.chartType= 'mc';

                            }
                        }
                    })
                }
                },
            toInterNationalNumber(val) {
                if (val)
                    return new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 15,
                    }).format(val);
            },
            roundData(val) {
                if (val) {
                    return this.toInterNationalNumber(parseFloat(val).toFixed(2));
                }
            },
            roundData2(val, len) {
                if (val) {
                    return parseFloat(val).toFixed(len);
                }
            },
            xfromlunch(val, val2) {
                if (val2 == 'roi_times') {

                    return new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 15,
                    }).format(val.toFixed(2));
                } else {
                    var calculated_roi_x = val / val2;
                    return new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 15,
                    }).format(calculated_roi_x.toFixed(2));
                }

            },
            kFormatter(num) {
                return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' :
                    Math
                    .sign(
                        num) * Math.abs(num)
            },
            dateFormat2(val) {
                let d = new Date(val)
                if (!isNaN(d)) {
                    return d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
                }
            },
            dateFormat3(val) {
                if (val != null) {
                    let d = new Date(val)
                    if (!isNaN(d)) {
                        return [d.getMonth() + 1,
                            d.getDate(),
                            d.getFullYear()
                        ].join('.') + ' ' + [d.getHours() == 0 ? '00' : d.getHours(),
                            d.getMinutes() == 0 ? '00' : d.getMinutes(),
                            d.getSeconds() == 0 ? '00' : d.getSeconds()
                        ].join(':');
                    }
                }

            },
            getTimeStamp(data) {
                //alert(data);
                let d = new Date(data);
                if (data != null && !isNaN(d)) {
                    return d.getTime();
                } else {
                    return new Date().getTime();;
                }
            },
            notifyMe(symbol, type) {

                axios.post('api/notify-unlock-token', {
                    symbol: symbol,
                    type: type
                }).then(res => {

                    if (res.data.status == true) {
                        if (res.data.notification == 'sent') {
                            this.notified = true;
                        } else {
                            this.notified = false;
                        }
                        this.notifiedType = type;
                    }

                })


            },
            notifyList(item) {
                switch (item) {
                    case '1-month-before':
                        return '1 month before'
                        break;
                    case '2-weeks-before':
                        return '2 weeks before'
                        break;
                    case '1-week-before':
                        return '1 week before'
                        break;
                    case '2-days-before':
                        return '2 days before'
                        break;
                    case '12-hours-before':
                        return '12 hours before'
                        break;
                    case '10-min-before':
                        return '10 minutes before'
                        break;
                    case 'on-time':
                        return 'On time'
                        break;
                    default:
                        break;
                }
            },
            checkdateinertval(date, date_text, type) {
                let realDate;
                var d1 = new Date();

                if (date) {
                    realDate = date;
                } else if (date_text) {
                    let textMonth = date_text.slice(date_text.lastIndexOf(' ') + 1);
                    let reaStrDate = textMonth + " 1, " + d1.getFullYear() + " 00:00:00";
                    realDate = new Date(reaStrDate);
                }
                var d2 = new Date(realDate);
                var Difference_In_Time = d2.getTime() - d1.getTime();
                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                var diff = (Difference_In_Time) / 1000;
                diff /= 60;
                let Difference_In_Time_In_Minutes = Math.abs(Math.round(diff));
                if (type == '1-month-before') {

                    if (Difference_In_Days >= 30) {
                        return true;
                    } else {
                        return false
                    }
                }
                if (type == '2-weeks-before') {

                    if (Difference_In_Days >= 14) {
                        return true;
                    } else {
                        return false
                    }
                } else if (type == '1-week-before') {
                    if (Difference_In_Days >= 7) {
                        return true;
                    } else {
                        return false
                    }
                } else if (type == '2-days-before') {

                    if (Difference_In_Days >= 2) {
                        return true;
                    } else {
                        return false
                    }
                } else if (type == '12-hours-before') {

                    if (Difference_In_Time_In_Minutes >= 720) {
                        return true;
                    } else {
                        return false
                    }
                } else if (type == '10-min-before') {

                    if (Difference_In_Time_In_Minutes >= 10) {
                        return true;
                    } else {
                        return false
                    }
                } else if (type == 'on-time') {
                    return true
                } else {
                    return false
                }

            },
            validateDateRange(date_text, date) {
                let realDate;
                var d1 = new Date();
                if (date != null) {
                    realDate = date;
                } else if (date_text != null) {
                    let textMonth = date_text.slice(date_text.lastIndexOf(' ') + 1);
                    let reaStrDate = textMonth + " 1, " + d1.getFullYear() + " 00:00:00";
                    realDate = new Date(reaStrDate);

                } else {
                    return false
                }
                var d2 = new Date(realDate);
                if (d2.getTime() > d1.getTime()) {
                    return true;
                } else {
                    return false;
                }

            },
            getDateAndTime(date, type) {

                if (date != null) {
                    let d = new Date(date)
                    const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
                        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
                    ];
                    if (!isNaN(d)) {
                        if (type == 'date') {
                            return [
                                d.getDate(), monthNames[d.getMonth()],
                                d.getFullYear()
                            ].join(' ');
                        } else if (type == 'time') {
                            return [d.getHours() == 0 ? '00' : d.getHours(),
                                d.getMinutes() == 0 ? '00' : d.getMinutes(),
                                d.getSeconds() == 0 ? '00' : d.getSeconds(),
                            ].join(':');
                        }
                    }
                }
            },

            xfromlunch(val, val2) {
                if (val2 == 'roi_times') {

                    return new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 15,
                    }).format(val.toFixed(2));
                } else {
                    var calculated_roi_x = val / val2;
                    return new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 15,
                    }).format(calculated_roi_x.toFixed(2));
                }

            },
            checkUserPlan(val) {
                return false;
                if (this.userData.currentPlan == 'free' && val < 1 || this.userData.currentPlan == 'free' &&
                    val >=
                    5) {
                    return true;
                } else {
                    return false;
                }
            },
            calculate_social_score() {
                let rowdata = this.coindata;
                let score = 0;
                let total_apps = 0;
                total_apps = 0;
                if (rowdata.twitter != null)
                    total_apps = total_apps + 1;

                if (rowdata.telegram != null)
                    total_apps = total_apps + 1;

                if (rowdata.discord != null)
                    total_apps = total_apps + 1;

                if (rowdata.medium != null)
                    total_apps = total_apps + 1;

                if (rowdata.reddit != null)
                    total_apps = total_apps + 1;

                if (rowdata.whitepaper != null)
                    total_apps = total_apps + 1;

                if (rowdata.github != null)
                    total_apps = total_apps + 1;

                if (rowdata.twitter_followers != null) {
                    if (rowdata.telegram_members != null) {

                        if (parseInt(rowdata.twitter_followers) < 300000)
                            score = score + 1;

                        else if (parseInt(rowdata.twitter_followers) < 400000)
                            score = score + 2;

                        else if (parseInt(rowdata.twitter_followers) < 600000)
                            score = score + 3;

                        else if (parseInt(rowdata.twitter_followers) < 750000)
                            score = score + 4;

                        else if (parseInt(rowdata.twitter_followers) < 1000000)
                            score = score + 5;

                        else if (parseInt(rowdata.twitter_followers) > 1000000)
                            score = score + 6;
                        else
                            score = 0;


                        if (parseInt(rowdata.telegram_members) < 30000)
                            score = score + 1;

                        else if (parseInt(rowdata.telegram_members) < 50000)
                            score = score + 2;

                        else if (parseInt(rowdata.telegram_members) < 80000)
                            score = score + 3;

                        else if (parseInt(rowdata.telegram_members) > 80000)
                            score = score + 4;

                        else
                            score = score + 1;

                    } else {

                        if (parseInt(rowdata.twitter_followers) < 100000)
                            score = score + 1;

                        else if (parseInt(rowdata.twitter_followers) < 300000)
                            score = score + 2;

                        else if (parseInt(rowdata.twitter_followers) < 400000)
                            score = score + 4;

                        else if (parseInt(rowdata.twitter_followers) < 750000)
                            score = score + 6;

                        else if (parseInt(rowdata.twitter_followers) < 1000000)
                            score = score + 7;

                        else if (parseInt(rowdata.twitter_followers) > 1000000)
                            score = score + 8;

                        else
                            score = 0;

                    }
                } else {
                    if (rowdata.telegram_members != null) {

                        if (parseInt(rowdata.telegram_members) < 20000)
                            score = score + 1;

                        else if (parseInt(rowdata.telegram_members) < 40000)
                            score = score + 2;

                        else if (parseInt(rowdata.telegram_members) < 80000)
                            score = score + 4;

                        else if (parseInt(rowdata.telegram_members) < 120000)
                            score = score + 5;

                        else if (parseInt(rowdata.telegram_members) < 180000)
                            score = score + 6;

                        else if (parseInt(rowdata.telegram_members) < 500000)
                            score = score + 7;

                        else if (parseInt(rowdata.telegram_members) > 500000)
                            score = score + 8;
                        else
                            score = score + 1;


                    }
                }

                //Check the apps
                if (total_apps < 4)
                    score = score + 1;
                else if (total_apps >= 4)
                    score = score + 2;




                if (score > 10) {
                    score = 10;
                }

                return score;
            },
            isInThePast() {
               
            },
            startTimer: function () {
                this.countDownToTime = Math.round((new Date()).getTime() );
                this.countDownToTime2 = Math.round((new Date(this.coindata.next_unlock_date)).getTime() );
                
                if(this.countDownToTime2 > this.countDownToTime)
                {
                   
                const timeDifference = this.countDownToTime2 - this.countDownToTime;
                const millisecondsInOneSecond = 1000;
                const millisecondsInOneMinute = millisecondsInOneSecond * 60;
                const millisecondsInOneHour = millisecondsInOneMinute * 60;
                const millisecondsInOneDay = millisecondsInOneHour * 24;
                const differenceInDays = timeDifference / millisecondsInOneDay;
                const remainderDifferenceInHours = (timeDifference % millisecondsInOneDay) / millisecondsInOneHour;
                const remainderDifferenceInMinutes = (timeDifference % millisecondsInOneHour) /
                    millisecondsInOneMinute;
                const remainderDifferenceInSeconds = (timeDifference % millisecondsInOneMinute) /
                    millisecondsInOneSecond;
                const remainingDays = Math.floor(differenceInDays);
                const remainingHours = Math.floor(remainderDifferenceInHours);
                const remainingMinutes = Math.floor(remainderDifferenceInMinutes);
                const remainingSeconds = Math.floor(remainderDifferenceInSeconds);
                this.timerOutput.d = remainingDays;
                this.timerOutput.h = remainingHours;
                this.timerOutput.m = remainingMinutes;
                this.timerOutput.s = remainingSeconds;
                }else{
                    this.timerOutput.d = 0;
                this.timerOutput.h = '00';
                this.timerOutput.m = '00';
                this.timerOutput.s = '00';
                }
              
               
            }
        },
        mounted() {
            setInterval(() => {
                this.startTimer()
            }, 1000);
        },
        watch: {
            'active': function (newVal, oldVal) {
                if (newVal) {
                    this.loadCoins()
                }
            },
        }
    }
</script>
<style>
    #moon-app-popup .b-overlay-wrap.position-relative {}

    #moon-app-popup {
        max-height: 90vh;
        overflow-y: auto;
        overflow-x: hidden;
    }

    #moon-app-popup::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        cursor: pointer;
    }

    #moon-app-popup::-webkit-scrollbar-corner {
        background: rgba(0, 0, 0, 0);
        z-index: 999;
    }

    #moon-app-popup::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
        background-color: #ffffff;

    }


    .tw-dark #moon-app-popup .accordion-body {
        background: #232228 !important;
        border-color: #3b4253;
    }

    .accordion-body {}

    .MoonApp-div .accordion-item {

        font-family: 'Poppins-Light';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        border-left: none;
        border-right: none;
        border-top: none;
    }

    .tw-dark .MoonApp-div .accordion-item {

        color: fff !important;
        background: #232228 !important;
        border-color: #3b4253;
    }

    .tw-dark .MoonApp-div accordion-button:not(.collapsed) {
        color: #fff;
        background: #232228 !important;
        border-color: #3b4253;
        box-shadow: inset 0 calc(-1 * var(--bs-accordion-border-width)) 0 var(--bs-accordion-border-color);
    }

    .tw-dark .MoonApp-div {
        color: #fff !important;
    }

    .tw-dark .darkBackgroundBlack {
        background: #0A070E !important;
    }

    .tw-dark .chart-desc {
        color: white !important;
        font-size: 14px;
    }

    .tw-dark .chart-desc a {
        color: white !important;
    }

    .apexcharts-tooltip {
        background: #f3f3f3;
        color: #78909C;
    }

    .poppins-font {
        font-family: 'Poppins-Light';
    }

    /* Accordion CSS */
    button.accordion-button {
        font-family: 'Poppins-Light';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        padding-top: 14px;
        padding-bottom: 14px;
    }

    .tw-dark button.accordion-button {
        background: #232228 !important;
        border-color: #3b4253;
        color: white;
        opacity: 0.7;
    }

    .collapse-title {
        font-weight: 400;
        font-size: 16px;
        opacity: 0.7;
    }

    .tw-dark .str_green_gradient {
        background: linear-gradient(146.03deg, #2bff4d -241%, #1c1920 55.77%), white !important;
    }


    .tw-dark .accordion-body {
        background: #232228 !important;
        border-color: #3b4253;
        color: #fff;
    }

    .accordion-button:focus {
        z-index: 3;
        box-shadow: none !important;
        border-color: none !important;
        outline: 0px;
    }

    /*card css*/
    .inner-cbody {
        padding-left: 0px !important;
        padding-right: 0px !important;
        padding-top: 8px;
    }

    .tw-dark .card-body {
        background: #232228 !important;
        border-color: #3b4253;
        color: #fff;
    }

    #moon-app-popup .card {
        border: none;
    }

    .card-body .nav-tabs .nav-item.show .nav-link,
    .nav-tabs .nav-link.active {
        background: transparent !important;
        border: none !important;
    }

    .tw-dark .card-body .nav-tabs .nav-item.show .nav-link,
    .nav-tabs .nav-link.active {
        color: #fff !important;
    }

    .graph_tab-2 ul,
    .graph_tab-2 ul {
        display: flex !important;
        flex-wrap: nowrap !important;
        border: none;
    }

    .graph_tab-1 ul.nav.nav-tabs {
        border: none;
        margin-left: 87px;
    }

    .tw-dark .nav-link {
        color: #fff;
    }

    .graph_tab-2 ul.nav.nav-tabs button,
    .graph_tab ul.nav.nav-tabs button {
        padding: 0 !important;
        margin-right: 1rem;
    }

    .fs-6 {
        border-radius: 10px;
        font-size: 12px !important;
        font-weight: 400;
        font-family: 'Poppins-Light';
        background: white;
        font-style: normal;
        padding: 6px 11px;
        color: #322a2a;
    }

    .radius_gradient {
        background: linear-gradient(146.03deg, lime 7%, rgba(255, 255, 255, 0) 50%) !important;
    }

    .radius_gradient {
        margin: 10px;
        padding: 1px;
        border-radius: 30px;
    }

    .radius_gradient {
        max-width: 240px;
        /* margin: auto; */
    }

    .str_grey_gradient.card {
        margin-bottom: 0;
        border-radius: 30px;
    }

    .str_grey_gradient .card-body {
        border-radius: 29px;
        padding: 1rem;
        padding-top: 0.42rem;
        background: linear-gradient(146.03deg, #2bff4d -241%, #2c2b31 55.77%), white !important;
        border-bottom-left-radius: 26px;
        border-bottom-right-radius: 26px;
    }

    .soicalLable-2 {
        font-size: 15px !important;
        height: 30px;
    }

    .soicalLable.darkWhiteText.lableText {
        height: 32px;
    }

    .soicalLable {
        color: #fff;
    }

    .soicalLable {
        font-family: 'Poppins-Light';
        font-style: normal;
        font-weight: 500;
        font-size: 12px !important;
        opacity: 0.8;
    }

    .socialText2 {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-family: 'Poppins-Light';
        font-style: normal;
        font-weight: 600;
        font-size: 30px;
        height: 34px;
        color: #fff;
    }

    .accordion-button::after {
        background-size: 14px !important;
    }

    .tw-dark .accordion-button::after {
        --bs-accordion-btn-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='white'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
        --bs-accordion-btn-active-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='white'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");

    }

    .overlay-height {
        height: 80vh
    }

    .CopyButton {
        margin-right: 13px;
        background-color: transparent;
        cursor: pointer;
        border: none !important;
        color: #fff;
        padding: 0.486rem 1rem;
    }

    .CopyButton:hover {
        background-color: transparent !important;
    }

    button#dropdown-left1 {
        z-index: 1;
        color: white;
        border: 0;
        box-shadow: none;
    }

    .darkWhiteText {
        color: white !important;
    }

    ul.dropdown-menu {
        padding: 0;
    }
    .b-overlay.position-absolute div{
        background-color: #232228 !important;
    }
    div ul li.cunningDrop {
        padding-right: 15px;
        background: #0A070E !important;
    }

    .cunningDrop .dropdown-menu.show {
        max-height: 275px !important;
    }

    li.cunningDrop.dropdown-mine.darkBackgroundBlack {
        z-index: 999;
        max-height: 270px;
        overflow: auto;
    }


    li.cunningDrop.dropdown-mine.darkBackgroundBlack::-webkit-scrollbar {
        width: 3px;
        height: 3px;
        cursor: pointer;
    }

    li.cunningDrop.dropdown-mine.darkBackgroundBlack::-webkit-scrollbar-corner {
        background: rgba(0, 0, 0, 0);
        z-index: 999;
    }

    li.cunningDrop.dropdown-mine.darkBackgroundBlack::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
        background-color: #ffffff;

    }
    .Contract-div #dropdown-left1{
        padding:0 !important;
    }
    .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
        color: #495057;
        background-color: #fff;
        border-color: white !important;
        border-bottom: solid 1px !important;
    }
   .accordion-body .nav>li.nav-item:hover {
        background-color: transparent;
    }
    .nav-tabs .nav-link:focus, .nav-tabs .nav-link:hover{
        border: none;
    }
    @font-face {
        font-family: "Poppins-Light" !important;
        src: local("Poppins-Light"),
            url(../fonts/Poppins-Light.ttf) format("truetype");
    }
</style>