<template>
  <div class="login-all">
    <div class="login_form">
        <div style="height:58px;"></div>
        <div class="login_form_top">
          <img class="" src="@/assets/登录页-中信建投LOGO.png">&nbsp;
          <span>中信建投资产配置服务</span>
        </div>
        <div style="height:38px;"></div>

        <div class="login_form_input">
            <a-input v-model="userName" v-focus="userFocus" style="width:328px;" placeholder="请输入账号"/>
            <div style="height:18px;"></div>
            <a-input-password v-model="password" style="width:328px;" placeholder="登录密码" />
        </div>
        <div class="login_form_button">
          <el-button size="mini" type="danger" round class="login_btn_confirm" @click="login"><span :style="{ fontSize: '17px', color: '#FFFFFF' ,width:'328px'}">登录</span></el-button>
        </div>
    </div>
  </div>
</template>



<script>
//  import { userLogin } from '../../api/api';

  export default {
    data() {
      return {
        userName: '',
        password: '',
        isBtnLoading: false
      }
    },
    created () {
      if(JSON.parse( localStorage.getItem('user')) && JSON.parse( localStorage.getItem('user')).userName){
        this.userName = JSON.parse( localStorage.getItem('user')).userName;
        this.password = JSON.parse( localStorage.getItem('user')).password;
      }
    },
      directives: {
      focus: {
      // 指令的定义
      inserted: function (el) {
      el.focus()
      }
      }
    },
    computed: {
      btnText() {
        if (this.isBtnLoading) return '登录中...';
        return '登录';
      }
    },
    methods: {
      login() {
        if(this.userName && this.password){
            // this.btnText();
            this.$router.replace('/views/Home');
        }else{
          if (!this.userName) {
            this.$message.error('请输入账号');
            return;
          }
          if (!this.password) {
            this.$message.error('请输入密码');
            return;
          }
        }
      }
    }
  }
</script>
<style>
body{
  margin: 0px;padding: 0px;
}
  .login-all{
    background-image: url('./assets/登录背景.png');
    width: 100%;
    height: 100vh;
    background-size: 100% 100%;
    position: relative;
    overflow:hidden;
  }
  .login_form {
   height: 365px;
   width: 434px;
   background: #FFC8B4;
   margin-top: 10%;
   margin-left: 60%;
   /* opacity:0;
   filter:"alpha(opacity=0)";
  -ms-filter:"alpha(opacity=0)"; */
  }
  .login_form_top{
    text-align: center;
    font-size: 20px;
    line-height: 32px;
    height: 32px;
    font-weight:bold;
  }
  .login_form_input{
    text-align: center;
    font-size: 15px;
  }
  .login_form_button{
    text-align: center;
    margin-top: 30px;
  }
  .login_btn_confirm{
      width: 328px;
      color: #000;
      background:#CD3833;
  }
</style>
