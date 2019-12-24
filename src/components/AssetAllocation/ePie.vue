<template>
  <div class="ePie">
    <div v-show="!noData" class="chartContent"></div>
    <div v-show="noData" class="noDataBox">
      <span class="noDataIcon"></span>
      <span class="noData">点击【配置】按钮，加载数据</span>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
  export default {
    name: "ePie",
    props:["params"],
    data(){
      return {
        chart:null,
        errorMsg:"",
        startValue:null,
        endValue: null,
        noData:true
      }
    },
    watch:{
      params(val){
        this.noData = val.series[0].data.length <= 0;
        this.drawByData(val);
      }
    },
    methods:{
      drawByData(params){
        if(!this.chart){
          let $el = this.$el.children[0], echarts = this.$echarts;
          this.chart = echarts.init($el);
          let _t = this;
          function handlerEvent(){
            _t.chart.resize();
          }
          window.removeEventListener("chartResize",handlerEvent);
          window.addEventListener('chartResize',handlerEvent);
        }

        if(!params){
          return;
        }
        let {legend,series} = params;

        let option = {
          tooltip : {
            trigger: 'item',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: '{b0}{d0}%',
          },
          legend,
          series
        };
        this.chart.setOption(option);
        this.$nextTick(function () {
          this.chart.resize();
        });
      }
    }
  }
</script>

<style scoped>

  .ePie{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ePie .chartContent{
    width: 100%;
    height: 100%;
  }

</style>
