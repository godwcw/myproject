<template>
  <div class="about">
    <el-container>
      <el-header class="header">
        <h2>个人财务信息管理系统</h2>
        <span @click="unlogin">退出系统</span>
      </el-header>
      <el-container>
        <el-aside class="aside" width="200px">
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
        </el-aside>
        <el-container class="content">
          <el-main class="main">
            <el-button type="text" @click="dialogFormVisible = true"
              >添加信息</el-button
            >
            <el-dialog title="添加信息" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="时间" :label-width="formLabelWidth">
                  <el-input v-model="form.dates" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth">
                  <el-input v-model="form.num" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="幅度" :label-width="formLabelWidth">
                  <el-input v-model="form.kinds" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="小提示" :label-width="formLabelWidth">
                  <el-input v-model="form.tip" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancelClick">取 消</el-button>
                <el-button type="primary" @click="addClick">确定添加</el-button>
              </div>
            </el-dialog>
            <el-table
              :data="tableData.filter(data => !search || data.incomenum.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%"
              :default-sort = "{prop: 'dates', order: 'descending'}"
            >
              <el-table-column label="时间" prop="dates" sortable> </el-table-column>
              <el-table-column label="类型" prop="incomenum"> </el-table-column>
              <el-table-column label="增降幅度" prop="kinds"> </el-table-column>
              <el-table-column label="提示" prop="tip"> </el-table-column>
              <el-table-column align="right">
                <template slot="header" slot-scope="">
                  <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    >Edit</el-button
                  >
                  <el-dialog
                    class="changebtn"
                    label-position="left"
                    title=""
                    :visible.sync="Visible"
                  >
                    <el-form label-position="right" :model="form">
                      <el-form-item label="时间" :label-width="formLabelWidth">
                        <el-input
                          v-model="form.cdates"
                          autocomplete="off"
                        ></el-input>
                      </el-form-item>
                      <el-form-item
                        label="类型"
                        :label-width="formLabelWidth"
                      >
                        <el-input
                          v-model="form.cnum"
                          autocomplete="off"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="幅度" :label-width="formLabelWidth">
                        <el-input
                          v-model="form.ckinds"
                          autocomplete="off"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="小提示" :label-width="formLabelWidth">
                        <el-input
                          v-model="form.ctip"
                          autocomplete="off"
                        ></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="changecClick">取 消</el-button>
                      <el-button type="primary" @click="changeClick"
                        >确定更改</el-button
                      >
                    </div>
                  </el-dialog>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >Delete</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            
          </el-main>
          <el-footer class="footer">
            <div class="tips">温馨提示：打工不易，明天又是充满希望得一天!</div>
            
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ajax from "../lib/ajax";
export default {
  mounted() {
    this.getListPage();
  },
  data() {
    return {
      addtag: false,
      tableData: [],
      search:"",
      dialogFormVisible: false,
      Visible: false,
      form: {
        dates: "",
        num: "",
        kinds: "",
        tip: "",
        cdates: "",
        cnum: "",
        ckinds: "",
        ctip: "",
        cid: "",
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },

  methods: {
    getListPage() {
      ajax({
        method: "post",
        url: `http://127.0.0.1:7000/tt`,
        data: {
          act: "rfindall",
        },
      })
        .then((res) => {
          this.tableData = [...res];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    handleEdit(...args) {
      this.Visible = !this.Visible;
      this.cid = args[1].id;
      console.log(this.cdates, this.cnum, this.ctip, this.ckinds, this.cid);
    },
    handleDelete(...args) {
      let id = args[1].id;
      ajax({
        method: "post",
        url: `http://127.0.0.1:7000/tt`,
        data: {
          act: "rdel",
          id: `${id}`,
        },
      })
        .then((res) => {
          console.log(res);
          this.getListPage();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changecClick() {
      this.Visible = false;
      this.form.cnum = "";
      this.form.cdates = "";
      this.form.ckinds = "";
      this.form.ctip = "";
    },
    changeClick() {
      this.Visible = false;
      if (this.form.cnum && this.form.cdates && this.form.ckinds) {
        ajax({
          method: "post",
          url: `http://127.0.0.1:7000/tt`,
          data: {
            act: "rupdate",
            id: this.cid,
            incomenum: this.form.cnum,
            dates: this.form.cdates,
            kinds: this.form.ckinds,
            tip: this.form.ctip,
            enable: "true",
          },
        })
          .then((res) => {
            if (res.state === "success") {
              this.getListPage();
            }
          })
          .catch((err) => {
            console.log(err);
          });
        this.form.cnum = "";
        this.form.cdates = "";
        this.form.ckinds = "";
        this.form.ctip = "";
      } else {
        alert("前三空需填写内容");
      }
    },
    cancelClick() {
      this.dialogFormVisible = false;
      this.form.num = "";
      this.form.dates = "";
      this.form.kinds = "";
      this.form.tip = "";
    },
    addClick() {
      this.dialogFormVisible = false;
      if (this.form.num && this.form.dates && this.form.kinds) {
        ajax({
          method: "post",
          url: `http://127.0.0.1:7000/tt`,
          data: {
            act: "radd",
            incomenum: this.form.num,
            dates: this.form.dates,
            kinds: this.form.kinds,
            tip: this.form.tip,
          },
        })
          .then((res) => {
            if (res.stats === "success") {
              this.getListPage();
            }
          })
          .catch((err) => {
            console.log(err);
          });
        this.form.num = "";
        this.form.dates = "";
        this.form.kinds = "";
        this.form.tip = "";
      } else {
        alert("前三空需填写内容");
      }
    },
    unlogin() {
      this.$router.push("/home");
    },
    formatter(row, column) {
        return row.address;
      }
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
    h2 {
      color: #fff;
    }
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
    background: #fff;
    .el-col-12 {
      width:100%;
    }
  }
  .content {
    height: calc(100vh - 60px);
    background: #f9f9f9;
    .main {
      .add {
        margin-bottom: 10px;
      }
    }
  }
  .footer {
    .tips {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #409eff;
      font-size: 20px;
    }
  }
}
</style>
