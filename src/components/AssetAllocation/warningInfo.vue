<template>
    <div class="warningInfo">
      <div style="color:#CD3833;font-weight: bold;">风险提示</div>
      <div>尊敬的客户：</div>
      <span>
        在您获得本资产配置平台系统结论并用于实际投资时，可能会获得较高的投资收益，但同时也可能存在着较大的证券投资风险。请务必仔细阅读本系统平台的使用说明。
        我们将尽可能采取有效措施保护客户资料和其他各项活动的安全，本着对您负责的态度，公司郑重提示，在使用时，存在且不限于以下风险：
      </span>
      <span style="color: #327cc0;cursor: pointer;" @click="expend">{{!isExpend ? '展开详情' : '收起详情'}}</span>
      <pre v-show="isExpend">
      1、资产配置平台系统仅是建立在基础数据（数据来源包括：市场公开数据及本公司外购数据源）平台上的一个页面，它同样
        具有电子化系统的使用风险。  

      2、以下原因都可能造成您使用资产配置系统时出现中断、停顿、延迟和显示失败等情况：
      1）电脑病毒、黑客入侵、计算机软硬件故障；
      2）您交易使用的电脑终端与行情、交易通讯线路发生故障；
      3）其他因网络或您的电脑终端可能出现的故障及其他不可测因素；
      4）因软件关闭、关机、繁忙或网络中断等其他原因出现延迟、中断、停顿或数据不完全，甚至出现系统故障，从而使系统显
        示出现延迟、中断、遗失、无法触发、数据错误

      3、软件适配风险。您的计算机配置、性能或软件系统与所提供的交易系统不匹配，无法及时显示结果的风险。

      4、政策变化风险。由于相关政策变化导致的风险。

      5、证券监管机构确定的其他风险。

      6、不可抗力及其他可能存在的风险。

      7、任何系统的使用都是建立在专属密码登录的前提下，凡您使用专属账号及密码进行的交易、查询及其他行为，均视为您本人的行
        为，请妥善保管自己的密码，由于您管理不善造成的密码泄露所带来的损失，公司不承担任何责任。
      </pre>
    </div>
</template>

<script>
    export default {
        name: "warningInfo",
      data(){
        return{
          isExpend:false
        }
      },
      methods:{
        expend(){
            this.isExpend = !this.isExpend;
        }
      }
    }
</script>

<style scoped>

  .warningInfo{
    width: 852px;
    height: auto;
    line-height: 24px;
    font-size: 14px;
    color: #777;
  }

  .warningInfo pre{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

</style>
