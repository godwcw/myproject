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
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="age" label="年龄" width="180"></el-table-column>
                <el-table-column prop='married' label="婚姻状况"></el-table-column>
                <el-table-column prop="dates" label="工作时间"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="evaluation" label="自我评价"></el-table-column>
            </el-table>
          </el-main>
          <el-footer class="footer"></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import ajax from '../lib/ajax'
export default {
    
    mounted() {
        this.getListPage()
    },
  data() {
    return {
        tableData:[]
    };
  },
  methods: {
      getListPage() {
      ajax({
        method: "post",
        url: `http://127.0.0.1:7000/tt`,
        data: {
          act: "sfindall",
        },
      }).then((res) => {
          if(res[0].married === 1){
              res[0].married = '已婚'
          }else{
              res[0].married = '未婚'
          }
            let d = new Date(res[0].dates)
            d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            res[0].dates = d 
            console.log(res)
            this.tableData = [...res];
        })
        .catch((err) => {
          console.log(err);
        });
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