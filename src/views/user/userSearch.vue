<template>
  <div>
    <!-- 输入内容搜索 -->
    <el-row class="table-grid-content">
			<el-col :span="18" class="grid">
				<el-input v-model="input" placeholder="请输入商品名称搜索"></el-input>
			</el-col>
			<el-col :span="3" class="grid" :gutter="1" style="margin-left:35px;">
				<el-button type="success" icon="el-icon-search">搜索</el-button>
			</el-col>
			<!-- <el-col :span="1" class="grid" :gutter="15">
				<el-button type="primary" icon="el-icon-search" @click="serachByCate">类别搜索</el-button>
			</el-col> -->
		</el-row>

    <!-- 内容数据展示 -->
      <el-table
      :data="tables"
      stripe
      style="width: 100%">
      <!-- 内容展示 -->
      <el-table-column
        prop="username"
        show-overflow-tooltip
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="role"
        show-overflow-tooltip
        label="角色"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话"
        show-overflow-tooltip
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        show-overflow-tooltip
        label="住址">
      </el-table-column>
      </el-table>

      <!-- 分页 -->
      <page :total="page_total" @pageChange="pageChange"></page>
  </div>
</template>

<script>
import Page from '../../components/pagination.vue'
export default {
    name:'goodSearch',
    data() {
      return {
        tableData:this.$store.state.userList,
        formLabelWidth: '120px',
        page_total: this.$store.state.userList.length,
        page_index: 1, //当前页页码
        page_size: 5 ,//每页展示条数
        input:'',
      }
    },
    methods: {
      //改变页数
      pageChange(item) {
        this.page_index = item.currentPage;
        this.page_size = item.pageSize;
        // console.log(`每页展示${this.page_size}条，当前为${this.page_index}页`);
        //每次点击页数时，改变tableData显示的数据条数
        this.tableData = this.$store.state.userList.slice((this.page_index-1)*this.page_size,this.page_index*this.page_size)
      },
       //获取商品列表
      getUserList(){
        this.$http.get('/getUsers')
        .then(res => {
          // console.log('数据库商品列表：'+res.data[0].goodsId)
          // this.tableData = res.data
          this.$store.dispatch('setUserList',res.data)
          this.tableData = this.$store.state.userList.slice((this.page_index-1)*this.page_size,this.page_index*this.page_size)
          this.tables = this.$store.state.userList.slice((this.page_index-1)*this.page_size,this.page_index*this.page_size)
          // console.log(this.$store.state.goodsList)
        })
        .catch(err => {
          this.$message.error(err);
        })
      },
      // serach(){
      //   const input = this.input
      //   const arr = []
      //   if(input){
      //     this.tableData.filter(item => {
      //       if(item.goodsname.indexOf(input) != -1){
      //         arr.push(item)
      //       }
      //     })
      //   }
      //   console.log(arr)
      // },
      //按类别搜索
      serachByCate(){

      }
    },
    computed:{
      tables(){
        const input = this.input
        //input不为空才进来
        if(input){
          // console.log("input输入的搜索内容：" + this.input)
          return this.tableData.filter(data => {
            //获取data的key
						// console.log("object:" + Object.keys(data))
						return Object.keys(data).some(key => {
							return String(data[key]).toLowerCase().indexOf(input) > -1
						})
					})
        }
        return this.tableData
      }
    },
    components:{
      page:Page
    },
    created() {
      this.getUserList()
    },
}
</script>

<style scoped>

</style>