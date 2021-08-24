<template>
  <div>
    <el-container style="height: 100vh; border: 1px solid #eee">
      <!-- 侧边栏 -->
      <el-aside width="200px" style="background-color:#545c64">
        <el-menu
          router
          default-active="2"
          background-color="#545c64"
           text-color="#fff"
            active-text-color="#ffd04b"
          class="el-menu-vertical-demo"
          :default-openeds="['1']"
          @open="handleOpen"
          @close="handleClose">
          <!-- <el-submenu index="1"> -->
              <!-- <template slot="title"><i class="el-icon-s-order"></i><span>商品管理</span></template> -->
               <el-menu-item :index="item.path" v-for="(item,index) in routes" :key="index" style="text-align:center"><i :class="item.meta.icon"></i>{{item.name}}</el-menu-item>
              <!-- <el-menu-item-group  v-for="(item,index) in routes" :key="index">
                <el-menu-item :index="item.path" v-if="item.logo == 'goods'" ><i :class="item.meta.icon"></i>{{item.name}}</el-menu-item>
              </el-menu-item-group> -->
          <!-- </el-submenu> -->
        </el-menu>
      </el-aside>

      
      <el-container>

        <!-- 头部 -->
        <el-header style="text-align: right; font-size: 15px">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              更多操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="center">个人中心</el-dropdown-item>
              <el-dropdown-item command="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span> 欢迎您：{{username}}</span>
    </el-header>
    
        <!-- 主体内容 -->
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
    // name:'layout',
   methods: {
      handleCommand(command) {
        if(command === 'exit'){
          this.username = ''
          this.$store.dispatch('removeUserInfo')
          this.$router.options.routes[4].children = []

          localStorage.removeItem("userInfo")

          this.$router.push('/login')
        }
        if(command == 'center'){
          this.$router.push('/layout/center')
        }
      },
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      }
    },

    data(){
      return{
        username:'undefined',
        routes:[]
      }
    },
    created(){
      if (localStorage.getItem("userInfo") ) {
        this.$store.replaceState(Object.assign({},this.$store.state.userInfo, JSON.parse(localStorage.getItem("userInfo"))))
      }
 
      window.addEventListener("beforeunload",()=>{
        localStorage.setItem("userInfo",JSON.stringify(this.$store.state))
      })
      //state.userInfo 是 undefined 而 state就直接打印了userInfo里面的数据 奇怪
      // console.log(this.$store.state)
      this.routes = this.$store.state.newRouter
      this.username = this.$store.state.username
      // console.log(this.routes)
      if(this.$router.options.routes[4].children.length == 0){
         this.$router.options.routes[4].children.push(...this.routes)
      }
      // console.log(this.$router.options)
    },
}
</script>

<style scoped>
 .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
   .el-dropdown-link {
    cursor: pointer;
    color: black;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
   .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>