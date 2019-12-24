import Vue from 'vue'
import Routers from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/Login'
import Home from '@/views/Home'
import AssetAllocation from '@/views/asset-allocation/AssetAllocation'
import FOFbuild from '@/views/asset-allocation/FOFbuild'
import MacroData from '@/views/asset-allocation/MacroData'
import ResearchReport from '@/views/asset-allocation/ResearchReport'
import Details from '@/views/asset-allocation/Details'
Vue.use(Routers)

export default new Routers({


  routes:
  [
      {
        path: '/',
        name: 'Login',
        component: Login,
        // redirect:"/views/Home",//默认跳转到首页
      
      },
      {
            path:"/views/Home",
            name:'Home',
            component:Home,
      },

      {
        path: '/views/asset-allocation/Details',
        name: 'Details',
        component: Details,
      },

      {
            path:"/views/asset-allocation",
            name:'Home-All',
            component:Home,
            children:[
              {
                    path:"AssetAllocation",
                    name:'AssetAllocation',
                    component:AssetAllocation,
              },
              {
                    path:"FOFbuild",
                    name:'FOFbuild',
                    component:FOFbuild,
              },
              {
                    path:"ResearchReport",
                    name:'ResearchReport',
                    component:ResearchReport,
              },
              {
                    path:"MacroData",
                    name:'MacroData',
                    component:MacroData,
              },

            ]
      },

      {

        path: '/404',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
      }
  ]
})
