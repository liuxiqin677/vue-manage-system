import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Layout from '../views/Layout.vue'
import ErrPage from '../views/404.vue'
import userCenter from '../views/user/userCenter.vue'

Vue.use(VueRouter)

//静态路由，登录，注册，首页都可以看到
export const constRoutes = [
  {
    path:'/',
    redirect: "/layout",
    component:Layout
  },
  {
    path:'/login',
    name:'登录',
    component:Login
  },
  {
    path:"/register",
    name:'注册',
    component:Register
  },
  {
    path:'/404',
    name:'404页面',
    component:ErrPage,
  },
  {
    path:"/layout",
    name:'layout',
    component:Layout,
    children:[],
  },
]

export const aysncRoutes = [
      {
        logo:'goods',
        path: '/layout/goodsList',
        name: '商品列表',
        meta: {
          icon: 'el-icon-s-goods',
          roles: ['admin','normal']
        },
        component: ()=>import("@/views/goods/goodsList.vue"),
      },
      {
        logo:'goods',
        path:'/layout/goodSearch',
        name:'商品查询',
        meta:{
          icon: 'el-icon-s-order',
          roles:['admin','normal']
        },
        component: ()=>import("@/views/goods/goodSearch.vue"),
      },
      {
        logo:'users',
        path: '/layout/userList',
        name: '用户列表',
        meta: {
          icon: 'el-icon-s-custom',
          roles: ['admin','normal']
        },
        component: ()=>import("@/views/user/userList.vue")
      },
      {
        logo:'users',
        path: '/layout/userEdit',
        name: '用户查询',
        meta: {
          icon: 'el-icon-s-custom',
          roles: ['admin','normal']
        },
        component: ()=>import("@/views/user/userSearch.vue")
      },
      // {
      //   logo:'department',
      //   path:'/layout/departmentList',
      //   name:'权限管理',
      //   meta:{
      //     icon:'el-icon-s-management',
      //     roles:['admin']
      //   },
      //   component: ()=>import("@/views/department/departmentList.vue")
      // },
      {
        logo:'department',
        path:'/layout/departmentEdit',
        name:'公司财政',
        meta:{
          icon:'el-icon-s-marketing',
          roles:['admin']
        },
        component: ()=>import("@/views/department/dpEdit.vue")
      },
      {
        logo:'center',
        path:'/layout/center',
        name:'个人中心',
        meta:{
          icon:'el-icon-edit',
          roles:['admin','normal']
        },
        component: ()=>import("@/views/user/userCenter.vue")
      },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:constRoutes
})

// router.beforeEach((to, from, next) => {
//   //如果访问登录页 直接放行
//   if(to.path === '/login') return next()
  
//   if(!localStorage.getItem("userInfo")){
//     //token不存在，跳转到登录页
//     return next('/login')
//   }

//   //如果存在token，放行
//   next()
// })
export default router
