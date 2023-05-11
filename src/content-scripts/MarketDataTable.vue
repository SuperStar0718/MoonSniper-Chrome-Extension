<template>
    <div>
      <b-row class="w-100 m-auto">
        <b-col v-for="(item, index) in tempData" :key="index" cols="6" md="3" class="border-col">
          <h3 class="text-center font-weight-bold market-value">
            {{ item.value }}
          </h3>
          <h6 class="text-center market-caption">
            {{ item.caption }}
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
</style>

<script>
import { BRow, BCol } from "bootstrap-vue-3";

export default {
    components: {
        BRow,
        BCol,
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
                return this.toInterNationalNumber(parseFloat(val).toFixed(2));
            }
        },
        kFormatter(num) {
            return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
        },
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
                    value: this.toInterNationalNumber(this.token?.market_cap),
                    caption: "Market cap",
                },
                {
                    value: `${this.token?.market_cap_rank}#`,
                    caption: "Market rank",
                },
                {
                    value: this.toInterNationalNumber(this.token?.circulating_supply),
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
                    type: "number",
                    suffix: "%"
                },
                {
                    value: `${this.roundData(this.token?.social_engagement_change)}%`,
                    caption: "24H Social engamgents %",
                    type: "number",
                    suffix: "%"
                },
                {
                    value: `${this.roundData(this.token?.average_sentiment)}%`,
                    caption: "24H Social sentiments %",
                    type: "number",
                    suffix: "%"
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
                    value: this.token?.Website ?? "-",
                    caption: "Website",
                },
                {
                    value: this.kFormatter(this.token?.twitter_followers) ?? "-",
                    caption: "Twitter Followers",
                },
                {
                    value: this.kFormatter(this.token?.telegram_members) ?? "-",
                    caption: "TG Followers",
                },
                {
                    value: this.kFormatter(this.token?.whitepaper_followers??0) ,
                    caption: "White papaer",
                },
            ],
        };
    },
};
</script>