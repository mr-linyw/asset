import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 const state={   //要设置的全局访问的state对象
     count:1,
     detailsData: {
       title: '',
       date:'',
       textname:''
     },

     //要设置的初始属性值
   };
const getters = {   //实时监听state值的变化(最新状态)
   getcount(state){
     return state.state
   },
    getDetailsData(state) {  //承载变化的showFooter的值
       // state.detailsData = sessionStorage.getItem("detailsData")
       return state.detailsData
    },

};
const mutations = {
  bycoune(state,num){
    state.count=num
  },
    byDetailsData(state,items){ //同上，这里面的参数除了state之外还传了需要增加的值items
       state.detailsData.title=items.title;
       state.detailsData.date=items.date;
       state.detailsData.textname=items.textname;
      // sessionStorage.setItem("detailsData", JSON.stringify(items))
      console.log(state.detailsData.title);
    console.log(state.detailsData);
    }
};
 const actions = {
   bycount(context,num){
       context.commit('bycoune',num);
   },
    byValue(context,items) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
        context.commit('byDetailsData',items);



    },

};
  const store = new Vuex.Store({
       state,
       getters,
       mutations,
       actions
});
export default store
