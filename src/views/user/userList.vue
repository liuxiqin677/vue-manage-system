<template>
  <div>
    <!-- 添加商品 -->
    <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>

    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="userAdd">
        <el-form-item label="用户名：" :label-width="formLabelWidth">
          <el-input v-model="userAdd.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="住址：" :label-width="formLabelWidth">
          <el-input v-model="userAdd.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" :label-width="formLabelWidth">
          <el-input v-model="userAdd.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色：" :label-width="formLabelWidth">
          <el-radio v-model="userAdd.role" label="admin">管理员</el-radio>
          <el-radio v-model="userAdd.role" label="normal">用户</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendUsers">确 定</el-button>
      </div>
    </el-dialog>

    <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <!-- 内容展示 -->
    <el-table-column
        prop="username"
        show-overflow-tooltip
        label="用户名"
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

      <!-- 表单操作 -->
      <el-table-column label="操作" v-if="userRole == 'admin'">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <page :total="page_total" @pageChange="pageChange"></page>

    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="EditFormVisible">
      <el-form :model="eidtUser">
        <el-form-item label="用户名：" :label-width="formLabelWidth">
          <el-input v-model="eidtUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="住址：" :label-width="formLabelWidth">
          <el-input v-model="eidtUser.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" :label-width="formLabelWidth">
          <el-input v-model="eidtUser.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色：" :label-width="formLabelWidth">
          <el-radio v-model="eidtUser.role" label="admin">管理员</el-radio>
          <el-radio v-model="eidtUser.role" label="normal">用户</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="EditFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sendEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Page from '../../components/pagination.vue'
export default {
    name:'userList',
    data() {
      return {
        userRole:this.$store.state.role,
        tableData:this.$store.state.userList,
        dialogTableVisible: false,
        dialogFormVisible: false,
        EditFormVisible:false,
        isOnlyId:true,
        userAdd:{
          username:'',
          role:'admin',
          phone:'',
          address:'',
        },
        eidtUser:{
          username:'',
          role:'',
          phone:'',
          address:'',
          _id:'',
        },
        formLabelWidth: '120px',
        page_total: this.$store.state.userList.length,
        page_index: 1, //当前页页码
        page_size: 5 ,//每页展示条数
      }
    },
     methods: {
      //进行编辑预处理
      handleEdit(index, row) {
        //预编辑处理
        this.EditFormVisible = true
        //预编译的时候，要为我们的_id 赋值 这样才能在数据库里面查找并修改
        this.eidtUser._id = row._id
        this.$http.post('/getOneUser',row)
        .then(res => {
          console.log(res.data)
          //将 eidtUser里面有的 键 的 值 通过后台返回的数据赋值，进行预处理
          for(var key in this.eidtUser){
            if(Object.keys(res.data).includes(key)){
              this.eidtUser[key] = res.data[key]
            }
          }
          console.log(this.eidtUser.role)
        })
      },
      //删除用户
      handleDelete(index, row) {   
        // this.$http.post('/deletegoods',row)
        // .then(res => {
        //   console.log(res.data)
        //   if(res.data.status == 200){
        //     this.$message({//这个是element-ui里面的
        //             message: '商品删除成功',
        //             type: 'success'
        //       });
        //   }else{
        //      this.$message.error('商品删除失败');
        //   }
        //   this.getGoodsList()
        // })

      },
      //获取用户列表
      getUserList(){
        this.$http.get('/getUsers')
        .then(res =>{
          // console.log('数据库用户：' + res.data)
          this.$store.dispatch('setUserList',res.data)
          // console.log(this.$store.state.userList)
          this.tableData = this.$store.state.userList.slice((this.page_index-1)*this.page_size,this.page_index*this.page_size)
        })
      },
      //添加用户
      sendUsers(){
        //如果phone不全是数字
        if(/^\d+$/.test(this.userAdd.phone) == false){
          this.$message({
            message: '电话格式不正确！',
            type: 'warning'
          });
          return false
        }
        //如果用户名重复
        const arr = this.$store.state.userList
        for(let i = 0;i<arr.length;i++){
          if(arr[i].username == this.userAdd.username){
            this.$message({
              message: '用户名不能重复！',
              type: 'warning'
            });
          return false
          }
        }
        //符合条件后提交
        this.$http.post('/addUser',this.userAdd)
        .then(res => {
          if(res.data.status == 200){
              this.$message({//这个是element-ui里面的
                    message: '用户添加成功',
                    type: 'success'
              });
          }
        })
        //把新添加的存储到vuex里面
        this.$store.dispatch('addUserInfo',this.userAdd)
        this.userAdd = {
          username:'',
          role:'admin',
          phone:'',
          address:''
        }
        // this.$router.push('/layout/goodsList')
        //关闭增加框
        this.tableData = this.$store.state.userList.slice((this.page_index-1)*this.page_size,this.page_index*this.page_size)
        this.page_total = this.$store.state.userList.length
        this.dialogFormVisible = false
      },
      //修改用户
      sendEdit(){
        //如果phone不全是数字
        if(/^\d+$/.test(this.eidtUser.phone) == false){
          this.$message({
            message: '电话格式不正确！',
            type: 'warning'
          });
          return false
        }
        //提交用户合格信息
        this.$http.put('/editUser',this.eidtUser)
        .then(res => {
            this.$message({
              message: '用户修改成功',
              type: 'success'
            });
            // console.log(res.data)
        })
        this.EditFormVisible = false
        this.getUserList()
      },
      //获取总页数
      pageChange(item) {
        this.page_index = item.currentPage;
        this.page_size = item.pageSize;
        // console.log(`每页展示${this.page_size}条，当前为${this.page_index}页`);
        //每次点击页数时，改变tableData显示的数据条数
        this.tableData = this.$store.state.userList.slice((this.page_index-1)*this.page_size,this.page_index*this.page_size)
      }
    },
    created() {
      this.getUserList()
    },
    components:{
      page:Page
    }
}
</script>

<style scoped>

</style>