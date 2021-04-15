<template>
          <el-row class="tac">
            <el-col :span="12">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
              >
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>个人信息管理</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/msg/self">
                      <el-menu-item index="1-1">本人</el-menu-item>
                    </router-link>
                    <router-link to='/msg/father'>
                     <el-menu-item index="1-2">父亲</el-menu-item>
                    </router-link>
                    <router-link to="/msg/mother">
                      <el-menu-item index="1-3">母亲</el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>收支投资信息管理</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/about/income">
                      <el-menu-item index="2-1">收入信息管理</el-menu-item>
                    </router-link>
                    <router-link to="/about/expend">
                      <el-menu-item index="2-2">支出信息管理</el-menu-item>
                    </router-link>
                    <router-link to="/about/investment">
                      <el-menu-item index="2-3">投资信息管理</el-menu-item>
                    </router-link>
                    <router-link to="/about/recommend">
                      <el-menu-item index="2-4">投资推荐信息管理</el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>收支统计</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/statis/sincome">
                      <el-menu-item index="3-1">收入的统计</el-menu-item>
                    </router-link>
                    <router-link to="/statis/sexpend">
                      <el-menu-item index="3-2">支出的统计</el-menu-item>
                    </router-link>
                    <router-link to="/statis/sliab">
                      <el-menu-item index="3-3">负债与否</el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>基金行情</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/jmarket/jrecommend">
                      <el-menu-item index="4-1">基金推荐</el-menu-item>
                    </router-link>
                    <router-link to="/jmarket/jmovement">
                      <el-menu-item index="4-2">基金走势表</el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>投资理念</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/concept">
                      <el-menu-item index="5-1">投资理念</el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
</template>

<script>
export default {
    methods: {
        handleOpen(key, keyPath) {},
        handleClose(key, keyPath) {},
    },
}
</script>

<style lang="less" scoped>
.aside {
    height: calc(100vh - 60px);
    background: #fff;
    .el-col-12 {
      width:100%;
    }
  }
</style>