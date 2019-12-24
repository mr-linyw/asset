<template>

    <a-layout>
        <a-layout-header >
          <div class="a-layout-header-img">
            <img  src="@/assets/顶部-中信建投LOGO.png">&#12288;
            <img  src="@/assets/顶部-分割线.png">&#12288;
             <strong style="font-size:17px" >资产配置服务</strong>　
          </div>

  　　　            <!-- <span  style="font-size:15px" >帮助中心</span>　　 -->
                    <!-- <a-dropdown>
                        <a class="ant-dropdown-link" href="#"><font color="white"> <span style="font-size:15px">linyawei</span> <a-icon type="down" /></font> </a>
                        <a-menu slot="overlay" @click="onClick">
                          <a-menu-item key="1">1st menu item</a-menu-item>
                          <a-menu-item key="2">2nd menu item</a-menu-item>
                          <a-menu-item key="3">3rd menu item</a-menu-item>
                        </a-menu>
                      </a-dropdown> -->

        </a-layout-header>
        <a-layout-content >

          <div class="a-layout-content-div">
            <a-tabs v-model="activeKey" size="small" :tabBarGutter=10 type="card" @change="handleClick">
              <a-tab-pane    v-for="(item) in atableTabs"
                :key="item.name"
                :tab="item.title"

              >
            </a-tab-pane>
          </a-tabs>
           </div>
        </a-layout-content>

        <a-layout-footer>
            <router-view />
        </a-layout-footer>
    </a-layout>


</template>

<script>
import '@/style/home.css'
  export default {
    data() {
      return {
        atableTabs: [{
        title: '研究报告',
        name: '1',
        content: ''
      }, {
        title: '宏观数据',
        name: '2',
        content: ''
      },
      {
      title: '资产配置',
      name: '3',
      content: ''
    }, {
      title: 'FOF构建',
      name: '4',
      content: ''
    }
    ],

        activeKey:"1",
        url: {
          AssetAllocation : "/views/asset-allocation/AssetAllocation",
          FOFbuild : "/views/asset-allocation/FOFbuild",
          MacroData : "/views/asset-allocation/MacroData",
          ResearchReport : "/views/asset-allocation/ResearchReport",
        },
      };
    },
    created() {
      var that = this
       that.handleClick("1");
      // getAction(that.url.queryICode, {pCode:that.queryParam.pCode}).then(res => {
      //     if (res.success) {
      //         that.queryICodeModel = res.result
      //     }
      // })
      // getAction(that.url.queryCustomerSacCode, {}).then(res => {
      //     if (res.success) {
      //         that.queryCustomerSacCodeModel = res.result
      //           //that.$set(that.queryParam,"pCode",that.queryCustomerSacCodeModel[0]);
      //       that.loadData();
      //     }
      // })
  },
    methods: {
      onClick(){

      },
      handleClick(activeKey) {
        let that = this;
        if(that.activeKey=="1"){
             this.$router.replace(that.url.ResearchReport);
        }
        if(that.activeKey=="2"){
             this.$router.replace(that.url.MacroData);
        }
        if(that.activeKey=="3"){
             this.$router.replace(that.url.AssetAllocation);
        }
        if(that.activeKey=="4"){
             this.$router.replace(that.url.FOFbuild);
        }


      },
    },

}
</script>
