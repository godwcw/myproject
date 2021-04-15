import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userMsg:{
      userName:'',
      userPwd:''
    },
    tag:false
  },
  mutations: {
    setuserMsg(state,arg){
      state.userMsg.userName = arg.userMsg[0]
      state.userMsg.userPwd = arg.userMsg[1]
    },
    setTag(state,arg){
      state.tag = arg.tag
    }
  },
  actions: {
  },
  modules: {
  }
})
