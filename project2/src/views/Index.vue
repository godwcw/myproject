<template>
  <div class="home">
    <div class="login">
        <h2>个人财务管理系统</h2>
      <div class="buttons">
        <button @click='adminLogin'>管理员登录</button>
        <button @click="login">用户登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        adminLogin(){
            this.$router.push('/admin')
        },
        login(){
            this.$router.push('/home')
        }
    },
}
</script>

<style lang="less" scoped>
.home{
  .login{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 400px;
    height:200px;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    border: 1px solid #bdbdbd8a;
    margin-top: calc(50vh - 178px) ;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    h2{
        position: absolute;
        top: 10px;
    }
    .buttons{
      display: flex;
      justify-content: center;
      width: 100%;
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
            margin: 10px 40px;
            &:hover{
              background: #40a0ff42;
              color: #40a0ff;
            }
      }
      
    }
  }
}
</style>


