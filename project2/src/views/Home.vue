<template>
  <div class="home">
    <div class="login">
      <h2 class="title">用户登录</h2>
      <div class="loginMenu">
        <span>用户名：<input type="text" v-model='uvalue'></span>
        <span>密码：<input type="password" v-model='pvalue'></span>
        <p class="tips"><input @input="autoLogin" :checked='checked' id="arrow" type="checkbox"><label id="arrow">自动登录</label><span>无账号请先进行注册</span><span class="change" @click='changeClick'>修改密码</span> </p>
      </div>
      <div class="buttons">
        <button @click='loginClick'>登录</button>
        <button @click="registerClick">注册</button>
        <button @click="backClick">管理员界面</button>
      </div>
    </div>
  </div>
</template>

<script>
  import setCookie from '../lib/cookie'
  import getCookie from '../lib/getcookie'
export default {
  created() {
    try {
      let uVal = getCookie("userName").userName
      let pVal =getCookie("userPwd").userPwd
      this.uvalue = uVal
      this.pvalue = pVal
      this.checked = true
      setTimeout(() => {
        this.$router.push('/about')
      }, 4000);
      
    } catch (error) {
      console.log('warning: uVal || upVal is null')
    }
    },
    
    // console.log(getCookie("userName").userName,getCookie("userPwd").userPwd)


  data() {
    return {
      uvalue:'',
      pvalue:'',
      checked:false
    }
  },
  methods: {
    autoLogin(){
      let val = localStorage.getItem("userName")
      let vals = localStorage.getItem("userPwd")
      this.checked = !this.checked
      if(this.checked == true && this.uvalue == val && vals == this.pvalue){
        setCookie("userName",this.uvalue,60)
        setCookie("userPwd",this.pvalue,60)
      }else if(this.checked == false){
        setCookie("userName",this.uvalue,-1)
        setCookie("userPwd",this.pvalue,-1)
      }
      
    },
    
    changeClick(){
      let val = localStorage.getItem("userPwd")
      if(val == ''){
          return 
      }
      this.$router.push('/change')
    },
    registerClick(){
      let val = localStorage.getItem("userName")
      let vals = localStorage.getItem("userPwd")
      console.log(val,vals)
      if(val == null && vals == null){
        this.$router.push('/register')
      }else{
        alert('您已注册账号')
      }  
    },
    loginClick(ev){
      let uVal = ev.target.parentNode.previousSibling.firstChild.lastChild.value
      let pVal = ev.target.parentNode.previousSibling.firstChild.nextSibling.lastChild.value
      let val = localStorage.getItem("userName")
      let vals = localStorage.getItem("userPwd")
       if(!uVal || !pVal){
        alert('用户名或者密码不能为空')
      }
      else if(uVal !== val && pVal !== vals){
        this.uvalue = ''
        this.pvalue = ''
        alert('用户名和密码输入错误')
      }
      else if(pVal !== vals){
        this.pvalue = ''
        alert('密码输入错误')
      }
      else if(uVal !== val){
        this.uvalue = ''
        alert('用户名输入错误')
      } 
      else if(uVal === val && pVal === vals){
        this.$router.push('/about')
      }
    },
    backClick(){
      this.$router.push('/')
    }
  },
}
</script>

<style lang="less" scoped>
.home{
  .login{
    width: 400px;
    margin: 0 auto;
    border: 1px solid #bdbdbd8a;
    margin-top: calc(50vh - 178px) ;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    h2{
      text-align: center;
      font-size: 20px;
      margin-top: 10px;
    }
    .loginMenu{
      display: flex;
      flex-direction: column;
      .tips{
        display: flex;
        justify-content: center;
        align-items: center;
        label{
          color: #909399;
          font-size: 12px;
        }
        span{
          font-size: 12px;
          color: #909399;
        } 
        .change:hover{
            text-decoration: underline;
            cursor: pointer;
            color: #40a0ff;
          }
      }
      span{
        display: flex;
        align-items: center;
        justify-content: center;
        padding:  0 10px;
        margin: 10px 0;
        height: 30px;
        &:nth-child(2){
          input{
              margin-left: 1em;
          } 
        }
        input{
          border: 1px solid #DCDFE6;
        }
      }
    }
    .buttons{
      display: flex;
      justify-content: center;
      button{
            line-height: 1;
            white-space: nowrap;
            background: #fff;
            border: 1px solid #dcdfe6;
            color: #606266;
            text-align: center;
            transition: .1s;
            font-weight: 500;
            padding: 10px 14px;
            font-size: 12px;
            border-radius: 4px;
            margin: 10px 10px;
            &:hover{
              background: #40a0ff42;
              color: #40a0ff;
            }
      }
      
    }
  }
}
</style>
