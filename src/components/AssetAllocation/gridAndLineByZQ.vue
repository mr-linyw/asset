<template>
    <div class="gridAndLineByZQ">
            <div class="tools">
              <div class="group">
                <span>规模偏好</span>
                <a-select defaultValue="0" style="width:110px" @change="sizeRequirement_do">
                  <a-select-option v-for="item in gmphData" :key="item.value" :value="item.value">{{item.text}}</a-select-option>
                </a-select>
              </div>
              <a-button class="configBtn" type="round" style="margin-left: 20px" @click="buildBound">构建FOF</a-button>
            </div>
            <div class="content">
              <div class="left_c">
                <a-table
                  :bordered="true"
                  :columns="columns"
                  :dataSource="data"
                />
              </div>
              <div class="right_c">
                <e-line :FOF="false" :text="text" :params="chartData"></e-line>
              </div>
            </div>
            <!-- 声明modal模板 -->
            <modal :show="isShowInfoModal" @confirm="modalOK" @close="modalClose" :showConfirm="true" :showCancle="true" title="免责声明">
            <div class="infoContent" slot="body">
              <div style="text-align: left">
                投资有风险，本网页的任何数据及其衍生产品仅供参考。资产配置平台系统依据市场公开数据及外购数据源作为计算基础数据，本公司将会尽力但不保证基础数据的及时性、准确性、真实性和完整性，不承担因任何数据不准确或遗漏等造成的任何损失或损害的责任。投资者在依据相关信息进行投资操作时，应当进行自主判断，所导致的盈亏由投资者自行承担。浏览本页面或使用本功能即表示投资者同意所载免责声明。
              </div>
              <div class="infoCheckBoxContent">
                <a-checkbox  :checked="isbondCheck" @change="infoContentChange">下次不再提示</a-checkbox>
              </div>
            </div>
          </modal>
    </div>
</template>

<script>
  const columns = [
    {
      title: '基金代码',
      dataIndex: 'fundCode',
    },
    {
      title: '基金名称',
      dataIndex: 'fundName',
    },
    {
      title: '基金经理',
      dataIndex: 'fundManager',
    },
    {
      title: '上季度业绩',
      dataIndex: 'lastQuarterReturn',
    },
    {
      title: '基金权重',
      dataIndex: 'latestSize',
    },
  ];
    import moment from 'moment';
    import eLine from '@/components/AssetAllocation/eLine'
    import modal from '@/modal/Modal'
    export default {
      name: "gridAndLineByZQ",
      props: ['isQuery','govBondTriData'],
      data(){
        return{
          text:'历史表现',
          isbondCheck:false,
          isShowInfoModal:false,
          params:"",
          sizeRequirement:"0",
          chartData:[],
          data:[],
          columns,
          gmphData:[
            {text:"无要求",value:"0"},
            {text:"2亿以上",value:"1"},
            {text:"10亿以上",value:"2"},
          ],
        }
      },
      components:{
        eLine,modal
      },
      created(){
        // table数据
        // this.$http.get(this.$url.fofRecommendBondFund + "/0").then(result => {
        //   this.initData(result);
        // });
        //  折线图数据
        // this.$http.get(this.$url.fofHistReturnBond + "/0").then(result => {
        //   this.doChartData(result);
        // });
      },
      watch:{

        params(value){
          this.$emit("input",[]);
          this.$http.get(this.$url.fofRecommendBondFund + "/"+value+"").then(result => {
            this.initData(result);
          });
          //  折线图数据
          this.$http.get(this.$url.fofHistReturnBond + "/"+value+"").then(result => {
            this.doChartData(result);
          });
        },

      },
      methods:{
        infoContentChange(e){
          this.isbondCheck = e.target.checked
        },
        modalOK(data){
             if(this.isbondCheck){
               localStorage.setItem("isbondCheck","0");
             }
             this.isShowInfoModal = false;
             this.params = this.sizeRequirement;
         },
         modalClose(){
           this.isShowInfoModal = false;
         },
        buildBound(){
          if(this.isQuery==true){
            if(localStorage.getItem("isbondCheck") !== "0"){
                this.isbondCheck = false;
                this.isShowInfoModal = true;
              }else{
                this.params = this.sizeRequirement;
              }
          }else{this.$message.error('请先配置');}
        },
        sizeRequirement_do(val){
           this.sizeRequirement = val;
        },
        doChartData(result){
          let params = {

            legend: {
              data:['债基组合','组合基准'],
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
                }
              }
            ],
            series:[
              {
                name: '债基组合',
                type: 'line',
                symbol: 'none',
                data: [],
                itemStyle:{
                  color:"#35acff"
                }
              },
              {
                name: '组合基准',
                type: 'line',
                symbol: 'none',
                data: [],
                itemStyle:{
                  color:"#f38143"
                }
              },
            ]
          };
          for (let item of result){
            let formatM = moment(item.tradeDate).format("YYYY/MM/DD");
            params.xAxis[0].data.push(formatM);
            params.series[0].data.push(Number(item.protfolio*100).toFixed(2));
            params.series[1].data.push(Number(item.benchmark*100).toFixed(2));
          }
          this.chartData = params;
        },
        initData(data){
          let num="";
          //计算权重平均值
          if(this.govBondTriData!=0){
            num =   Number((this.govBondTriData/5)*100).toFixed(2)+'%';      
         }else {
            num = "0%";
         }
         //处理table数据
          this.data.length = 0;
          let d = this.data;
          for (let i = 0; i < data.length; i++) {
            let dc = data[i];
            d.push({
              fundCode: dc["fundCode"],
              fundName: dc["fundName"],
              fundManager: dc["fundManager"],
              lastQuarterReturn: Number(dc["lastQuarterReturn"]*100).toFixed(2)+'%',
              latestSize:  num
            });
          }
          this.$emit("input",d);
        }
      }
    }
</script>

<style scoped>
  .gridAndLineByZQ{
    width: 100%;
    height: 320px;
  }
.tools{
  display: flex;
  width: 100%;
  height: 48px;
  font-size: 14px;
  color: #4c5264;
  margin-left: 15px;
}
  .content{
    width: 100%;
    height: calc(100% - 48px);
    display: flex;
  }
  .content > div{
    width: 50%;
  }
  .left_c{
    margin-left: 12px;
    margin-right: 18px;
  }
  .right_c{
    margin-right: 8px;
  }
  .group{
    margin-right: 18px;
  }
</style>
