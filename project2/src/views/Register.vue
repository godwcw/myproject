<template>
  <div class="register">
    <div class="login">
      <h2 class="title">用户注册</h2>
      <div class="loginMenu">
        <span>用户名：<input type="text"></span>
        <span>密码：<input type="password" @input='pwdInputs' v-model='tool'></span>
        <span>确认密码：<input :class='{box:this.tag}' type="password" @input='pwdInput' v-model='tools'></span>
      </div>
      <div class="buttons">
        <button @click="backClick">注册</button>
      </div>
    </div>
  </div>
</template>

<script>





export default {

  components: {
  },
  data() {
      return {
          tag:false,
          tool:'',
          tools:''
      }
  },
  methods: {
      backClick(ev){
          let uVal = ev.target.parentNode.previousSibling.firstChild.lastChild.value
          let pVal = ev.target.parentNode.previousSibling.lastChild.lastChild.value
          let cVal = ev.target.parentNode.previousSibling.lastChild.previousSibling.lastChild.value
          if(!uVal){
            alert('用户名不能为空')
          }
          else if(pVal !== cVal){
              this.tool = ''
              this.tools = ''
              this.tag =false
            alert('俩次密码输入不一致，请重新输入')
          } else if(pVal.length < 6){
            this.tool = ''
            this.tools = ''
            this.tag =false
            alert('密码长度不能少于六位')
          }else if(pVal === cVal && uVal && pVal.length>=6){
            console.log(uVal,pVal)
            this.$store.commit('setuserMsg',{userMsg:[uVal,pVal]})
            localStorage.setItem("userName",uVal)
            localStorage.setItem("userPwd",pVal)
            
            alert('注册成功')
            this.$router.push('/home')
          }
          
      },
      pwdInputs(ev){
        let val = ev.target.parentNode.nextSibling.lastChild.value
          if(val === ev.target.value){
                this.tag = false
            }else if(val){
                this.tag = true
            }
      },
      pwdInput(ev){
          let val = ev.target.parentNode.previousSibling.lastChild.value
          if(val === ev.target.value || !ev.target.value){
              this.tag = false
          }else{
              this.tag = true
          }
      }
  },
}
</script>

<style lang="less" scoped>
.register{
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
        &:nth-child(3){
          input{
              margin-left: -1em;
          } 
          .box{
              border: 1px solid #F56C6C;
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