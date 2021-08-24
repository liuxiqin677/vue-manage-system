<template>
  <div>
    <!-- 添加商品 -->
    <el-button type="primary" @click="dialogFormVisible = true">添加商品</el-button>

    <el-dialog title="添加商品" :visible.sync="dialogFormVisible">
      <el-form :model="goodsAdd">
        <el-form-item label="商品序列：" :label-width="formLabelWidth">
          <el-input v-model="goodsAdd.goodsId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品名称：" :label-width="formLabelWidth">
          <el-input v-model="goodsAdd.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品描述：" :label-width="formLabelWidth">
          <el-input v-model="goodsAdd.goodsDes" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格：" :label-width="formLabelWidth">
          <el-input v-model="goodsAdd.goodsPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品类别：" :label-width="formLabelWidth">
          <el-radio v-model="goodsAdd.goodsCategory" label="服饰">服饰</el-radio>
          <el-radio v-model="goodsAdd.goodsCategory" label="厨具">厨具</el-radio>
          <el-radio v-model="goodsAdd.goodsCategory" label="日常">日常</el-radio>
          <el-radio v-model="goodsAdd.goodsCategory" label="电子">电子</el-radio>
          <el-radio v-model="goodsAdd.goodsCategory" label="书籍">书籍</el-radio>
          <el-radio v-model="goodsAdd.goodsCategory" label="医疗">医疗</el-radio>
          <el-radio v-model="eidtGoods.goodsCategory" label="模型">模型</el-radio>
          <el-radio v-model="eidtGoods.goodsCategory" label="建筑">建筑</el-radio>
          <el-radio v-model="eidtGoods.goodsCategory" label="食品">食品</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendGoods">确 定</el-button>
      </div>
    </el-dialog>

    <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <!-- 内容展示 -->
    <el-table-column
        prop="goodsId"
        show-overflow-tooltip
        label="商品序列号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goodsname"
        show-overflow-tooltip
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goodsDes"
        label="商品描述"
        show-overflow-tooltip
        width="180">
      </el-table-column>
      <el-table-column
        prop="goodsPrice"
        show-overflow-tooltip
        label="商品价格">
      </el-table-column>
      <el-table-column
        prop="goodsCategory"
        show-overflow-tooltip
        label="商品分类">
      </el-table-column>

      <!-- 表单操作 -->
      <el-table-column label="操作" v-if="role == 'admin'">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)" v-if="role == 'admin'">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)" v-if="role == 'admin'">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <page :total="page_total" @pageChange="pageChange"></page>

    <!-- 编辑商品 -->
    <el-dialog title="编辑商品" :visible.sync="EditFormVisible">
      <el-form :model="eidtGoods">
        <el-form-item label="商品名称：" :label-width="formLabelWidth">
          <el-input v-model="eidtGoods.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品描述：" :label-width="formLabelWidth">
          <el-input v-model="eidtGoods.goodsDes" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格：" :label-width="formLabelWidth">
          <el-input v-model="eidtGoods.goodsPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品类别：" :label-width="formLabelWidth">
          <el-radio v-model="eidtGoods.goodsCategory" label="服饰">服饰</el-radio>
          <el-radio v-model="eidtGoods.goodsCategory" label="厨具">厨具</el-radio>
          <el-radio v-model="eidtGoods.goodsCategory" label="日常">日常</el-radio>
          <el-radio v-model="eidtGoods.goodsCategory" label="电子">电子</el-radio>
          <el-radio v-model="eidtGoods.goodsCategory" label="书籍">书籍</el-radio>
          <el-radio v-model="eidtGoods.goodsCategory" label="医疗">医疗</el-radio>
          <el-radio v-model="eidtGoods.goodsCategory" label="模型">模型</el-radio>
          <el-radio v-model="eidtGoods.goodsCategory" label="建筑">建筑</el-radio>
          <el-radio v-model="eidtGoods.goodsCategory" label="食品">食品</el-radio>
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
    name:'goodsList',
    data() {
      return {
        role:this.$store.state.role,
        tableData:this.$store.state.goodsList,
        dialogTableVisible: false,
        dialogFormVisible: false,
        EditFormVisible:false,
        isOnlyId:true,
        goodsAdd:{
          goodsname:'',
          goodsDes:'',
          goodsPrice:0,
          goodsCategory:'类别',
          goodsId:''
        },
        eidtGoods:{
          goodsname:'',
          goodsDes:'',
          goodsPrice:0,
          goodsCategory:'类别',
          goodsId:'',
          _id:''
        },
        formLabelWidth: '120px',
        page_total: this.$store.state.goodsList.length,
        page_index: 1, //当前页页码
        page_size: 5 ,//每页展示条数
      }
    },
     methods: {
      //进行编辑预处理
      handleEdit(index, row) {
        //预编辑处理
        this.EditFormVisible = true
        //传的是个对象，所以用post来请求
        this.$http.post('/getOneGood',row)
        .then(res => {
          // console.log(res.data)
          for(var key in this.eidtGoods){
            if(Object.keys(res.data).includes(key)){
              this.eidtGoods[key] = res.data[key]
            }
          }
          // console.log(res.data)
        })
      },
      //删除商品
      handleDelete(index, row) {   
        this.$http.post('/deletegoods',row)
        .then(res => {
          console.log(res.data)
          if(res.data.status == 200){
            this.$message({//这个是element-ui里面的
                    message: '商品删除成功',
                    type: 'success'
              });
          }else{
             this.$message.error('商品删除失败');
          }
          this.getGoodsList()
        })

      },
      //获取商品列表
      getGoodsList(){
        this.$http.get('/getgoods')
        .then(res => {
          // console.log('数据库商品列表：'+res.data[0].goodsId)
          // this.tableData = res.data
          this.$store.dispatch('setGoodsInfo',res.data)
          // console.log(this.$store.state.goodsList)
          this.tableData = this.$store.state.goodsList.slice((this.page_index-1)*this.page_size,this.page_index*this.page_size)
          // console.log(this.tableData)
          
        })
        .catch(err => {
          this.$message.error(err);
        })
      },
      //判断商品ID是否唯一
      isOnlyOneId(arr,id){
        console.log(arr)
        for(let i=0;i<arr.length;i++){
          if(arr[i] == id){
            this.isOnlyId = false
            break
          }
        }
      },
      //添加商品
      sendGoods(){

        this.$http.post('/addgoods',this.goodsAdd)
        .then(res => {
          if(res.data.status == 200){
              this.$message({//这个是element-ui里面的
                    message: '商品添加成功',
                    type: 'success'
              });
          }
        })
        //把新添加的存储到vuex里面
        this.$store.dispatch('addGoodsInfo',this.goodsAdd)
        this.goodsAdd = {
          goodsname:'',
          goodsDes:'',
          goodsPrice:0,
          goodsCategory:'类别',
          goodsId:''
        }
        // this.$router.push('/layout/goodsList')
        //关闭增加框
        this.tableData = this.$store.state.goodsList.slice((this.page_index-1)*this.page_size,this.page_index*this.page_size)
        this.dialogFormVisible = false
      },
      //修改商品
      sendEdit(){
        // console.log(this.eidtGoods)
        this.$http.put('/editgoods',this.eidtGoods)
        .then(res => {
            this.$message({
              message: '商品修改成功',
              type: 'success'
            });
            // console.log(res.data)
        })
        this.EditFormVisible = false
        this.getGoodsList()
      },
      //获取总页数
      pageChange(item) {
        this.page_index = item.currentPage;
        this.page_size = item.pageSize;
        // console.log(`每页展示${this.page_size}条，当前为${this.page_index}页`);
        //每次点击页数时，改变tableData显示的数据条数
        this.tableData = this.$store.state.goodsList.slice((this.page_index-1)*this.page_size,this.page_index*this.page_size)
      }
    },
    created() {
      this.getGoodsList()
    },
    components:{
      page:Page
    }
}
</script>

<style scoped>

</style>