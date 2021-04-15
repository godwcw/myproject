<template>
  <div class="about">
    <router-view></router-view>
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
      isCollapse: true,
      tableData: [],
      search: "",
      dialogFormVisible: false,
      Visible:false,
      form: {
        dates: "",
        num: "",
        kinds: "",
        tip: "",
        cdates: "",
        cnum: "",
        ckinds: "",
        ctip: "",
        cid:'',
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
          act: "findall",
        },
      })
        .then((res) => {
          this.tableData = [...res];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    handleEdit(...args) {
      this.Visible = !this.Visible
      this.cid = args[1].id
      console.log(this.cdates,this.cnum,this.ctip,this.ckinds,this.cid)
    },
    handleDelete(...args) {
      let id = args[1].id;
      ajax({
        method: "post",
        url: `http://127.0.0.1:7000/tt`,
        data: {
          act: "del",
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
    changecClick(){
      this.Visible = false;
      this.form.cnum = "";
      this.form.cdates = "";
      this.form.ckinds = "";
      this.form.ctip = "";
    },
    changeClick(){
      this.Visible = false;
      if (this.form.cnum && this.form.cdates && this.form.ckinds) {
        ajax({
          method: "post",
          url: `http://127.0.0.1:7000/tt`,
          data: {
            act: "update",
            id:this.cid,
            incomenum: this.form.cnum,
            dates: this.form.cdates,
            kinds: this.form.ckinds,
            tip: this.form.ctip,
            enable:"true"
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
            act: "add",
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
    unlogin(){
      this.$router.push('/home')
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
    span{
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
    .tips{
      display: flex;
      justify-content: center;
      align-items: center;
      color: #409EFF;
      font-size: 20px;
    }
  }
}
</style>
