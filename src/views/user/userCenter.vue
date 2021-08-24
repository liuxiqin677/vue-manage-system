<template>
    <div>
        <!-- 编辑个人信息框 -->
        <!-- <el-dialog title="编辑个人信息" :visible.sync="EditFormVisible">
        <el-form :model="editMyInfo">
            <el-form-item label="用户名：" :label-width="formLabelWidth">
            <el-input v-model="editMyInfo.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="住址：" :label-width="formLabelWidth">
            <el-input v-model="editMyInfo.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" :label-width="formLabelWidth">
            <el-input v-model="editMyInfo.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色：" :label-width="formLabelWidth">
            <el-radio v-model="editMyInfo.role" label="admin" disabled>管理员</el-radio>
            <el-radio v-model="editMyInfo.role" label="normal" disabled>用户</el-radio>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="EditFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="sendEdit">确 定</el-button>
        </div>
        </el-dialog> -->

        <!-- 用户信息展示 -->
        <el-container class='container'>
            <el-main>
                <el-descriptions title="用户信息" direction="vertical" :column="2" border>
                    <el-descriptions-item label="用户名">{{username}}</el-descriptions-item>
                    <el-descriptions-item label="角色">{{role}}</el-descriptions-item>
                    <el-descriptions-item label="手机号" :span="2">{{phone}}</el-descriptions-item>
                    <el-descriptions-item label="住址">{{address}}</el-descriptions-item>
                </el-descriptions>

                <!-- 消息通知 -->
                <el-badge :value="200" :max="99" class="item">
                    <el-button size="small">消息</el-button>
                </el-badge>
                <el-badge :value="100" :max="10" class="item">
                    <el-button size="small">回复</el-button>
                </el-badge>
                <el-badge :value="1" class="item" type="primary">
                    <el-button size="small">办公</el-button>
                </el-badge>
                <!-- 点击弹出编辑框 -->
                <!-- <el-button id="editBtn" type="primary" @click="EditFormVisible = true">编辑信息</el-button> -->
            </el-main>
            <el-main>
                <div class="block">
                    <el-timeline>
                        <el-timeline-item timestamp="2021/8/16" placement="top">
                        <el-card>
                            <h4>更新编辑功能</h4>
                            <p>{{username}} 提交于 2021/8/16 20:46</p>
                        </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2021/8/22" placement="top">
                        <el-card>
                            <h4>更新查询、个人信息修改功能</h4>
                            <p>{{username}} 提交于 2021/8/22 20:46</p>
                        </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2021/8/24" placement="top">
                        <el-card>
                            <h4>项目完成</h4>
                            <p>{{username}} 提交于 2021/8/24 20:46</p>
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
    name:'center',
    data(){
        return{
            myInfo:'',
            editMyInfo:{
                username:'',
                role:'',
                phone:'',
                address:'',
                _id:this.$store.state._id
            },
            password:'',
            EditFormVisible:false,
            formLabelWidth: '120px',
        }
    },
    methods: {
        setMyInfo(){
            this.username = this.$store.state.username
            this.role = this.$store.state.role
            this.phone = this.$store.state.phone
            this.address = this.$store.state.address
            this._id = this.$store.state._id
        },
        // sendEdit(){
        //     this.$http.put('/editUser',this.editMyInfo)
        //     .then(res => {
        //         this.$message({
        //             message: '修改成功',
        //             type: 'success'
        //         });
                
        //     })
        //     .catch(err => {
        //         this.$message.error(err)
        //     })
        // }
    },
    created() {
        this.setMyInfo()
    },
}
</script>

<style>
#editBtn{
    margin-top: 30px;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>