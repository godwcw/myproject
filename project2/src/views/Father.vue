<template>
  <div class="about">
    <el-container>
      <el-header class="header">
        <Header />
      </el-header>
      <el-container>
        <el-aside class="aside" width="200px">
          <Aside />
        </el-aside>
        <el-container class="content">
          <el-main class="main">
              <h2>鉴于是个人财务信息系统，该功能暂停开放……</h2>
          </el-main>
          <el-footer class="footer">
            <Footer />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ajax from "../lib/ajax";
import Aside from '../components/Aside'
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
  components:{
    Aside,Header,Footer
  },
};
</script>


<style lang="less" scoped>
.about {
  .header {
    position: relative;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .aside {
    height: calc(100vh - 60px);
    background: #fff;
    .el-col-12 {
      width:100%;
    }
  }
  .content {
    height: calc(100vh - 60px);
    background: #f9f9f9;
  }
  .footer{
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>