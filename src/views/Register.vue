<template>
    <div>
        <el-form ref="userForm" :model="userForm"  label-width="80px" >
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密 码" prop="password">
                <el-input v-model="userForm.password"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input v-model="userForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="住址" prop="address">
                <el-input v-model="userForm.address"></el-input>
            </el-form-item>
            <el-form-item>
                <el-radio v-model="userForm.radio" label="admin">管理员</el-radio>
                <el-radio v-model="userForm.radio" label="normal">普通用户</el-radio>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="register">立即注册</el-button>
                <el-button type="info" @click="backLogin">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name:'register',
        data(){
            return{
                userForm:{
                    username:'',
                    password:'',
                    radio:'normal',//默认为用户
                    phone:'',
                    address:''
                }
            }
        },
        methods: {
            register(){
                if(this.userForm.username!='' && this.userForm.password !='' && this.userForm.radio !='' && this.userForm.phone !='' && this.userForm.address !=''){
                    // console.log(this.userForm.radio)
                    this.$http.post('/register',this.userForm)
                    .then(res => {
                        // console.log(res.data.status)
                        if(!res.data.status){// 0表示失败 所以要 !0
                            this.$message.error('注册失败！该用户已被注册！');
                        }else{
                            this.$message({
                                message: '注册成功！',
                                type: 'success'
                            });
                            this.$router.push('/login')
                        }
                    })
                }else{
                    this.$message.error('用户名、密码、用户身份不能为空');
                }
            },
            backLogin(){
                this.$router.push('/login')
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>