<template>
    <div class="all"style="height: 900px;"  v-wechat-title="this.title" >
        <div class="a-layout-header">
          <div class="a-layout-header-img">
            <img  src="@/assets/顶部-中信建投LOGO.png">&#12288;
            <img  src="@/assets/顶部-分割线.png">&#12288;
             <strong style="font-size:17px" >资产配置服务</strong>　
          </div>
        </div>
        <div class="all-text">
          <div class="a-layout-content-tabs-d">
              <span>资产配置</span>&#12288;<a-icon type="right"  />&#12288;<span>研报详情</span>
          </div>
          <div class="all-text-center"  style="height: 800px; overflow-y:scroll">
            <div class="a-layout-footer-t">
              <div class="a-layout-footer-left">
                <div class="a-layout-footer-header">
                        <span ><a-icon type="file-text" :style="{ fontSize: '16px', color: '#08c' }"/> 宏观政策</span>
                </div>
                <div class="all-divider">
                   <a-divider />
                </div>
                <div class="a-layout-footer-center">
                    <div class="a-layout-footer-center-header" >
                      <div class="center-header-p">
                        <p>{{dataSource.title}}</p>
                        <!-- {{moment().format('YYYY-MM-DD')}} -->
                      </div>
                      <div class="center-header-s">
                        <span :style="{ fontSize: '15px', color: '#C0C0C0' }">{{moment(dataSource.createTime).format('YYYY-MM-DD')}}</span>
                        <span :style="{ fontSize: '15px', color: '#C0C0C0' }">{{name}}</span>
                      </div>

                    </div>
                    <div class="a-layout-footer-center-center">
                      <div class="zhaiyao">
                        <span :style="{ fontSize: '15px' }">摘要</span>
                        <p>{{dataSource.digest}}</p>
                      </div>
                    </div>
                </div>
                <div class="a-layout-footer-footer">
                    <el-button size="mini" round @click="showModal"><a-icon type="cloud-download" :style="{ fontSize: '16px', color: '#08c' }"/>下载</el-button>
                </div>
              </div>
              <div class="a-layout-footer-right" style="height: 800px; overflow-y:scroll">
                <pdf
                    v-for="i in numPages"
                    :key="i"
                    :src="src"
                    :page="i"
                    class="pdf-set"
                ></pdf>
              </div>
            </div>
          </div>
        </div>
        <modal
          ref="modal"
          @close="close"
          @confirm="confirm"
          >
          <!-- 点击下载填充modal的slot -->
          <div v-if="modalType==='send'" class="content" slot="body">
            <div class="modal-text" @click="send">
              <span ><a-icon type="mail" :style="{ fontSize: '16px', color: '#08c' }"/> 发送至邮箱</span>
            </div>
            <div class="modal-text-two" @click="copy">
              <span class="copy-btn" v-clipboard:copy="f" v-clipboard:success="onCopy" v-clipboard:error="onError"><a-icon type="copy" :style="{ fontSize: '16px', color: '#08c' }"/> 复制下载链接</span>
            </div>
          </div>
         <!-- 点击发送至邮箱填充modal的slot -->
          <div v-else class="content" slot="body">

            <div class="text" >
              <span >该研报将发送至您预留的Mr.LinYW@aliyun.com邮箱，点击确认直接发送</span>
            </div>

            <div class="text-two">
              <span /><font color="gray">或发送至下面邮箱</font></span>
               <a-input placeholder="请填写其他邮箱" v-model="email" />
            </div>

          </div>
      </modal>
    </div>
</template>

