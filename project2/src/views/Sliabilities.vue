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
            <el-table :data="liadata" style="width: 100%">
              <el-table-column prop="num" label="收支水平" width="180">
              </el-table-column>
              <el-table-column prop="income" label="总收入" width="180">
              </el-table-column>
              <el-table-column prop="expend" label="总支出"> </el-table-column>
              <el-table-column prop="investment" label="投资金额">
              </el-table-column>
            </el-table>
            <el-alert
              v-show='showtag1'
              v-cloak
              title="干的漂亮，成功的存下了一笔钱"
              type="success"
              description="恢弘志士之气,不宜妄自菲薄。再接再厉冲冲冲！！！"
              show-icon
            >
            </el-alert>
            <el-alert
              v-show='showtag2'
              v-cloak
              title="哥你欠债了或者没赚钱~，注意自己的收支水平！！！"
              type="error"
              description="天生我才必有用，千金散尽还复来"
              show-icon
            >
            </el-alert>
            <div class="block" v-show='showtag1'>
              <span class="demonstration">买买买，把想要的都给我冲了</span>
              <img :src="src1" alt="">
            </div>
            <div class="block" v-show='showtag2'>
              <span class="demonstration">把欠债补上就算成功!!!</span>
              <img :src="src2" alt="">
            </div>
            <div class="piechart">
              <canvas class="animate__animated animate__bounceInLeft" id='canvas_circle'>

              </canvas>
            </div>
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
import drawCircle from "../lib/drawCircle";
import ajax from "../lib/ajax";
import Aside from "../components/Aside";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default {
  mounted() {
    this.getincomedata();
    this.getexpenddata();
    this.getdata();
    try {
      setTimeout(() => {
      let incomenum =Number(this.liadata[0].income.replace(/\D/g,''))
      let expend =Number(this.liadata[0].expend.replace(/\D/g,''))
      let investment =Number(this.liadata[0].investment.replace(/\D/g,''))
      let sum = incomenum + expend +investment
      this.data_arr[0] = incomenum/sum
      this.data_arr[1] = expend/sum
      this.data_arr[2] = investment/sum
      console.log(this.data_arr)
      drawCircle("canvas_circle", this.data_arr, this.color_arr, this.text_arr);
      console.log(sum)
      let num  = incomenum - (expend + investment)
      this.liadata[0].num = num + '元'
      if(num>0){
        this.showtag1 = true
        this.showtag2 = false
      }else{
        this.showtag1 = false
        this.showtag2 = true
      }
    }, 50);
    } catch (error) {
      console.log(error)
    }
  },
  components: {
    Aside,
    Header,
    Footer,
  },
  data() {
    return {
      src1:require('../assets/happy.jpg'),
      src2:require('../assets/tired.jpg'),
      liadata: [{ num:'',income: "", expend: "", investment: "" }],
      data_arr:["","",""],
      color_arr:['#409EFF','#67C23A','#F56C6C'],
      text_arr:['收入占比','支出占比','投资占比'],
      showtag1: true,
      showtag2: false,
    };
  },
  methods: {
    getincomedata() {
      ajax({
        method: "post",
        url: `http://127.0.0.1:7000/tt`,
        data: {
          act: "findIncomenum",
        },
      })
        .then((res) => {
          let arr = [...res];
          let arr1 = [];
          for (const i in arr) {
            arr1.push(Number(arr[i].incomenum));
          }
          this.liadata[0].income = eval(arr1.join("+")) + "元";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getexpenddata() {
      ajax({
        method: "post",
        url: `http://127.0.0.1:7000/tt`,
        data: {
          act: "efindIncomenum",
        },
      })
        .then((res) => {
          let arr = [...res];
          let arr1 = [];
          for (const i in arr) {
            arr1.push(Number(arr[i].incomenum));
          }
          this.liadata[0].expend = eval(arr1.join("+")) + "元";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getdata() {
      ajax({
        method: "post",
        url: `http://127.0.0.1:7000/tt`,
        data: {
          act: "ifindIncomenum",
        },
      })
        .then((res) => {
          let arr = [...res];
          let arr1 = [];
          for (const i in arr) {
            arr1.push(Number(arr[i].incomenum));
          }
          this.liadata[0].investment = eval(arr1.join("+")) + "元";
        })
        .catch((err) => {
          console.log(err);
        });
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
    .main{
      .block{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center; 
        span{
          display: block;
          width: 100%;
          height: 40px;
          line-height: 30px;
          font-weight: bold;
        }
        img{
          width: 250px;
          height: 200px;
        }
      }
      .piechart{
        display: flex;
        width: 100%;
        justify-content: center;
      }
    }
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>