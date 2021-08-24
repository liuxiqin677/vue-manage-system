<template>
  <div>
    <el-container class='container'>
            <el-main>
                <el-descriptions title="用户信息" direction="vertical" :column="2" border>
                    <el-descriptions-item label="公司收入">xxxx</el-descriptions-item>
                    <el-descriptions-item label="公司支出">xxxx</el-descriptions-item>
                    <el-descriptions-item label="公司管理" :span="2">xxxxx</el-descriptions-item>
                    <el-descriptions-item label="公司未来方案" :span="2">xxxxx</el-descriptions-item>
                    <el-descriptions-item label="公司未来目标" :span="2">xxxxx</el-descriptions-item>
                    <el-descriptions-item label="公司当前方案" :span="2">xxxxx</el-descriptions-item>
                    <el-descriptions-item label="公司当前任务" :span="2">xxxxx</el-descriptions-item>
                </el-descriptions>
            </el-main>
            <el-main>
                <div class="block">
                    <el-timeline>
                        <el-timeline-item timestamp="2021/8/16" placement="top">
                        <el-card>
                            <h4>公司方案完成进度</h4>
                            <el-progress type="circle" :percentage="25"></el-progress>
                        </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2021/8/22" placement="top">
                        <el-card>
                            <h4>公司方案技术成熟度</h4>
                            <el-progress type="circle" :percentage="90"  status="success"></el-progress>
                        </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2021/8/24" placement="top">
                        <el-card>
                            <h4>公司方案资金流通度</h4>
                            <el-progress type="circle" :percentage="85" status="success"></el-progress>
                        </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </div>
            </el-main>
        </el-container>
  </div>
</template>

<script>
export default {
    methods: {
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`;
      }
    }
}
</script>

<style>

</style>