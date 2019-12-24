
<template>
        <div id="app">
          <router-view/>
        </div>
</template>

<script>
export default {
  name: 'App',

  // created() {
  //       // beforeunload监听页面刷新事件
  //           window.addEventListener('beforeunload', this.saveStore)
  //       },
  //       destroyed() {
  //       // 销毁监听刷新事件
  //           window.removeEventListener('beforeunload', this.saveStore)
  //       },
  //       methods: {
  //           saveStore() {
  //           // 页面刷新保存当前vuex的状态
  //               sessionStorage.setItem('store', JSON.stringify(this.$store.state))
  //           }
  //       }

  // created () {
  //   //在页面加载时读取sessionStorage里的状态信息
  //   if (sessionStorage.getItem("store") ) {
  //       this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
  //   }
  //
  //   //在页面刷新时将vuex里的信息保存到sessionStorage里
  //   window.addEventListener("open",()=>{
  //       sessionStorage.setItem("store",JSON.stringify(this.$store.state))
  //   })
  // },


}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin-top: 0px;
}
</style>