<script>
import moment from 'moment'
import pdf from 'vue-pdf'
import modal from '@/modal/Modal'
import VueEvent from '@/components/utilJs/ByValue'
import '@/style/Details.css'
  export default{
    components: {
    pdf,modal
  },
    data(){
      return{
        numPages: undefined,
        src: pdf.createLoadingTask('/static/20191125-中信建投-中信建投最新周择时观点＆20191122日报：创业板仍将引领A股年末反攻行情.pdf'), // pdf文件地址
       title:'',
       email:'',
       dataSource:{},
       modalType:"",
       isModalVisible:false,
       moment,
       showCancle:true,
       showConfirm:true,
       dataSource:{ },
       name:"",
       f:'22222',
       toKen:'',
       submitter:{
         'user':'CSC99999',
         'department':'b',
         'group':'c',
         'role':'d',
         'post ':'e'
       },
        id:'',

    }
    },
    created(){
      //get token
      this.$http.post(this.$url.toKenUrl,{}).then(res=>{
        this.toKen=res;
      })


    },
   watch:{
     //初始化加载文件
      id(id){
        if(id!=""){
          let  getFileData="<?xml version='1.0' encoding='UTF-8'?><ESBREQ><HEADER><SERVICE_CODE>s-000531</SERVICE_CODE><VERSION>1</VERSION><CONSUMER_CODE>CS-1/65/S0133-080</CONSUMER_CODE><PASSWORD>ff808081543ee9f301559a97e857306a</PASSWORD><MESSAGE_ID>OA-TYGL-007-id_list</MESSAGE_ID><DTSEND>20150108011000000</DTSEND><EXT1></EXT1><EXT2></EXT2><EXT3></EXT3></HEADER><XMLDATA><![CDATA[<root><appId>1</appId><token>"
                            +this.toKen
                            +"</token><submitter>{'user':'CSC99999','department':'b','group':'c','role':'d','post ':'e'}</submitter><id>"
                             +this.id
                            // +"Cu0EbFkiOr6AdLOgAAACDJ2FL8w890"
                            +"</id></root>]]></XMLDATA></ESBREQ>"

          this.$http.get(this.$url.fileUrl,getFileData).then(res=>{

          })
        }
      }
   },
    mounted(){
      //获取数据
      this.$http.get(this.$url.reportUrl+"/"+this.$route.query.id).then(res=>{
         this.dataSource = res;

         //设置pdf   id
           if(res.reportPdfId!=null){
             this.id=res.reportPdfId
           }else{
             if(res.reportFileId!=null){
                 this.id=res.reportFileId
             }
           }
         //设置  标题
         this.title = "资产配置研报-"+res.title
         this.name=this.$route.query.name;
      });

   // 有时PDF文件地址会出现跨域的情况,这里最好处理一下
　　　　this.src = pdf.createLoadingTask(this.src);
   // this.data=this.$route.params.data;
      this.src.then(pdf => {
          this.numPages = pdf.numPages;
      });
    },
  computed:{

    title(){
      return this.$store.state.count
    },
    textname(){
      return this.$store.state.detailsData.textname
    },
    date(){
      return this.$store.state.detailsData.count
    }
  },

    methods:{
      async loadPdfHandler () {
        //src为你服务器上存放pdf的路径
        this.pdfUrl = pdf.createLoadingTask(this.src);
        this.pdfUrl.then(pdf => {
          this.numPages = pdf.numPages
        })
      },

      change1(){
     if(this.currentPage>1){
       this.currentPage--
     }
   },
   change2(){
     if(this.currentPage < this.pageCount){
       this.currentPage++
     }
   },
     showModal(){
        this.$refs.modal.show = true;
        this.$refs.modal.title="选择下载方式"
        this.modalType = "send";
     },
     send(){
       this.$refs.modal.close();
       this.$refs.modal.show = true;
       this.$refs.modal.title="发送至邮箱"
       this.$refs.modal.showConfirm=this.showConfirm
       this.$refs.modal.showCancle=this.showCancle
       this.modalType = "";
     },
     copy(){

     },
     close(){
       this.$refs.modal.showConfirm=false
       this.$refs.modal.showCancle=false
       this.$refs.modal.show=false;
     },
     confirm(){
       this.$refs.modal.showConfirm=false
       this.$refs.modal.showCancle=false
     },
      onClick(){
      },
      // 复制成功时的回调函数
      onCopy (e) {
         this.$message.success("研报地址已复制到剪切板！")
      },
      // 复制失败时的回调函数
      onError (e) {
         this.$message.error("抱歉，复制失败！")
      }

      },


  }
</script>
