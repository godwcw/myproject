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
            <el-form ref="form" v-show="form.showtag" :model="form" label-width="80px">
              <el-form-item label="姓名">
                <el-input v-model="form.name" style="width: 30%"></el-input>
              </el-form-item>
              <el-form-item label="年龄">
                <el-input v-model="form.region" style="width: 30%"></el-input>
              </el-form-item>
              <el-form-item label="工作时间">
                <el-col :span="5">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.date1"
                    style="width: 100%"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="婚姻状况">
                <el-switch v-model="form.delivery"></el-switch>
              </el-form-item>
              <el-form-item label="工作性质">
                <el-input v-model="form.type" style="width: 50%"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="form.resource" @change="f1Change">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="自我评价">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit"
                  >保存个人信息</el-button
                >
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
            <el-form ref="form1" v-show="form1.showtag" :model="form1" label-width="80px">
              <el-form-item label="姓名">
                <el-input v-model="form1.name" style="width: 30%"></el-input>
              </el-form-item>
              <el-form-item label="年龄">
                <el-input v-model="form1.region" style="width: 30%"></el-input>
              </el-form-item>
              <el-form-item label="工作时间">
                <el-col :span="5">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form1.date1"
                    style="width: 100%"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="婚姻状况">
                <el-switch v-model="form1.delivery"></el-switch>
              </el-form-item>
              <el-form-item label="工作性质">
                <el-input v-model="form1.type" style="width: 50%"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="form1.resource" @change="f2Change">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="自我评价">
                <el-input type="textarea" v-model="form1.desc"></el-input>
              </el-form-item>
              <el-button type="primary" @click="dialogFormVisible = true">修改信息</el-button>

              <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                          <el-form-item label="姓名">
                            <el-input v-model="form2.name" style="width: 30%"></el-input>
                          </el-form-item>
                          <el-form-item label="年龄">
                            <el-input v-model="form2.region" style="width: 30%"></el-input>
                          </el-form-item>
                          <el-form-item label="工作时间">
                            <el-col :span="5">
                              <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form2.date1"
                                style="width: 100%"
                              ></el-date-picker>
                            </el-col>
                          </el-form-item>
                          <el-form-item label="婚姻状况">
                            <el-switch v-model="form2.delivery"></el-switch>
                          </el-form-item>
                          <el-form-item label="工作性质">
                            <el-input v-model="form2.type" style="width: 50%"></el-input>
                          </el-form-item>
                          <el-form-item label="性别">
                            <el-radio-group v-model="form2.resource" @change="f1Change">
                              <el-radio label="男">男</el-radio>
                              <el-radio label="女">女</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="自我评价">
                            <el-input type="textarea" v-model="form2.desc"></el-input>
                          </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="changeClick">确定修改</el-button>
                </div>
              </el-dialog>
            </el-form>
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
import Aside from "../components/Aside";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default {
  created() {
    this.getListPage();
  },
  components: {
    Aside,
    Header,
    Footer,
  },
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      ids:'',
      form: {
        name: "",
        region: "",
        date1: "",
        delivery: false,
        type: "",
        resource: "",
        desc: "",
        showtag: true,
      },
      form1: {
        name: "",
        region: "",
        date1: "",
        delivery: false,
        type: "",
        resource: "",
        desc: "",
        showtag: false,
      },
      form2: {
        name: "",
        region: "",
        date1: "",
        delivery: false,
        type: "",
        resource: "",
        desc: "",
      },
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
      })
        .then((res) => {
          console.log(res);
          if (res.length) {
            this.ids = res[0].id
            this.form.showtag = false;
            this.form1.showtag = true;
            this.form1.name = res[0].name;
            this.form1.region = res[0].age;
            this.form1.date1 = res[0].dates;
            this.form1.delivery = res[0].married == 1 ? true : false;
            this.form1.type = res[0].work;
            this.form1.resource = res[0].sex;
            this.form1.desc = res[0].evaluation;
            this.form2.name = res[0].name;
            this.form2.region = res[0].age;
            this.form2.date1 = res[0].dates;
            this.form2.delivery = res[0].married == 1 ? true : false;
            this.form2.type = res[0].work;
            this.form2.resource = res[0].sex;
            this.form2.desc = res[0].evaluation;
          } else {
            this.form.showtag = true;
            this.form1.showtag = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSubmit() {
      console.log("submit!");
      ajax({
        method: "post",
        url: `http://127.0.0.1:7000/tt`,
        data: {
          act: "sadd",
          name: this.form.name,
          age: this.form.region,
          married: this.form.delivery,
          dates: this.form.date1,
          work: this.form.type,
          sex: this.form.resource,
          evaluation: this.form.desc,
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
    },
    changeClick(){
      this.dialogFormVisible = false
      ajax({
          method: "post",
          url: `http://127.0.0.1:7000/tt`,
          data: {
            act: "supdate",
            id: this.ids,
            name:this.form2.name,
            age:this.form2.region,
            dates:this.form2.date1,
            married:this.form2.delivery,
            work:this.form2.type,
            sex:this.form2.resource,
            evaluation:this.form2.desc,
            enable: 1,
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
    },
    f1Change(...args) {
      console.log(args[0], this.form.resource);
    },
    f2Change(...args) {
      console.log(args[0], this.form.resource);
    },
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
      width: 100%;
    }
  }
  .content {
    height: calc(100vh - 60px);
    background: #f9f9f9;
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>