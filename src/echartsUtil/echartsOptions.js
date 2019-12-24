export  function oneOption(text,data,startValue,endValue){
 let  option={
     title: {
        text: text,
        x:'center',
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis:  {
        type: 'category',
        data:data.dateMap
      },
      yAxis: {
        type: 'value',
        splitLine :{    //网格线
             lineStyle:{
                 type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
             },
             show:true //隐藏或显示
         }

      },
      dataZoom: [{
          type: 'inside',
          startValue:startValue,
          endValue:endValue,
          throttle: 50,
          minValueSpan :5,
          maxValueSpan :19
      }],
      series: {
            name:'当天值',
            type:'line',
            data:data.blueMap,
            symbol: 'none',  //取消折点圆圈
            itemStyle : {
                  normal : {
                  color:'#0e9cff', //改变折线点的颜色
                  lineStyle:{
                  color:'#0e9cff' //改变折线颜色
                  }
                  }
            },

        }

       }
       return option;
};
export  function twoOption(text,data,name1,name2,startValue,endValue,yname,type){
let yAxis;
let series;
let dataZoom;
if(type==='FOF'){
  yAxis={
    name:yname,
    type: 'value',
    // axisLabel:{formatter:'{value} %'},
    splitLine :{    //网格线
         lineStyle:{
             type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
         },
         show:true //隐藏或显示
     },
     axisLabel: {
     formatter:function (value, index) {           
                         return Number(value).toFixed(2)+'%';      
                        }
   },

 };
 series= [
   {
       name:name1,
       type:'line',
       data:data.blueMap,
       symbol: 'none',  //取消折点圆圈
       itemStyle : {
             normal : {
             color:'#0e9cff', //改变折线点的颜色
             lineStyle:{
               color:'#0e9cff' //改变折线颜色
             }
             }
       },
   },
   {
       name:name2,
       type:'line',
       data:data.redMap,
       symbol: 'none',
       itemStyle : {
             normal : {
             color:'#f38143',
             lineStyle:{
              color:'#f38143'
             }
             }
       },
   }
 ];
 dataZoom= [{
     type: 'inside',
     throttle: 20,
     minValueSpan :5,
     maxValueSpan :19,
     start: 80,
            end: 100
 }]
}else {
  yAxis={
    name:yname,
    type: 'value',
    // axisLabel:{formatter:'{value} %'},
    splitLine :{    //网格线
         lineStyle:{
             type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
         },
         show:true //隐藏或显示
     },
  },
  series= [
    {
        name:name1,
        type:'line',
        data:data.blueMap,
        // symbol: 'none',  //取消折点圆圈
        itemStyle : {
              normal : {
              color:'#0e9cff', //改变折线点的颜色
              lineStyle:{
              color:'#0e9cff' //改变折线颜色
              }
              }
        },
    },
    {
        name:name2,
        type:'line',
        data:data.redMap,
        // symbol: 'none',
        itemStyle : {
              normal : {
              color:'#f38143',
              lineStyle:{
              color:'#f38143'
              }
              }
        },
    }
  ];
  dataZoom= [{
      type: 'inside',
      startValue:startValue,
      endValue :endValue,
      throttle: 20,
      minValueSpan :5,
      maxValueSpan :19,
      start: 85
  }]
};
// let  option={
//      title: {
//         text: text,
//       },
//       tooltip: {
//         trigger: 'axis',
//         formatter:'{b}<br />{a0}:\n{c0}%<br />{a1}:\n{c1}%',
//       },
//       legend: {
//         data:[name1,name2]
//       },
//       xAxis:  {
//         type: 'category',
//         data:data.dateMap
//       },
//       yAxis,
//       dataZoom,
//       series,
//        }
       let option;
       if (type === 'FOF') {
           option = {
               title: {
                   text: text,
               },
               tooltip: {
                   trigger: 'axis',
                   formatter: '{b}<br />{a0}:\n{c0}%1<br />{a1}:\n{c1}%',
                
   
               },
               legend: {
                   data: [name1, name2]
               },
               xAxis: {
                   type: 'category',
                   data: data.dateMap
               },
               yAxis,
               dataZoom,
               series,
           }
       } else {
           option = {
               title: {
                   text: text,
               },
               tooltip: {
                   trigger: 'axis',
                   // formatter: '{b}<br />{a0}:\n{c0}%1<br />{a1}:\n{c1}%',
                   formatter: function(v1) {
   
                       let yg = v1[0].value
                       if (yg) {
                           return v1[0].axisValue + '<br/>' + text + ':' + yg + "%"
                       } else {
                           return v1[1].axisValue + '<br/>' + text + ':' + v1[1].value + "%"
                       }
                   }
   
               },
               legend: {
                   data: [name1, name2]
               },
               xAxis: {
                   type: 'category',
                   data: data.dateMap
               },
               yAxis,
               dataZoom,
               series,
           }
       }
       return option;
};
