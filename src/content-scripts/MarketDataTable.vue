<template>
    <div>
      <b-row class="w-100 m-auto">
        <b-col v-for="(item, index) in tempData" :key="index" cols="6" md="3" class="border-col">
          <h3 class="text-center font-weight-bold market-value" :class="{ 'text-success': (item.compare===true), 'text-danger': (item.compare===false) }">
            <span v-if="item.compare !== 'icon'">{{ item.value }}</span> <!-- Render item.value if item.compare is not equal to 'icon' -->
            <b-img rounded v-else-if="item.compare === 'icon'" :src="item.imageSrc" class="w-50 mx-auto" alt="Icon" fluid style="max-width: 50px;"/> <!-- Render the image if item.compare is equal to 'icon' -->
          </h3>
          <h6 class="text-center market-caption">
            <span v-if="item.compare !== 'icon'">{{ item.caption }}</span> 
            <span v-if="(item.compare === 'icon' && item.value != 0)">{{ item.value }}</span> 
          </h6>
        </b-col>
      </b-row>
    </div>
</template>

<style>
.border-col {
    border: 1px solid #45e0ff;
}

.market-value {
    margin-bottom: 0.2rem;
    margin-top: 0.5rem;
}

.market-caption {
    font-size: 0.8rem;
}
.text-success {
    color: rgb(132 204 22);
}
.text-danger{
    color: rgb(220 38 38);
}
</style>

<script>
import { BRow, BCol, BImg } from "bootstrap-vue-3";
import BASE_URL_i from '../../base_url.js'

export default {
    components: {
        BRow,
        BCol,
        BImg,
    },
    props: {
        token: Object,
    },
    methods:{
        toInterNationalNumber(val) {
            if (val)
                return new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 15,
                }).format(val);
        },
        roundData(val) {
            if (val) {
                return this.toInterNationalNumber(parseFloat(val).toFixed(0));
            }
        },
        nFormatter(num) {
            if (Math.abs(num) > 999999999) {
                return Math.sign(num)*((Math.abs(num)/1000000000).toFixed(1)) + 'B';
            } else if (Math.abs(num) > 999999) {
                return Math.sign(num)*((Math.abs(num)/1000000).toFixed(1)) + 'M';
            } else if (Math.abs(num) > 999) {
                return Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'K';
            } else {
                return Math.sign(num)*Math.abs(num);
            }
        }
    },
    data() {
        return {
            tempData: [
                {
                    value: "-",
                    caption: "Date created",
                },
                {
                    value: `${this.roundData(this.token?.current_price)}$`,
                    caption: "Current price",
                },
                {
                    value: this.nFormatter(this.token?.market_cap),
                    caption: "Market cap",
                },
                {
                    value: `${this.token?.market_cap_rank}#`,
                    caption: "Market rank",
                },
                {
                    value: this.nFormatter(this.token?.circulating_supply),
                    caption: "Circulating Supply",
                },
                {
                    value: `-`,
                    caption: "% in circulation",
                },
                {
                    value: "-",
                    caption: "Daily Volume",
                },
                {
                    value: "-",
                    caption: "Daily Volume Change %",
                },
                {
                    value: this.token?.ATH ?? "-",
                    caption: "All time high",
                },
                {
                    value: "-",
                    caption: "% from ATH 60%",
                },
                {
                    value: "-",
                    caption: "All time low",
                },
                {
                    value: "-",
                    caption: "% from ATL 60%",
                },
                {
                    value: "-",
                    caption: "INFLATION",
                },
                {
                    value: "-",
                    caption: "Holders",
                },
                {
                    value: "-",
                    caption: "Holders 24h % change",
                },
                {
                    value: "-",
                    caption: "Holders 7 day % change",
                },
                {
                    value: this.token?.next_unlock_date ?? "-",
                    caption: "Next unlock date",
                },
                {
                    value: `${this.roundData(this.token?.social_mentions_change)}%`,
                    caption: "24H Social mentions %",
                    compare: this.token.social_mentions_change > 0,
                },
                {
                    value: `${this.roundData(this.token?.social_engagement_change)}%`,
                    caption: "24H Social engamgents %",
                    compare: this.token?.social_engagement_change > 0,
                },
                {
                    value: `${this.roundData(this.token?.average_sentiment)}%`,
                    caption: "24H Social sentiments %",
                    compare: this.token?.average_sentiment > 0,
                },
                {
                    value: "-",
                    caption: "Xs from Public price",
                },
                {
                    value: "-",
                    caption: "Public price",
                },
                {
                    value: "-",
                    caption: "x to  no 1 in category",
                },
                {
                    value: "-",
                    caption: "Market cap/daily volume %",
                },
                {
                    value: this.nFormatter(this.token?.Website ?? 0),
                    caption: "Website",
                    compare: "icon",
                    imageSrc: `${BASE_URL_i}images/static/website.png`
                },
                {
                    value: this.nFormatter(this.token?.twitter_followers) ?? "-",
                    caption: "Twitter Followers",
                    compare: "icon",
                    imageSrc: `${BASE_URL_i}images/static/twitter.png`
                },
                {
                    value: this.nFormatter(this.token?.telegram_members) ?? "-",
                    caption: "TG Followers",
                    compare: "icon",
                    imageSrc: `${BASE_URL_i}images/static/telegram.png`
                },
                {
                    value: this.nFormatter(this.token?.whitepaper_followers??0) ,
                    caption: "White papaer",
                    compare: "icon",
                    imageSrc: `${BASE_URL_i}images/static/whitepaper.png`
                },
            ],
        };
    },
};
</script>