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
            <el-button type="text" @click="dialogFormVisible = true"
              >添加信息</el-button
            >
            <el-dialog title="添加信息" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="时间" :label-width="formLabelWidth">
                  <el-input v-model="form.dates" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收入或支出" :label-width="formLabelWidth">
                  <el-input v-model="form.num" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth">
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
              :data="
                tableData.filter(
                  (data) =>
                    !search ||
                    data.kinds.toLowerCase().includes(search.toLowerCase())
                )
              "
              :default-sort = "{prop: 'dates', order: 'descending'}"
              style="width: 100%"
            >
              <el-table-column label="时间" prop="dates" sortable> </el-table-column>
              <el-table-column label="支出资金" prop="incomenum"> </el-table-column>
              <el-table-column label="类型" prop="kinds"> </el-table-column>
              <el-table-column label="提示" prop="tip"> </el-table-column>
              <el-table-column align="right">
                <template slot="header" slot-scope="">
                  <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入关键字搜索"
                  />
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
                        label="收入或支出"
                        :label-width="formLabelWidth"
                      >
                        <el-input
                          v-model="form.cnum"
                          autocomplete="off"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="类型" :label-width="formLabelWidth">
                        <el-input
                          v-model="form.ckinds"
                          autocomplete="off"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="提示" :label-width="formLabelWidth">
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
  mounted() {
    this.getListPage();
  },
  components:{
    Aside,Header,Footer
  },
  data() {
    return {
      addtag: false,
      tableData: [],
      search: "",
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
          act: "efindall",
        },
      })
        .then((res) => {
          this.tableData = [...res];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleEdit(...args) {
      this.Visible = !this.Visible;
      this.cid = args[1].id;
    },
    handleDelete(...args) {
      let id = args[1].id;
      ajax({
        method: "post",
        url: `http://127.0.0.1:7000/tt`,
        data: {
          act: "edel",
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
            act: "eupdate",
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
            act: "eadd",
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
  .footer{
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
