<template>
  <div>
    <el-form ref="userForm" :model="userForm"  :rules="rules" label-width="80px" >
        <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="password">
            <el-input v-model="userForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
            <el-button type="info" @click="register">注册</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import router from '../router/index'
import store from '../store/index'
export default {
    name:"login",
    data(){
        return{
            userForm:{
                username:'',
                password:'',
            },
            rules:{
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 2, message: '密码长度至少为2位', trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        onSubmit(){
            this.$http.post('/login',this.userForm)
            .then(res => {
                if(!res.data.status){   //0表示没找到 if(0)进去不到 所以要 !0
                    this.$message.error('登录失败！未找到该用户！');
                }else{
                    this.$store.dispatch('setUserInfo', res.data.user)
                    this.$store.dispatch('genereateRoutes',res.data.user.role)
                    localStorage.setItem('userInfo',JSON.stringify(store.state.userInfo))
                    this.$router.push('/layout')
                    // console.log(this.$router.options)
                }
            })
        },
        register(){
            this.$router.push('/register')
        },
    },
}
</script>

<style scoped>

</style>