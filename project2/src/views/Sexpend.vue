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
              <el-table :data="incomedata" style="width: 100%">
              <el-table-column prop="income" label="总支出" width="180">
              </el-table-column>
              <el-table-column prop="salary" label="dnf充值" width="180">
              </el-table-column>
              <el-table-column prop="program" label="lol充值"> </el-table-column>
              <el-table-column prop="bonus" label="旅游">
              </el-table-column>
              <el-table-column prop="investment" label="看病">
              </el-table-column>
            </el-table>
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
import ajax from "../lib/ajax";
import Aside from '../components/Aside'
import Header from '../components/Header'
import Footer from '../components/Footer'
import drawCircle from '../lib/drawCircle';
export default {
  mounted() {
    this.getListPage()
  },
  components:{
    Aside,Header,Footer
  },
  data() {
    return {
      incomedata:[
        {income:'',salary:'',program:'',bonus:'',investment:''}
      ],
      data_arr:[0.2,0.2,0.2,0.4],
      color_arr:['#409EFF','#67C23A','#F56C6C',"#E6A23C"],
      text_arr:['dnf充值','lol充值','旅游','看病'],
    }
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
          let arr = []
          let array = []
          for(let i in res){
            array.push(Number(res[i].incomenum))
            arr.push(res[i].kinds)
          }
          this.incomedata[0].income = eval(array.join("+"))+'元'
          let sum = eval(array.join("+"))
          //找到所有的salay的数据进行求和
          let arr1 =this.findall(arr,'dnf充值')
          let arr2 = []
          for(let i in arr1){
            arr2.push(Number(res[arr1[i]].incomenum))
          }
          this.incomedata[0].salary = eval(arr2.join("+"))+'元'
          this.data_arr[0] = eval(arr2.join("+"))/sum

          //找到所有的年终奖的数据进行求和
          let bonus =this.findall(arr,'旅游')
          let bonus1 = []
          for(let i in bonus){
            bonus1.push(Number(res[bonus[i]].incomenum))
          }
          this.incomedata[0].bonus = eval(bonus1.join("+"))+'元'
          this.data_arr[2] = eval(bonus1.join("+"))/sum

          //找到所有的项目奖金的数据进行求和
          let program =this.findall(arr,'lol充值')
          let program1 = []
          for(let i in program){
            program1.push(Number(res[program[i]].incomenum))
          }
          this.incomedata[0].program = eval(program1.join("+"))+'元'
          this.data_arr[1] = eval(program1.join("+"))/sum

          //找到所有的投资收入的数据进行求和
          let investment =this.findall(arr,'看病')
          let investment1 = []
          for(let i in investment){
            investment1.push(Number(res[investment[i]].incomenum))
          }
          this.incomedata[0].investment = eval(investment1.join("+"))+'元'
          this.data_arr[3] = eval(investment1.join("+"))/sum
          drawCircle('canvas_circle',this.data_arr, this.color_arr, this.text_arr)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    findall(a,x){
      var results=[],
          len=a.length,
          pos=0;
      while(pos<len){
          pos=a.indexOf(x,pos);
          if(pos===-1){//未找到就退出循环完成搜索
          break;
          }
          results.push(pos);//找到就存储索引
          pos+=1;//并从下个位置开始搜索
      }
      return results;
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
    .main{
      .piechart{
        display: flex;
        width: 100%;
        justify-content: center;
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