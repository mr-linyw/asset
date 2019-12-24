<!-- 封装公共echartsUtil，方便调用 -->
<template>
    <div v-bind:id="id" v-bind:data="data"></div>
</template>

<script>
    export default {
        name: "echartsUtil",
        props:["id","data"],
      data(){
          return{
            ChartLineGraph:null,
          }
      },
    //  深度监听 父组件刚开始没有值，只有图标的配置项
    //  父组件ajax请求后改变数据的值，传递过来，图标已生成，监听传过来的值的改变
    //  也可以用钩子函数computed对数据操作，实现监听的效果
      watch:{
          data:{
            handler(newvalue,oldvalue) {
              this.drawLineGraph(this.id,newvalue);
            }
          },
          deep:true   //深度监听  每个属性值的变化都会执行handler

        //之所以注释掉immediate，是因为它很操蛋，具体情况需要具体分析，自己体会
          //immediate: true  //父组件首次传来默认值也会执行函数
      },

     //初始化，不要问我为啥不放在created里
      mounted() {
          this.drawLineGraph(this.id,this.data);

      },
      methods:{
        drawLineGraph(id,data){
          let _this = this;
          let myChart = document.getElementById(id)
          if(this.ChartLineGraph){

          }
          this.ChartLineGraph = this.$echarts.init(myChart)
          this.ChartLineGraph.setOption(data,true);
          window.addEventListener("resize",function () {
            _this.ChartLineGraph.resize(); //网页自适应
          })
        }
      },
      //销毁实例之前，清空数据
      beforeDestroy() {
          if(this.ChartLineGraph){
            this.ChartLineGraph.clear();
          }
      }
    }
</script>

<style scoped>

</style>
