<template>
    <div class="eLine">
      <div v-show="!noData" class="chartContent"></div>
      <div v-show="noData" class="noDataBox">
        <span class="noDataIcon"></span>
        <span v-show="FOF" class="noData">点击【配置】按钮，加载数据</span>
          <span v-show="!FOF" class="noData">点击【构建FOF】按钮，加载数据</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "eLine",
        props:["params","type","FOF","text"],
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
            let grid,dataZoom,yAxis;
            //长图模式
            if(this.type === "1"){
              let startValue = xAxis[0].data.length-1;
              let endValue = xAxis[0].data.length - 37;
              grid  = {
                left: '20',
                right: '120',
                bottom: '30',
                top:'20',
                containLabel: true
              };
              dataZoom = [
                {
                  type: 'inside',
                  xAxisIndex: 0,
                  startValue:startValue,
                  endValue:endValue,
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
              ];
              yAxis = {
                splitNumber:3,
                  type: 'value',
                  axisLabel: {
                  color: '#777',
                  formatter:function (value, index) {           
                         return value.toFixed(2)    
                        }
                },

                axisLine:{
                  lineStyle:{
                    color:"#ccc"
                  }
                },
                min:"dataMin",
                splitLine:{
                  show:true,
                  lineStyle:{
                    type:"dotted"
                  }
                }
              }
            }else{
              //默认短图
              grid  = {
                left: '10',
                right: '10',
                bottom: '15',
                top:'15',
                containLabel: true
              };
              dataZoom = [
                {
                  type: 'inside',
                  xAxisIndex: 0,
                  minValueSpan :5,
                  maxValueSpan :19,
                  start:90
                }
              ];

              yAxis = {
                splitNumber:3,
                type: 'value',
                axisLabel: {
                  color: '#777',
                  formatter:function (value, index) {           
//                          return value.toFixed(2)
                         return value.toFixed(2)+'%' 
                        }
                },
                axisLine:{
                  show: false
                },
                splitLine:{
                  show:true,
                  lineStyle:{
                    type:"dotted"
                  }
                },
                min:"dataMin",
                axisTick:{
                  show:false
                }
              }
            }



            let option = {
              grid,
              title: {
                 text: this.text,
                 x:'center',

               },
              tooltip : {
                trigger: 'axis',
                formatter:'{b}<br />{a0}:\n{c0}%<br />{a1}:\n{c1}%',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              dataZoom,
              xAxis,
              legend,
              yAxis,
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

  .eLine{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .eLine .chartContent{
    width: 100%;
    height: 100%;
  }

</style>
