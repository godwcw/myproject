<template>
  <div class="admin">
    <div class="login">
      <h2 class="title">管理员登录</h2>
      <div class="loginMenu">
        <span>管理员：<input type="text" v-model='uvalue'></span>
        <span>密码：<input type="password" v-model='pvalue'></span>
      </div>
      <div class="buttons">
        <button @click='loginClick'>登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    beforeCreate() {
        localStorage.setItem("adminName","wcw")
        localStorage.setItem("adminPwd",123456)
    },
    data() {
        return {
            uvalue:'',
            pvalue:''
        }
    },
    methods: {
        loginClick(){
            let aval = localStorage.getItem("adminName")
            let pval = localStorage.getItem("adminPwd")
            if(!this.uvalue || !this.pvalue){
                alert('管理员或密码不存在')
            }else if(aval == this.uvalue && pval == this.pvalue){
                this.$router.push('/adminabout')
            }else{
                this.uvalue = ''
                this.pvalue = ''
                alert('管理员或者密码输入错误')
            }
        }
    },
    
}
</script>

<style lang="less" scoped>
.admin{
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