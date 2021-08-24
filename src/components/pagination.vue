<template>
  <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="[5,10,15,20]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
  </div>
</template>

<script>
export default {
    name:'fenye',
    //接受父组件传来的 总页数
    props: ["total"],
    methods: {
      handleSizeChange(val) {
        this.page.pageSize = val;
        console.log(`每页 ${this.page.pageSize} 条`);
        this.$emit("pageChange", this.page);
      },
      handleCurrentChange(val) {
        this.page.currentPage = val;
        console.log(`当前页: ${this.page.currentPage}`);
        this.$emit("pageChange", this.page);
      }
    },
    data() {
      return {
       // 页码参数
        page: {
          currentPage: 1, //当前页
          pageSize: 5    //一页多少条数据
        }
      };
    }
}
</script>

<style>

</style>