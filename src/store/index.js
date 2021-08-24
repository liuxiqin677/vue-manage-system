import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import {constRoutes,aysncRoutes} from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{
      username:'',
      password:'',
      role:'',
      token:0,
      address:'',
      phone:'',
      newRouter:[],
      _id:''
    },
    goodsList:[],
    userList:[]
  },
  mutations: {
    setUserInfo(state,userInfo){
      state.userInfo.username = userInfo.username
      state.userInfo.password = userInfo.password
      state.userInfo.role = userInfo.role
      state.userInfo.address = userInfo.address
      state.userInfo.phone = userInfo.phone
      state.userInfo.newRouter = []
      state.userInfo.token = 1
      state.userInfo._id = userInfo._id
    },
    removeUserInfo(state){
      state.userInfo = {}
    },
    genereateRoutes(state,role){
      aysncRoutes.forEach(item => {
        if(item.meta.roles.includes(role)){
          //把path路径的'/'去掉
          // item.path = item.path.slice(1)
          state.userInfo.newRouter.push(item)
          router.addRoute('layout',item)
        }
      })
      console.log(router)
      // router.options.routes[4].children.push(...state.userInfo.newRouter)
    },
    getUserInfo(state){
      return state.userInfo
    },
    setGoodsInfo(state,goodsInfo){
      state.goodsList = goodsInfo
    },
    addGoodsInfo(state,newGoods){
      state.goodsList.push(newGoods)
    },
    setUserList(state,userList){
      state.userList = userList
    },
    addUserInfo(state,newUser){
      state.userList.push(newUser)
    }
  },
  actions: {
    setUserInfo({commit},userInfo){
      commit('setUserInfo',userInfo)
    },
    removeUserInfo({commit}){
      commit('removeUserInfo')
    },
    genereateRoutes({commit},role){
      commit('genereateRoutes',role)
    },
    getUserInfo({commit}){
      commit('getUserInfo')
    },
    setGoodsInfo({commit},goodsInfo){
      commit('setGoodsInfo',goodsInfo)
    },
    addGoodsInfo({commit},newGoods){
      commit('addGoodsInfo',newGoods)
    },
    setUserList({commit},userList){
      commit('setUserList',userList)
    },
    addUserInfo({commit},newUser){
      commit('addUserInfo',newUser)
    }
  },

})
