<!-- modal模板，内置slot，可随意替换，直接引用，不需要再新建页面 -->
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click="close" v-show="show"  >
      <div class="ordermodal" @click.stop role="dialog" aria-labelledby="modalTile" arial-describedby="modalDescription" >
        <div class="modal-header" id="modalTitle">
        <slot name="header">
            {{title}}
            <a-icon type="close-circle" class="modal-header-title" :style="{ fontSize: '16px', color: '#111111'}" @click="close" aria-label="Close modal"/>
        </slot>
      </div>
      <div class="modal-body" id="modalDescription" style="height:600px;">
        <div style="height:420px;" >
            <div class="formclass">
              <div class="p-class">
                <p>您将提交如下交易信息，您可修改资产权重与资金组合权重。</p>
              </div>
              <div class="ordertables">
                <a-form layout="inline">
                         <a-form-item label="股票(%):">
                           <InputNumber width="80px" :disabled="stockTableData.length<1" v-model="gpNumber"></InputNumber>
                         </a-form-item>

                         <a-form-item label="债券(%):">
                           <InputNumber width="80px" :disabled="bondTableData.length<1" v-model="zqNumber" ></InputNumber>
                        </a-form-item>
                    <br/>
                   <div class="span-class">
                     <span v-bind:class="{'zx-errorInfo':errorRule1}" :style="{ fontSize: '15px', color: '#999' }">*各类资产权重值之和应为100%</span>
                   </div>
                    <el-divider></el-divider>
                    <div class="orderleft">
                      <div class="order-shang">
                        <span ><strong>股票型组合</strong></span>
                          <div class="ordertable">
                            <a-table v-show="stockTableData.length>0" :columns="stockcolumns" :dataSource="stockTableData" :pagination='false' @change="handleChange" bordered>
                              <template slot="stockoperation" slot-scope="text, record">
                                <InputNumber v-model="record.countQz" width="75px" ></InputNumber>
                              </template>
                            </a-table>
                            <span class="orderNoData" v-show="!stockTableData.length>0">无构建基金组合</span>
                          </div>
                      </div>

                    </div>
                    <div class="orderright">
                      <div class="order-shang">
                        <span><strong>债券型组合</strong></span>
                        <div class="ordertable">
                          <a-table v-show="bondTableData.length>0" :columns="bondcolumns" :dataSource="bondTableData" :pagination='false' @change="handleChange" bordered>
                            <template slot="bondoperation" slot-scope="text, record">
                              <InputNumber v-model="record.countQz" width="75px" ></InputNumber>
                            </template>
                          </a-table>
                          <span class="orderNoData" v-show="!bondTableData.length>0">无构建基金组合</span>
                        </div>
                      </div>

                    </div>
                </a-form>
              </div>

            </div>
        </div>
          <div class="order-tixing">

          </div>
          <div class="aa" >
            <!-- 金权重值之和应为该类资产权重值 -->
            <span v-bind:class="{'zx-errorInfo':errorRule2}" :style="{ fontSize: '15px',color:'#999'}">*各基金权重值之和应为该类资产权重值</span>
          </div>
          <div class="order-details">
            <span :style="{ fontSize: '13px', color: 'red' }">*</span><span>确认下单表示您以知晓相关风险。
              <a href="javascript:" @click="viewDetails" >{{showorder?'收起' : '查看详情'}}</a></span>
          </div>
          <div class="details-ts" v-if="showorder">
            <div style="text-align: left">
              <li><span style="color:red">风险提示</span></li>
              <li><span>尊敬的客户：</span></li>
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
          <div class="roder-footer">
            <slot name="footer">
              <el-button size="mini" type="info" round class="btn-close" @click="reset" >重置</el-button>
              <el-button size="mini" type="info" round class="btn-close" @click="close" >取消</el-button>
              <el-button size="mini" type="danger" round class="btn-confirm" @click="confirm">确认下单</el-button>
              <!-- <button type="button" class="btn-green" @click="close" aria-label="Close modal">关闭</button> -->
            </slot>
          </div>
      </div>



      </div>
    </div>
  </transition>

</template>
<script>
 import '@/style/orderModal.css'
  import '@/style/modal.css'
  import InputNumber from '@/components/utiljs/inputNumber'
