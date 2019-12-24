<template>
  <div class="AssetAllocation" style="height: 850px; overflow-y:scroll" v-wechat-title="this.title">
    <div class="AssetAllocation-content">
    <div class="an-tools">
        <div class="boxGroup">
          <span>资产配置方法</span>
          <a-select defaultValue="3" :style="selectStyle" v-model="params.zcpz"  @change="tnhChange">
            <a-select-option v-for="item in tnhData" :key="item.key" >{{item.value}}</a-select-option>
          </a-select>
        </div>
      <div class="boxGroup">
        <span>货币现金上限</span>
        <a-select defaultValue="1" :style="selectStyle" :disabled="disableYhgModel" v-model="params.xjsx" @change="yhgChange">
          <a-select-option v-for="item in yhgData" :key="item.value" >{{item.text}}</a-select-option>
        </a-select>
      </div>
      <a-button class="configBtn" type="round" :style="configBtnStyle" @click="configClick">配置</a-button>
    </div>
    <div class="an-content-1Row">
      <an-panel panelTitle="各期资产配置结果">
        <r-aa :baseConfig="baseConfigParams"></r-aa>
      </an-panel>
    </div>
    <div class="an-content-2Row">
      <an-panel panelTitle="实际历史模拟净值表现">
        <e-line  :FOF="true" type="1" :params="allocationResultData"></e-line>
      </an-panel>
    </div>
    <div class="an-content-3Row">
      <div  class="an-content-1Col">
        <an-panel panelTitle="策略风险特征PK-收益波动回撤">
            <e-bar :params="resultOfRisk_l"></e-bar>
        </an-panel>
      </div>
      <div class="an-content-2Col">
        <an-panel panelTitle="策略风险特征PK-风险调整后收益指标">
            <e-bars :params="resultOfRisk_r"></e-bars>
        </an-panel>
      </div>
    </div>
    <div class="an-content-4Row">
      <an-panel panelTitle="最新大类资产配置权重">
        <div class="pieContent">
          <div class="Row4_left"><e-pie :params="pieData"></e-pie></div>
          <div class="Row4_right">
            <div v-if="!newNetValue" class="noDataBox">
              <span class="noDataIcon"></span>
              <span class="noData">点击【配置】按钮，加载数据</span>
            </div>

            <span v-if="newNetValue">{{newNetValue}}</span>
          </div>
        </div>
      </an-panel>
    </div>
    <div class="an-content-5Row">
      <an-panel panelTitle="可交易FOF组合构建">
        <a-collapse  v-model="activeKey"  >
          <template v-slot:expandIcon="props" >
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel header="股票型" key="1" >
            <grid-and-line-by-g-p v-model="gpData" v-if="reFresh" :isQuery="isQuery" :hushenData="hushenData"></grid-and-line-by-g-p>
          </a-collapse-panel>
        </a-collapse>
        <a-collapse  v-model="activeKey" >
          <template v-slot:expandIcon="props" >
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel header="债券型" key="2" >
            <grid-and-line-by-z-q v-model="zqData" v-if="reFresh" :isQuery="isQuery" :govBondTriData="govBondTriData"></grid-and-line-by-z-q>
          </a-collapse-panel>
        </a-collapse>
        <a-collapse  v-model="activeKey" >
          <template v-slot:expandIcon="props" >
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel header="商品型" key="3" >
              <span style="font-size: 14px;color: #4c5264">无构建商品组合</span>
          </a-collapse-panel>
        </a-collapse>
        <a-collapse  v-model="activeKey" >
          <template v-slot:expandIcon="props" >
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel header="现金型" key="4" >
            <a-table
              :bordered="true"
              :columns="cashColume"
              :dataSource="tableSource"
            />
          </a-collapse-panel>
        </a-collapse>
      </an-panel>
    </div>
    <div class="fof-order" >
        <el-button size="mini" type="danger" style="width:200px;" class="btn-fof" @click="order">下单</el-button>
        <p><span style="color:gray;">点击'下单按钮'，可调整资产组合权重</span></p>
    </div>
      <div class="an-content-6Row" style="list-style:none;" >
        <li><span style="color:#F56C6C"><strong>风险提示</strong></span></li>
        <li><span>尊敬的客户：</span></li>
        <li><span>
          在您获得本资产配置平台系统结论并用于实际投资时，可能会获得较高的投资收益，
          但同时也可能存在着较大的证券投资风险。请务必仔细阅读本系统平台的使用说明。
          我们将尽可能采取有效措施保护客户资料和其他各项活动的安全，本着对您负责的态度，
          公司郑重提示，在使用时，存在且不限于以下风险：<a href="javascript:" @click="viewDetails">查看详情</a>

        </span></li>

      </div>
  </div>
          <!-- 下单模板 -->
          <order :typeValue="typeValue" :orderData="orderData" :show="orderShow" @confirm="orderOk" @close="orderClose" @reset="orderReset">
          </order>
          <!-- 免责声明模板 -->
            <Modal :show="isShowInfoModal" @confirm="modalOK" @close="modalClose" :showConfirm="true" :showCancle="true" title="免责声明">
              <div class="infoContent" slot="body">
                <div style="text-align: left">
                  投资有风险，本网页的任何数据及其衍生产品仅供参考。资产配置平台系统依据市场公开数据及外购数据源作为计算基础数据，本公司将会尽力但不保证基础数据的及时性、准确性、真实性和完整性，不承担因任何数据不准确或遗漏等造成的任何损失或损害的责任。投资者在依据相关信息进行投资操作时，应当进行自主判断，所导致的盈亏由投资者自行承担。浏览本页面或使用本功能即表示投资者同意所载免责声明。
                </div>
                <div class="infoCheckBoxContent">
                  <a-checkbox  :checked="infoContentCheckbox" @change="infoContentChange">下次不再提示</a-checkbox>
                </div>
              </div>
            </Modal>

          <!--提示信息-->
          <Modal :show="isShowWarning" @confirm="warningModalOK" @close="warningModalClose" confirmText="继续下单" :showConfirm="true" :showCancle="true" title="免责声明">
            <div class="infoContent" slot="body">
              <div style="text-align: left" v-if="gpData.length<1"><span style="font-weight: bold">股票型</span>资产未构建FOF组合,是否继续下单?</div>
              <div style="text-align: left" v-if="zqData.length<1"><span style="font-weight: bold">债券型</span>资产未构建FOF组合,是否继续下单?</div>
              <!--<div style="text-align: left"><span style="font-weight: bold">商品型</span>资产未构建FOF组合,是否继续下单?</div>-->
            </div>
          </Modal>

            <!-- 风险提示modal模板 -->
            <modal-scroll  :show="isShowModals" @confirm="modalOKs" @close="modalCloses" :showConfirm="true" :showCancle="true"  title="风险提示">
            <div class="infoContent" slot="body">
              <div style="text-align: left;">
                <li><span class="tishi">尊敬的客户：</span></li>
                <li><span>
                  在您获得本资产配置平台系统结论并用于实际投资时，可能会获得较高的投资收益，
                  但同时也可能存在着较大的证券投资风险。请务必仔细阅读本系统平台的使用说明。
                  我们将尽可能采取有效措施保护客户资料和其他各项活动的安全，本着对您负责的态度，
                  公司郑重提示，在使用时，存在且不限于以下风险：
                </span></li>
                <li><span>1、资产配置平台系统仅是建立在基础数据（数据来源包括：市场公开数据及本公司外购数据源）平台上的一个页面，它同样具有电子化系统的使用风险。</span></li>
                <li><span>2、以下原因都可能造成您使用资产配置系统时出现中断、停顿、延迟和显示失败等情况</span></li>
                <li><span>1）电脑病毒、黑客入侵、计算机软硬件故障；</span></li>
                <li><span>2）您交易使用的电脑终端与行情、交易通讯线路发生故障；</span></li>
                <li><span>3）其他因网络或您的电脑终端可能出现的故障及其他不可测因素；</span></li>
                <li><span>4）因软件关闭、关机、繁忙或网络中断等其他原因出现延迟、中断、停顿或数据不完全，甚至出现系统故障，从而使系统显示出现延迟、中断、遗失、无法触发、数据错误</span></li>
                <li><span>3、软件适配风险。您的计算机配置、性能或软件系统与所提供的交易系统不匹配，无法及时显示结果的风险。</span></li>
                <li><span>4、政策变化风险。由于相关政策变化导致的风险。</span></li>
                <li><span>5、证券监管机构确定的其他风险。</span></li>
                <li><span>6、不可抗力及其他可能存在的风险。</span></li>
                <li><span>7、任何系统的使用都是建立在专属密码登录的前提下，凡您使用专属账号及密码进行的交易、查询及其他行为，均视为您本人的行为，请妥善保管自己的密码，由于您管理不善造成的密码泄露所带来的损失，公司不承担任何责任</span></li>
              </div>
            </div>
          </modal-scroll>
  </div>
