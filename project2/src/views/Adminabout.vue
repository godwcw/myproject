<template>
  <div class="adminabout">
    <el-container>
      <el-header class="header">
        <h2>管理员界面</h2>
        <span @click="unlogin">退出系统</span>
      </el-header>
      <el-container>
        <el-aside class="aside" width="200px"> 
          <router-link class="tips" to="/adminabout">管理员修改密码</router-link>
          <router-link class="tips" to="/adminmsg">管理员查看用户信息</router-link>
        </el-aside>
        <el-container class="content">
          <el-main class="main">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="原密码" prop="pass">
                <el-input
                  type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="修改密码" prop="checkPass">
                <el-input
                  type="password"
                  v-model="ruleForm.checkPass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="用户名" prop="checkName">
                <el-input v-model.number="ruleForm.checkName"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >提交修改</el-button
                >
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-main>
          <el-footer class="footer"></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    let uval = localStorage.getItem("userName")
    let pval = localStorage.getItem("userPwd")
      var validatePass = (rule, value, callback) => {
        
        if (value === '') {
          callback(new Error('请输入原密码'));
        }
        else {
          if (pval == value) {
            this.$refs.ruleForm.validateField('checkPass');
            callback();
          }
          callback(new Error('原密码与之前不一致'))
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if(value.length < 6){
          callback(new Error('密码长度应该大于6'))
        }else{
          callback();
        }
      };
      var checkName = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('请再次输入用户名'));
        } else if (value !== uval) {
          callback(new Error('与原用户名不一致!'));
          
        } else {
         callback();
          
        }
      };
    return {
        ruleForm: {
          pass: '',
          checkPass: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          checkName: [
            { validator: checkName, trigger: 'blur' }
          ]
        }
    };
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            localStorage.setItem("userPwd",this.ruleForm.checkPass)
            alert('修改成功');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      unlogin(){
        this.$router.push('/')
      },
  },
};
</script>

<style lang="less" scoped>
.adminabout {
  .header {
    background: #000;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      position: absolute;
      right: 12px;
      text-decoration: underline;
      color: #fff;
      cursor: pointer;
    }
  }
  .aside {
    height: calc(100vh - 60px);
    background:#f9f9f9;
    .tips{
      display: flex;
      width: 100%;
      height: 50px;
      line-height: 50px;
      justify-content: center;
      cursor: pointer;
      &:hover{
        opacity: .7;
      }
    }
  }
  .content {
    height: calc(100vh - 60px);
    background: #fff;
  }
}
</style>