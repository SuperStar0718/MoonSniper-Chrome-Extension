<template>
    <div ref="tradingviewWidgetContainer" style="width: 100%; height: 500px;"></div>
</template>
  
<script>
  export default {
    props: {
      symbol: {
        type: String,
        required: true,
      },
    },
  
    data() {
      return {
        tvWidget: null,
      };
    },
  
    mounted() {
      this.createTradingViewWidget();
    },
  
    methods: {
      createTradingViewWidget() {
        const container = this.$refs.tradingviewWidgetContainer;
        const containerId = 'tradingview-widget';
        container.id = containerId;
        
        this.tvWidget = new TradingView.widget({
          "autosize": true,
          "symbol": this.symbol,
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "2",
          "locale": "en",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "withdateranges": true,
          "range": "12m",
          "container_id": containerId
        });
      }
    },
  
    watch: {
      symbol(newValue) {
        // Remove existing widget and create a new one with the updated symbol
        if (this.tvWidget !== null) {
          this.tvWidget.remove();
        }
  
        this.createTradingViewWidget();
      },
    },
  };
</script>