export default {
   name: 'orderModal',
  provide(){
    return {
      instance:this
    }
  },
   components : {
    InputNumber
   },
    // props: ['show'],
    props:{
      orderData:Object,
      typeValue: {
          type: String,
          default: ""
      },
      // 是否显示
    show: {
      type: Boolean,
      default: false,
    },


  },
  watch:{
    orderData:{
      handler(val){
        this.doOrderData(val);
      },
      deep:true
    },
    gpNumber(val){
      let f_count = Number(parseFloat(val) / 5).toFixed(2);
      for (let item of this.stockTableData){
        item.countQz = f_count
      }
    },
    zqNumber(val){
      let f_count = Number(parseFloat(val) / 5).toFixed(2);
      for (let item of this.bondTableData){
        item.countQz = f_count
      }
    },
    stockTableData:{
      handler(val){
        this.checkRule2(val,this.bondTableData)
      },
      deep:true,
      immediate:true
    },
    bondTableData:{
      handler(val){
        this.checkRule2(this.stockTableData,val)
      },
      deep:true,
      immediate:true
    }
  },
    data () {
       return {
         numberState:0,
         isUserCustom:true,
         errorRule2:false,
         gpNumber:0,
         zqNumber:0,
         InputNumber:1,
         showorder:false,
         title:"一键下单",
         //股票table
         stockTableData:[],
         //债券table
         bondTableData:[],
         //现金table
         windTableData:[
           { fundCode:'070008.OF',
             fundName:'嘉实货币基金',
             quanzhong:'10'
            }
         ],
        }
      },
      computed:{
        errorRule1(){
          this.checkRule2(this.stockTableData,this.bondTableData);
          return (parseFloat(this.gpNumber) + parseFloat(this.zqNumber))!==100 && this.isUserCustom;
        },
        stockcolumns(){
         const stockcolumns = [
          {
            title: '基金代码',
            align:'center',
            dataIndex: 'fundCode',
            key: 'fundCode',
          },
          {
            title: '基金名称',
            align:'center',
            dataIndex: 'fundName',
            key:'fundName',
          },
           {
             title: '基金权重',
             dataIndex: 'stockoperation',
             scopedSlots: { customRender: 'stockoperation' },
             width:130,
             align:"center"
           }
        ];
          return stockcolumns;
        },
      bondcolumns(){

       const bondcolumns = [
        {
          title: '代码',
          align:'center',
          dataIndex: 'fundCode',
          key: 'fundCode',

        },
        {
          title: '名称',
          align:'center',
          dataIndex: 'fundName',
          key:'fundName',

        },
         {
           title: '基金权重',
           dataIndex: 'bondoperation',
           scopedSlots: { customRender: 'bondoperation' },
           width:130,
           align:"center"
         }
      ];
        return bondcolumns;
      },
      windcolumns(){

       const windcolumns = [
        {
          title: '代码',
          align:'center',
          dataIndex: 'fundCode',
          key: 'fundCode',

        },
        {
          title: '名称',
          align:'center',
          dataIndex: 'fundName',
          key:'fundName',

        },
        {
          title: '权重(%)',
          align:'center',
          dataIndex: 'quanzhong',
          key: 'quanzhong',
        },
      ];
        return windcolumns;
      },
    },
      methods: {
        checkRule2(stockTable,bondTableData){
          let scount = 0;
          if(stockTable.length>0){
            for (let item of stockTable){
              scount += parseFloat(item.countQz);
            }
          }

          let wcount = 0;

          if(bondTableData.length>0){
            for (let item of bondTableData){
              wcount += parseFloat(item.countQz);
            }
          }
          if(parseFloat(scount).toFixed(2) === parseFloat(this.gpNumber).toFixed(2) && parseFloat(wcount).toFixed(2) === parseFloat(this.zqNumber).toFixed(2)){
            this.errorRule2 = false;
          }else {
            this.errorRule2 = true;
          }
        },
        doOrderData(data){
          this.isUserCustom = false;
          let gpData = data.stockTableData,zqData = data.bondTableData;
          // if(gpData.length>0){
          //   this.gpNumber = 50;
          // }else{
          //   this.gpNumber = 0;
          //   this.zqNumber = 100
          // }
          //
          // if(zqData.length>0){
          //   this.zqNumber = 50;
          // }else{
          //   this.zqNumber = 0;
          //   this.gpNumber = 100
          // }

          if(gpData.length>0 && zqData.length>0){
            this.gpNumber = 50;
            this.zqNumber = 50;
          }else{
            if(gpData.length<1){
              this.gpNumber = 0;
              this.zqNumber = 100;
            }
            if(zqData.length<1){
              this.zqNumber = 0;
              this.gpNumber = 100;
            }
          }

          for (let item of zqData){
            item["countQz"] = parseFloat(this.zqNumber / 5).toFixed(2);
          }
          for (let item of gpData){
            item["countQz"] =  parseFloat(this.gpNumber / 5).toFixed(2);
          }

          this.stockTableData = JSON.parse(JSON.stringify(gpData));
          this.bondTableData = JSON.parse(JSON.stringify(zqData));

        },
        // Change事件
        handleChange(){},
        onChange(){},
        // 确定按钮事件
        confirm:function() {
          if(!this.errorRule2&&!this.errorRule1){
            this.$emit('confirm',this.typeValue);
          }
        },
        close: function () {
          this.$emit('close');

        },
        reset:function(){
          this.doOrderData(this.orderData);
          this.$emit('reset');
        },
        viewDetails(){
          this.showorder=!this.showorder;
        }
      },
      beforeDestroy () {

      }
    }
</script>
