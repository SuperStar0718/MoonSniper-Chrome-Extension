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
    data() {
        return {
            tempData: [
                {
                    value: "3.23",
                    caption: "Date created",
                },
                {
                    value: "0.005$",
                    caption: "Current price",
                },
                {
                    value: "2.5M",
                    caption: "Market cap",
                },
                {
                    value: "568#",
                    caption: "Market rank",
                },
                {
                    value: "329M",
                    caption: "Circulating Supply",
                },
                {
                    value: "3.5%",
                    caption: "% in circulation",
                },
                {
                    value: "1.1M$",
                    caption: "Daily Volume",
                },
                {
                    value: "10%",
                    caption: "Daily Volume Change %",
                },
                {
                    value: "0.015$",
                    caption: "All time high",
                },
                {
                    value: "60%",
                    caption: "% from ATH 60%",
                },
                {
                    value: "0.014",
                    caption: "All time low",
                },
                {
                    value: "60%",
                    caption: "% from ATL 60%",
                },
                {
                    value: "500%",
                    caption: "INFLATION",
                },
                {
                    value: "10k",
                    caption: "Holders",
                },
                {
                    value: "10%",
                    caption: "Holders 24h % change",
                },
                {
                    value: "15%",
                    caption: "Holders 7 day % change",
                },
                {
                    value: "-",
                    caption: "Next unlock date",
                },
                {
                    value: "-",
                    caption: "24H Social mentions %",
                },
                {
                    value: "-",
                    caption: "24H Social engamgents %",
                },
                {
                    value: "-",
                    caption: "24H Social sentiments %",
                },
                {
                    value: "10x",
                    caption: "Xs from Public price",
                },
                {
                    value: "0.04",
                    caption: "Public price",
                },
                {
                    value: "130x to GALA",
                    caption: "x to  no 1 in category",
                },
                {
                    value: "15%",
                    caption: "Market cap/daily volume %",
                },
                {
                    value: "-",
                    caption: "Website",
                },
                {
                    value: "13k",
                    caption: "Twitter Followers",
                },
                {
                    value: "20K",
                    caption: "TG Followers",
                },
                {
                    value: "-",
                    caption: "White papaer",
                },
            ],
        };
    },
};
</script>