<template>
  <div class="fofbuild" style="height: 850px; overflow-y:scroll" v-wechat-title="this.title" >
    <div class="fofbuild-top">

      <a-form layout="inline">

        <template v-slot:expandIcon="props" >
          <a-icon type="" :rotate="props.isActive ? 90 : 0" />
        </template>
      <div style=" border:1px solid #DDDDDD">
        <div class="span-header">&nbsp;股票型</div>
         <div class="span-header-body">
           <div class="select-row">
             <a-row :gutter="24">
                  <a-col :md="4" :sm="8">
                    <a-form-item label="风格偏好" >
                      <a-select style="width:90px" @change="handleChange" v-model="params.stylePreference">
                        <a-select-option v-for="item in stylePreferenceOption" :key="item.key">{{item.value}}</a-select-option>
                      </a-select>
                   </a-form-item>
                  </a-col>

                  <a-col :md="4" :sm="8">
                    <a-form-item label="规模偏好" >
                      <a-select style="width:110px" @change="handleChange" v-model="params.stockSizeRequirement">
                        <a-select-option v-for="item in sizeRequirementOption" :key="item.key">{{item.value}}</a-select-option>
                      </a-select>
                   </a-form-item>
                  </a-col>

                  <a-col :md="6" :sm="10">
                    <a-form-item label="是否包含指数增强型基金">
                      <a-select  style="width:70px" @change="handleChange" v-model="params.isIndexEnhanced">
                        <a-select-option v-for="item in isIndexEnhancedOption" :key="item.key">{{item.value}}</a-select-option>
                      </a-select>
                   </a-form-item>
                  </a-col>
                  <a-col :md="6" :sm="24">
                      <el-button size="mini" type="danger" round class="btn-fof" @click="stockFOFbuild">构建FOF</el-button>
                  </a-col>
              </a-row>
           </div>
            <!-- table -->
            <template >
              <div class="table-svg">
                <a-table :columns="stockcolumns" :dataSource="stockTableData" :pagination='false' @change="handleChange" bordered>
                </a-table>
              </div>
             </template>

            <!-- 图表 -->
         <div class="fofbuild-top-echartsUtil">
           <div v-if="isStock">
              <echartsUtil :id="'1'" :data="stockOption" style="height:252px;"></echartsUtil>
           </div>
           <div v-else class= "zwf" >
             <img  src="@/assets/空白占位符.png">
             <span>点击【构建FOF】按钮，加载数据</span>
           </div>
         </div>
         </div>
      </div>

       <div class="kg"></div>
       <div style=" border:1px solid #DDDDDD">
         <div class="span-header">&nbsp;债券型</div>
          <div class="span-header-body">
            <a-row :gutter="24">
                 <a-col :md="5" :sm="8">
                   <a-form-item label="规模偏好">
                     <a-select defaultValue ="0" style="width:110px"  @change="handleChange" v-model="params.bondSizeRequirement">
                        <a-select-option v-for="item in sizeRequirementOption" :key="item.key">{{item.value}}</a-select-option>
                     </a-select>
                  </a-form-item>
                 </a-col>
                 <a-col :md="6" :sm="24">
                     <el-button size="mini" type="danger" round class="btn-fof" @click="bondFOFbuild">构建FOF</el-button>
                 </a-col>
             </a-row>

             <!-- table -->
             <template>
               <div class="table-svg">
                 <a-table :columns="bondcolumns" :dataSource="bondTableData" :pagination='false' @change="handleChange" bordered>
                 </a-table>
               </div>
              </template>

             <!-- 图表 -->

          <div class="fofbuild-top-echartsUtil">
             <div v-if="isBond">
                 <echartsUtil :id="'2'" :data="bondOption" style="height:252px;"></echartsUtil>
             </div>
             <div v-else class= "zwf" >
               <img  src="@/assets/空白占位符.png">
               <span>点击【构建FOF】按钮，加载数据</span>
             </div>

          </div>
        </div>
       </div>
       <div class="fof-order" >
           <el-button :disabled="isDisableOrder" size="mini" type="danger" style="width:200px;" class="btn-fof" @click="order">下单</el-button>
           <p><span style="color:gray;">点击'下单按钮'，可调整资产组合权重</span></p>
       </div>
       <!-- 提示 -->
        <div class="fofbuild-footer">

          <li><span style="color:#F56C6C"><strong>风险提示</strong></span></li>
          <li><span>尊敬的客户：</span></li>
          <li><span>
            在您获得本资产配置平台系统结论并用于实际投资时，可能会获得较高的投资收益，
            但同时也可能存在着较大的证券投资风险。请务必仔细阅读本系统平台的使用说明。
            我们将尽可能采取有效措施保护客户资料和其他各项活动的安全，本着对您负责的态度，
            公司郑重提示，在使用时，存在且不限于以下风险：<a href="javascript:" @click="viewDetails">查看详情</a>

          </span></li>

        </div>
   </a-form>
    </div>
    <!-- 下单模板 -->
    <FOForder :typeValue="typeValue" :orderData="orderData" :show="orderShow" @confirm="orderOk" @close="orderClose" @reset="orderReset">
    </FOForder>
    <!-- 声明modal模板 -->
    <modal :typeValue="typeValue" :show="isShowInfoModal" @confirm="modalOK" @close="modalClose" :showConfirm="true" :showCancle="true" title="免责声明">
    <div class="infoContent" slot="body">
      <div style="text-align: left">
        投资有风险，本网页的任何数据及其衍生产品仅供参考。资产配置平台系统依据市场公开数据及外购数据源作为计算基础数据，本公司将会尽力但不保证基础数据的及时性、准确性、真实性和完整性，不承担因任何数据不准确或遗漏等造成的任何损失或损害的责任。投资者在依据相关信息进行投资操作时，应当进行自主判断，所导致的盈亏由投资者自行承担。浏览本页面或使用本功能即表示投资者同意所载免责声明。
      </div>
      <div class="infoCheckBoxContent">
        <a-checkbox  :checked="infoContentCheckbox" @change="infoContentChange">下次不再提示</a-checkbox>
      </div>
    </div>
  </modal>

    <!--提示信息-->
    <modal :show="isShowWarning" @confirm="warningModalOK" @close="warningModalClose" confirmText="继续下单" :showConfirm="true" :showCancle="true" title="免责声明">
      <div class="infoContent" slot="body">
        <div style="text-align: left" v-if="stockTableData.length<1"><span style="font-weight: bold">股票型</span>资产未构建FOF组合,是否继续下单?</div>
        <div style="text-align: left" v-if="bondTableData.length<1"><span style="font-weight: bold">债券型</span>资产未构建FOF组合,是否继续下单?</div>
      </div>
    </modal>

  <!-- 风险提示modal模板 -->
    <modal-scroll  :show="isShowModals" @confirm="modalOKs" @close="modalCloses" :showConfirm="true" :showCancle="true"  title="风险提示">
      <div class="infoContent" slot="body">
      <div style="text-align: left">
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
import '@/style/fofbuild.css'
import moment from 'moment';
import echartsUtil from '@/echartsUtil/echartsUtil'
import modal from '@/modal/Modal'
import modalScroll from '@/modal/modalScroll'
import FOForder from '@/components/Order/FOForder'
import {twoOption} from '@/echartsUtil/echartsOptions'
import InputNumber from '@/components/utiljs/inputNumber'
import warningInfo from "../../components/AssetAllocation/warningInfo";
  export default {
    components : {
      echartsUtil,modal,modalScroll,InputNumber,FOForder
    },

    data() {
      return {
        title:'资产配置服务-FOF构建',
        //下单
        orderData:{},
        orderShow:false,
        typeValue:'FOF',
        isShowWarning:false,
        InputNumber:1,
        stylePreferenceOption:[{key:0,value:"大盘型"},{key:1,value:"中盘型"},{key:2,value:"小盘型"}],
        sizeRequirementOption:[{key:0,value:"无要求"},{key:1,value:"2亿以上"},{key:2,value:"10亿以上"}],
        isIndexEnhancedOption:[{key:1,value:"是"},{key:2,value:"否"}],
        params:{   //请求参数
          stylePreference:0,
          stockSizeRequirement:0,
          bondSizeRequirement:0,
          isIndexEnhanced:1,
         },
        moment,
        infoContentCheckbox:false,
        isShowInfoModal:false,
        isShowModals:false,
        //图表数据
        stockdata:[],
        stockOption:{},
        stockTableData:[],
        bondTableData:[],
        bondOption:{},
        typeValue:'',
        isStock:false,
        isBond:false,
        isDisableOrder:true
    }
  },
    watch:{
      stockTableData(val){
          if(val.length>0){
            this.isDisableOrder = false;
          }
      },
      bondTableData(val){
        if(val.length>0){
          this.isDisableOrder = false;
        }
      },
    },
    computed:{
      stockcolumns(){
       const stockcolumns = [
        {
          title: '基金代码',
          align:'center',
          dataIndex: 'fundCode',
          key: 'fundCode',
          // filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
          // filteredValue: filteredInfo.name || null,
          // onFilter: (value, record) => record.name.includes(value),
          sorter: (a, b) => a.fundCode.split(".")[0] - b.fundCode.split(".")[0],
          customRender: (text, row, index) => {
              return <a href="javascript:;">{text}</a>;
          },
        },
        {
          title: '基金名称',
          align:'center',
          dataIndex: 'fundName',
          key:'fundName',
          sorter: (a, b) => (a.fundName + '').localeCompare(b.fundName + ''),
          customRender: (text, row, index) => {
              return <a href="javascript:;">{text}</a>;
          },
        },
        {
          title: '基金经理',
          align:'center',
          dataIndex: 'fundManager',
          key: 'fundManager',
          sorter: (a, b) =>   (a.fundManager + '').localeCompare(b.fundManager + '') ,
          customRender:(text, row, index) => {
            return <a href="javascript:;">{text}</a>;
          }
        },
        {
          title: '基金类型',
          align:'center',
          dataIndex: 'fundType',
          key: 'fundType',
          sorter: (a, b) => (a.fundType + '').localeCompare(b.fundType + ''),
        },
        {
          title: '发行时间',
          align:'center',
          dataIndex: 'issueDate',
          key: 'issueDate',
          sorter: (a, b) => {
            if(moment(a.issueDate) > moment(b.issueDate)){
              return 1
            }else{
              return -1
            }
          }
        },
        {
          title: '上月业绩',
          align:'center',
          dataIndex: 'lastMonthReturn',
          key: 'lastMonthReturn',
          sorter: (a, b) => Number(a.lastMonthReturn.split("%")[0]) - Number(b.lastMonthReturn.split("%")[0]),
        },
        {
          title: '最新规模(亿)',
          align:'center',
          dataIndex: 'latestSize',
          key: 'latestSize',
          sorter: (a, b) => a.latestSize - b.latestSize,
        },
      ];
        return stockcolumns;
      },
    bondcolumns(){

     const bondcolumns = [
      {
        title: '基金代码',
        align:'center',
        dataIndex: 'fundCode',
        key: 'fundCode',
        // filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
        // filteredValue: filteredInfo.name || null,
        // onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.fundCode.split(".")[0] - b.fundCode.split(".")[0],
        customRender: (text, row, index) => {
            return <a href="javascript:;">{text}</a>;
        },
      },
      {
        title: '基金名称',
        align:'center',
        dataIndex: 'fundName',
        key:'fundName',
        sorter: (a, b) => (a.fundName + '').localeCompare(b.fundName + ''),
        customRender: (text, row, index) => {
            return <a href="javascript:;">{text}</a>;
        },
      },
      {
        title: '基金经理',
        align:'center',
        dataIndex: 'fundManager',
        key: 'fundManager',
        sorter: (a, b) =>  (a.fundManager + '').localeCompare(b.fundManager + '') ,
        customRender:(text, row, index) => {
          return <a href="javascript:;">{text}</a>;
        }
      },
      {
        title: '基金类型',
        align:'center',
        dataIndex: 'fundType',
        key: 'fundType',
        sorter: (a, b) => (a.fundType + '').localeCompare(b.fundType + ''),
      },
      {
        title: '发行时间',
        align:'center',
        dataIndex: 'issueDate',
        key: 'issueDate',
        sorter: (a, b) =>{
          if(moment(a.issueDate) > moment(b.issueDate)){
            return 1
          }else{
            return -1
          }
        }
      },
      {
        title: '上季度业绩',
        align:'center',
        dataIndex: 'lastQuarterReturn',
        key: 'lastQuarterReturn',
        sorter: (a, b) => Number(a.lastQuarterReturn.split("%")[0]) - Number(b.lastQuarterReturn.split("%")[0]),
      },
      {
        title: '最新规模(亿)',
        align:'center',
        dataIndex: 'latestSize',
        key: 'latestSize',
        sorter: (a, b) => a.latestSize - b.latestSize,
      },
    ];
      return bondcolumns;
    }
  },

    created(){
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
      stockloadData(){
        let that = this;
        //股票型table数据
        let stockurl = "/"+that.params.stylePreference+"/"+that.params.stockSizeRequirement+"/"+that.params.isIndexEnhanced;
        that.$http.get(that.$url.stockTableUrl+stockurl).then(res=>{
          //初始化table数据
          res.forEach(item=>{
            item.lastMonthReturn=Number(item.lastMonthReturn*100).toFixed(2)+'%'
            item.issueDate=moment(item.issueDate).format("YYYY/MM/DD");
            item.latestSize=Number(item.latestSize).toFixed(2)
          })
          that.stockTableData=res;
          if(res.length>0){
            that.isStock=true;
          }else{
            that.isStock=false;
          }
        });
        //股票型图表数据
        let value = that.getParam(that.params.isIndexEnhanced,that.params.stockSizeRequirement);
        that.$http.get(that.$url.stockFundUrl+"/"+value).then(res=>{
          //初始化生成折线图的数据
          that.stockdata=res;
          that.stockOption = twoOption('历史表现',that.getStockEcharsData(that.stockdata),"股基FOF组合","基准组合","","","","FOF");
        });
      },
      bondloadData(){
        let that = this;
        //债券型table数据
        that.$http.get(that.$url.bondTableUrl+"/"+that.params.bondSizeRequirement).then(res=>{
          //初始化table数据
          res.forEach(item=>{
            item.lastQuarterReturn=Number(item.lastQuarterReturn*100).toFixed(2)+'%'
            item.issueDate=moment(item.issueDate).format("YYYY/MM/DD");
            item.latestSize = Number(item.latestSize).toFixed(2)
          })
          that.bondTableData=res;
          if(res.length>0){
            that.isBond=true;
          }else{
            that.isBond=false;
          }
        });
        //债券型图表数据
        that.$http.get(that.$url.bondFundUrl+"/"+that.params.bondSizeRequirement).then(res=>{
          //初始化生成折线图的数据
          that.bonddata=res;
          that.bondOption = twoOption('历史表现',that.getBondEcharsData(that.bonddata),"债基FOF组合","基准组合","","","","FOF");
        });
      },
      //获取股票型历史表现图表的参数
      //val1:isIndexEnhanced--包含指数是否增强 ：(0:否,1:是)
      //val2:sizeRequirement ：(0:无要求,1:2亿以上,2:10亿以上)
      //value:合成后的type值
      getParam(val1,val2){

        if(val1==0 && val2==0){
            return 3;
          }
        if(val1==0 && val2==1){
            return 4;
          }
        if(val1==0 && val2==2){
            return 5;
          }

        if(val1==1 && val2==0){
            return 0;
          }
        if(val2==1 && val2==1){
          return 1;
        }

        if(val2==2  && val2==2){
          return 2;
        }
      },
      //股票型图表数据
      getStockEcharsData(dataSource){
        let that = this;
        let dateMap=[];
        let blueMap=[];
        let redMap=[];
          dataSource.map((item,index)=>{
           dateMap.push(moment(item.tradeDate).format('YYYY/MM/DD'));  //时间map
           if(that.params.stylePreference==0){

             blueMap.push(Number(item.largeCap*100).toFixed(2));//蓝色折线map   股基FOF组合
             redMap.push(Number(item.largeCapBenchmark*100).toFixed(2));  //红色折线map     基准组合
           }
           if(that.params.stylePreference==1){
             blueMap.push(Number(item.middleCap*100).toFixed(2));
             redMap.push(Number(item.middleCapBenchmark*100).toFixed(2));
           }
           if(that.params.stylePreference==2){
             blueMap.push(Number(item.smallCap*100).toFixed(2));
             redMap.push(Number(item.smallCapBenchmark*100).toFixed(2));
           }
       });
       let data={
         dateMap:dateMap,
         blueMap:blueMap,
         redMap:redMap
       };
       return data;
      },
      //债券型图表数据
      getBondEcharsData(dataSource){
        let that = this;
        let dateMap=[];
        let blueMap=[];
        let redMap=[];
          dataSource.map((item,index)=>{
           dateMap.push(moment(item.tradeDate).format('YYYY/MM/DD'));  //时间map
             blueMap.push(Number(item.benchmark*100).toFixed(2)); //蓝色折线map  股基FOF组合
             redMap.push(Number(item.protfolio*100).toFixed(2));  //红色折线map     基准组合

       });
       let data={
         dateMap:dateMap,
         blueMap:blueMap,
         redMap:redMap
       };
       return data;
      },
      // stockFOF构建
      stockFOFbuild(){
         this.typeValue="stock";
        if(localStorage.getItem("infoContentShow") !== "0"){
            this.infoContentCheckbox = false;
            this.isShowInfoModal = true;
          }else{
            this.stockloadData();
          }


      },
      // stockFOF构建
      bondFOFbuild(){
        this.typeValue="bond";
        if(localStorage.getItem("infoContentShow") !== "0"){
            this.infoContentCheckbox = false;
            this.isShowInfoModal = true;
          }else{
            this.bondloadData();
          }

      },
      // 下拉框选择
     handleChange(value,option){
     },
     // 查看风险提示详情
     viewDetails(){
       this.isShowModals=true;
     },
     //免责声明操作
     modalOK(data){
          if(this.infoContentCheckbox){
            localStorage.setItem("infoContentShow","0");
          }
          this.isShowInfoModal = false;
         if(data=="stock"){
            this.stockloadData();
         }
         if(data=="bond"){
            this.bondloadData();
         }

      },
      modalClose(){
        this.isShowInfoModal = false;
      },
      //风险提示操作
      modalOKs(){
        this.isShowModals = false;
      },
      modalCloses(){
        this.isShowModals = false;
      },
      infoContentChange(e){
        this.infoContentCheckbox = e.target.checked
      },
     Change(filters, sorter) {
       this.filteredInfo = filters;
       this.sortedInfo = sorter;
     },
      do_orderData(){
        let bondTableData = this.bondTableData ;
        let stockTableData = this.stockTableData ;
        return {
          bondTableData:bondTableData,
          stockTableData:stockTableData
        };
      },
     //下单操作
     order(){
       if(this.bondTableData.length>0 && this.stockTableData.length>0){
         this.orderShow=true;
         this.orderData = this.do_orderData();
       }else{
          this.isShowWarning = true;
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
  };
</script>