</template>
<script>
  import '@/style/assetallocation.css'
  import anPanel from '@/components/AssetAllocation/anPanel'
  import gridAndLineByGP from '@/components/AssetAllocation/gridAndLineByGP'
  import gridAndLineByZQ from '@/components/AssetAllocation/gridAndLineByZQ'
  import warningInfo from '@/components/AssetAllocation/warningInfo'
  import eLine from '@/components/AssetAllocation/eLine'
  import eBar from '@/components/AssetAllocation/eBar'
  import eBars from '@/components/AssetAllocation/eBars'
  import ePie from '@/components/AssetAllocation/ePie'
  import rAa from '@/components/AssetAllocation/rAa'
  import echartsUtil from '@/echartsUtil/echartsUtil'
  import Modal from '@/modal/Modal'
  import moment from 'moment';
  import WarningInfo from "../../components/AssetAllocation/warningInfo";
  import modalScroll from '@/modal/modalScroll'
  import order from '@/components/Order/order'
  export default {
    components : {
      modalScroll,
      order,
      WarningInfo,
      eLine,
      echartsUtil,
      anPanel,
      Modal,
      rAa,
      eBar,
      eBars,
      ePie,
      gridAndLineByGP,
      gridAndLineByZQ
    },
    data() {
      return {
        gpData:[],
        zqData:[],
        title:"资产配置服务-资产配置",
        isShowWarning:false,
        orderStatus:false,
        orderData:{},
        orderShow:false,
        typeValue:'zc',
        reFresh:true,
        zhikong:0,
        params:{   //请求参数
          zcpz:3,
          xjsx:2,
         },
        isShowModals:false,
        isConfig:false,
           baseConfigParams:{
              cm:null,  //资产配置方法
              cl:null   //货币现金上线
           },
          cashColume:[
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
              title: '上月业绩',
              dataIndex: 'lastMonthReturn',
            },
            {
              title: '基金权重',
              dataIndex: 'latestSize',
            },
          ],
          newNetValue:"",
          pieData:[], //资产净值图形最新一条数据
          resultOfRisk_l:[],//策略风险特征PK
          resultOfRisk_r:[], //策略风险特征PK
          allocationResultData:[],  //资产净值图形数据
          selectStyle:"width: 130px;height: 30px;",
          configBtnStyle:" margin-left: 35px",
          disableYhgModel:true,
          infoContentCheckbox:false,
          isShowInfoModal:false,
          activeKey:['1','2','3','4'],
          cm:3,
          cl:1,
          tnhData:[
            {value:"推荐配置",key:3},
            {value:"固定权重组合",key:4},
            {value:"最大收益",key:0},
            {value:"最大夏普",key:1},
            {value:"最小方差",key:2},
          ],
        yhgData:[
          {text:"0%",value:0},
          {text:"20%",value:0.2},
          {text:"40%",value:0.4},
          {text:"50%",value:0.5},
          {text:"100%",value:1},
          {text:"--",value:2},
        ],
        tableSource:[{fundCode:'070008.OF',fundName:'嘉实货币基金',fundManager:'庄园、张明',lastMonthReturn:'2.55%',latestSize:'--'}],
        hushenData:0,
        govBondTriData:0,
        windCommodity:0,
        cashData:0,
        isQuery:false,//点击FOF构建的权限控制
       }
    },

    mounted(){
      let chartResize = new Event('chartResize');
      window.onresize = function () {
        window.dispatchEvent(chartResize);
      }
    },
    created(){

    },
     watch:{
        baseConfigParams(val){
          //资产净值图形数据
          let cm = this.baseConfigParams.cm;
          let cl = this.baseConfigParams.cl;
          this.$http.get(this.$url.allocationResult + "/"+cm+"/"+cl+"").then(result => {

            this.do_allocationResultData(result);
            this.do_pieData(result[result.length-1]);
          });
        },
        zhikong(){
             this.reFresh= false
             this.$nextTick(()=>{
               this.reFresh = true
           })
       }
     },
    methods:{
      warningModalOK(){
        this.isShowWarning =false;
        this.orderData = this.do_orderData();
        this.orderShow=true;
      },
      warningModalClose(){
          this.isShowWarning = false;
      },
      do_orderData(){
         let obj = {};
         obj.allocationResult = this.pieData["series"][0].data;
         obj.gpData = this.gpData;
         obj.zqData=this.zqData;
         return obj;
      },
      //数据处理操作
      do_pieData(result){
        this.hushenData=result['hushen'];//股票
        this.govBondTriData= result["govBondTri"];//债券
        this.windCommodity= result["windCommodity"];//商品
        //设置现金权重
        this.cashData= result["cash"];//现金
        let latestSize = Number(this.cashData*100).toFixed(2)+'%';
       this.$set(this.tableSource[0],"latestSize",latestSize);

        let params = {
          legend: null,
          series:[
            {
              type:'pie',
              data: [],
              minAngle: 5,           　　 //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
              avoidLabelOverlap: true,   //是否启用防止标签重叠策略
              label: {
                normal: {
                  show: true,
                  position: 'outside',
                  formatter: '{b}{d}%',
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: true
                }
              },
            },
          ]
        };
        params.series[0].data.push({value:result["cash"],name:"现金",itemStyle:{color:"#A5A5DD"}});
        params.series[0].data.push({value:result["hushen"],name:"股票",itemStyle:{color:"#7AB2E4"}});
        params.series[0].data.push({value:result["govBondTri"],name:"债券",itemStyle:{color:"#F1B088"}});
        params.series[0].data.push({value:result["windCommodity"],name:"商品",itemStyle:{color:"#95DED9"}});
        this.newNetValue = "最新净值："+ result["netValue"];
        this.pieData = params;
      },
      do_resultOfRisk_r(result){
        let params = {
          legend: null,
          xAxis : [
            {
              type: 'category',
              data: ["策略sharp","策略收益回撤比"],
              axisLabel: {
                color: '#777',
              },
              axisLine:{
                lineStyle:{
                  color:"#ccc"
                }
              }
            }
          ],
          series:[
            {
              type: 'bar',
              symbol: 'none',
              data: [],
              barMaxWidth:158,
              itemStyle:{
                normal: {
                color:"#35acff",
								label: {
									show: true, //开启显示
									position: 'top', //在上方显示
                  formatter:'{c}',   
                      
									textStyle: { //数值样式
										color: 'black',
										fontSize: 16,


									}
								}
							}

              }
            },
          ]
        };
        params.series[0].data.push(result[0]["sr"].toFixed(2));
        params.series[0].data.push(result[0]["rmax"].toFixed(2));
        this.resultOfRisk_r = params;
      },
      do_resultOfRisk_l(result){
        let params = {
          legend: null,
          xAxis : [
            {
              type: 'category',
              data: ["策略年化收益","策略年化波动率","策略月度最大回撤"],
              axisLabel: {
                color: '#777',
              },
              axisLine:{
                lineStyle:{
                  color:"#ccc"
                }
              }
            }
          ],
          series:[
            {
              type: 'bar',
              symbol: 'none',
              barMaxWidth:158,
              data: [],
              itemStyle:{
                normal: {
                color:"#35acff",
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  formatter:'{c}%',   
                      
                  textStyle: { //数值样式
                    color: 'black',
                    fontSize: 16,


                  }
                }
              }
              }
            },
          ]
        };
        params.series[0].data.push((result[0]["rann"]*100).toFixed(2));
        params.series[0].data.push((result[0]["vol"]*100).toFixed(2));
        params.series[0].data.push((result[0]["maxdd"]*100).toFixed(2));
        this.resultOfRisk_l = params;
      },
      do_allocationResultData(result){
        let params = {
          legend: {
            data:['资产净值'],
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
                rotate: '35'
              },
              axisLine:{
                lineStyle:{
                  color:"#ccc"
                }
              }
            }
          ],
          series:[
            {
              name: '资产净值',
              type: 'line',
              symbol: 'none',
              data: [],
              itemStyle:{
                color:"#35acff"
              }
            },
          ]
        };
        for (let item of result){
          moment.locale('en', {
            months : [
              "一月", "二月", "三月", "四月", "五月", "六月", "七月",
              "八月", "九月", "十月", "十一月", "十二月"
            ]
          });
          let formatM = moment(item.tradeDate).format("MMMM YYYY");
          params.xAxis[0].data.push(formatM);
          params.series[0].data.push(Number(item.netValue).toFixed(4));
        }
        this.allocationResultData = params;
      },
      //配置按钮操作
      configClick(){
        this.zhikong++;
        this.$set(this,'zhikong',this.zhikong); //置空FOF组合
        this.gpData = [];
        this.zqData = [];
        this.isQuery=true;//设置构建FOF权限
          if(localStorage.getItem("testContentShow") !== "0"){
            this.infoContentCheckbox = false;
            this.isShowInfoModal = true;
          }else{
            if(this.cm ==3 || this.cm ==4){
              this.baseConfigParams = {cm:this.cm ,cl:0};
            }else{
              this.baseConfigParams = {cm:this.cm ,cl:this.cl};
            }
            //策略风险特征PK
            this.$http.get(this.$url.resultOfRisk).then(result => {
              this.do_resultOfRisk_l(result);
              this.do_resultOfRisk_r(result);
            });
             this.isConfig=true;
          }

      },
      //chechbox操作
      infoContentChange(e){
        this.infoContentCheckbox = e.target.checked
      },
      //免责声明操作
      modalOK(){
          if(this.infoContentCheckbox){
            localStorage.setItem("testContentShow","0");
          }
          this.isShowInfoModal = false;
          if(this.cm ==3 || this.cm ==4){
            this.baseConfigParams = {cm:this.cm ,cl:0};
          }else{
            this.baseConfigParams = {cm:this.cm ,cl:this.cl};
          }
          //策略风险特征PK
          this.$http.get(this.$url.resultOfRisk).then(result => {
            this.do_resultOfRisk_l(result);
            this.do_resultOfRisk_r(result);
          });
           this.isConfig=true;
      },
      modalClose(){
        this.isShowInfoModal = false;
      },

      //下拉框操作
      tnhChange(value){
        this.disableYhgModel = value == 3 || value == 4;
        this.cm = value;
        if(this.disableYhgModel){
          this.params.xjsx=2;
        }else{
          this.params.xjsx=1;
        }
       this.yhgChange(this.params.xjsx);

      },
      yhgChange(value){
        this.cl = value;
        // this.yhgData.map(item=>{
        //   if(item.value==value){
        //       this.$set(this.tableSource[0],"latestSize",item.text)
        //   }
        // })
      },
      // 查看风险提示详情
      viewDetails(){
        this.isShowModals=true;
      },
      modalOKs(){
        this.isShowModals = false;
      },
      modalCloses(){
        this.isShowModals = false;
      },
      //下单操作
      order(){
        if(!this.isQuery){
          this.$message.error('请先配置');
          return;
        }

        if(this.gpData.length<1 || this.zqData.length<1){
          this.isShowWarning = true;
        }else{
          this.orderShow=true;
          this.orderData = this.do_orderData();
        }
      },
     orderClose(){
       this.orderShow=false;
     },
     orderOk(){
       this.orderShow=false;
     },
     orderReset(){},
    },
    beforeDestroy () {
     this.zhikong=0;
    }
  };
</script>
