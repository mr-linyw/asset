<template>
    <div class="rAa">
        <div v-show="!noData" class="chartContent"></div>
        <div v-show="noData" class="noData"><img  src="@/assets/空白占位符.png"><span style="fontSize:16px">点击【配置】按钮，加载数据</span></div>
    </div>
</template>

<script>
  import data from '@/store/testLocalData';
  import api from '@/api/axios';
  import moment from 'moment'
    export default {
        name: "rAa",
        props:["baseConfig"],
        data(){
            return {
              chart:null,
              errorMsg:"",
              params:null,
              startValue:null,
              endValue: null,
              noData:true
          }
        },
        mounted() {
          this.drawByData(this.params);
        },
      watch: {
        params(val) {
          this.drawByData(this.params);
        },
        endValue(val){
          this.drawByData(this.params);
        },
        baseConfig(){      
          let cm = this.baseConfig.cm;
          let cl = this.baseConfig.cl;
          this.$http.get(this.$url.allocationResult + "/"+cm+"/"+cl+"").then(result => {
            this.noData = result.length < 1;
            this.params = this.initData(result);
          })
        }
      },
       methods:{
            initData(data){
                  let d  = data;
                  if(d.length <= 0){
                      this.errorMsg =  "暂无数据";
                      return;
                  }
                  this.startValue = d.length-1;
                  let sv = d[this.startValue].tradeDate;
                  let endValueFormater = moment(sv).subtract(3, 'year').format("YYYY-MM");
                  let params = {
                    legend: {
                      data:['沪深300','国债全收益','wind商品','货币现金'],
                      orient: 'vertical',
                      right: 10,
                      top: 20,
                      bottom: 20,
                      textStyle:{
                        color:"#777"
                      }
                    },
                    xAxis : [
                      {
                        type: 'category',
                        data: [],
                        axisLabel: {
                          color: '#777',
                          rotate: '35',
                        },
                        axisTick:{
                          lineStyle:{
                            color:"#cacaca"
                          }
                        },
                      }
                    ],
                    series:[
                      {
                        name: '沪深300',
                        type: 'bar',
                        stack: '总值',
                        data: [],
                        itemStyle:{
                          color:"#D42539"
                        }
                      },
                      {
                        name: '国债全收益',
                        type: 'bar',
                        stack: '总值',
                        data: [],
                        itemStyle:{
                          color:"#7ca4c3"
                        }
                      },
                      {
                        name: 'wind商品',
                        type: 'bar',
                        stack: '总值',
                        data: [],
                        itemStyle:{
                          color:"#78f2e9"
                        }
                      },
                      {
                        name: '货币现金',
                        type: 'bar',
                        stack: '总值',
                        data: [],
                        barWidth:40,
                        itemStyle:{
                          color:"#a5a5dd"
                        }
                      },
                    ]
                  };
                  let i =0;
                  for (let item of d){
                    moment.locale('en', {
                      months : [
                        "一月", "二月", "三月", "四月", "五月", "六月", "七月",
                        "八月", "九月", "十月", "十一月", "十二月"
                      ]
                    });
                        let formatM = moment(item.tradeDate).format("MMMM YYYY");
                        if(moment(item.tradeDate).format("YYYY-MM") === endValueFormater){
                            this.endValue = i;
                        }
                        params.xAxis[0].data.push(formatM);
                        params.series[0].data.push(Number(item.hushen*100).toFixed(4));
                        params.series[1].data.push(Number(item.govBondTri*100).toFixed(4));
                        params.series[2].data.push(Number(item.windCommodity*100).toFixed(4));
                        params.series[3].data.push(Number(item.cash*100).toFixed(4));
                    i++;
                  }

                  return params;
            },
           drawByData(params){

             if(!params){
               return;
             }

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

               let {legend,xAxis,series} = params;
               let _t = this;
               let option = {
                 tooltip : {
                   trigger: 'axis',
                   axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                     type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                   },
                 },
                 legend,
                 dataZoom: [
                   {
                     type: 'inside',
                     xAxisIndex: 0,
                     startValue:_t.startValue,
                     endValue:_t.endValue,
                     minValueSpan :5,
                     maxValueSpan :19,
                     end:90
                   },
                   {
                     type: 'slider',
                     start: 0,
                     end: 10,
                     handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                     handleSize: '50%',
                     showDetail:false,
                     handleStyle: {
                       color: '#fff',
                       shadowBlur: 3,
                       shadowColor: 'rgba(0, 0, 0, 0.6)',
                       shadowOffsetX: 2,
                       shadowOffsetY: 2
                     }
                   }
                 ],
                 grid: {
                   left: '15',
                   right: '120',
                   bottom: '30',
                   top:'20',
                   containLabel: true
                 },
                xAxis,
                 yAxis : [
                   {
                     type : 'value',
                      min:0,
                      max:100,
                     nameTextStyle:{
                         color:"#777"
                     },
                     splitLine:{
                       show:false,
                     },
                     axisLabel:{
                       formatter: '{value} %',
                       color: '#777',
                     },
                     axisTick:{
                        lineStyle:{
                          color:"#cacaca"
                        }
                     },
                     splitNumber:2
                   }
                 ],
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
    .rAa{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  .rAa .chartContent{
    width: 100%;
    height: 100%;
  }
</style>
