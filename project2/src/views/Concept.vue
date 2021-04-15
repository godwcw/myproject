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
              <el-carousel class="pic animate__animated animate__heartBeat" :interval="3500" arrow="always">
                <el-carousel-item v-for="item in list" :key="item">
                <img :src='item' alt="">
                </el-carousel-item>
            </el-carousel>
            <h2>理念当然是友情！ 努力！ 胜利！(以后记得删除) </h2>
            <el-button class="toolbtn" @click="drawer = true" type="primary" style="margin-left: 16px;">
                点我查看真正的投资理念
            </el-button>
            <el-drawer class="share" title="巴菲特的投资理念分享" :visible.sync="drawer" :with-header="true">
                <ul>
                    <li v-for="item,i in list1" :key ='i'>{{item}}</li>
                </ul>
            </el-drawer>
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
  data() {
      return {
          list:[
              require('../assets/yq.jpg'),require('../assets/nl.jpg'),require('../assets/sl.jpg')
          ],
          list1:['1、找到杰出的公司','2、少就是多','3、把大赌注压在高概率事件上','4、要有耐心','5、不要担心短期价格波动','6、稳中求胜',
          '7、简单、传统、容易','8、永远不许失败','9、“一鸟在手胜过百鸟在林”','10、不迷信华尔街，不听信谣言'
          ],
          drawer: false,
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
        .pic{
            width: 50%;
            margin: 0 auto;
        }
        img{
            width: 100%;
            height: 100%;
        }
        h2{
            margin-top: 20px;
            text-align: center;
        }
        .share{
            ul{
                li{
                    font-size: 18px;
                    font-weight: blod;
                    margin: 15px 0;
                    padding: 0 10px;
                }
            }
        }
        .el-carousel__item h3 {
            color: #475669;
            font-size: 18px;
            opacity: 0.75;
            line-height: 300px;
            margin: 0;
        }
  
        .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
        }
  
        .el-carousel__item:nth-child(2n+1) {
            background-color: #d3dce6;
        }
        .el-button{
            margin: 40px 0 0 550px !important;
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