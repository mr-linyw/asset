// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import Antd from 'ant-design-vue'
// import message from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//自己写的样式
import './style/theme.css'
import './style/character.css'
//引入两个文件
import url from './api/requestUrl'
import http from './api/axios'
import VueClipboard from 'vue-clipboard2'
import VueWechatTitle from 'vue-wechat-title';
Vue.use(VueWechatTitle)
Vue.use(VueClipboard)
Vue.use(Antd)
// Vue.use(message)
// 注册element-ui
Vue.use(ElementUI)
//挂载到VUE实例，以便全局使用
Vue.prototype.$url = url;
Vue.prototype.$http = http;
// Vue.prototype.$message = message;
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false



  router.beforeEach((to,from,next)=>{
    if(to.meta.title){
      document.title=to.meta.title;
    }
    next();
  });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,

  echarts,
  components: { App },
  template: '<App/>',

});
Vue.directive('focus', {
// 当被绑定的元素插入到 DOM 中时……
inserted: function (el) {
// 聚焦元素
el.focus()
}
})
// Vue.directive('title', {
//   inserted: function (el, binding) {
//     document.title = el.dataset.title
//   }
// })
