
const mongoose = require('mongoose')

const User = mongoose.model('User',new mongoose.Schema({    //定义用户模块users
    username:{
        type:String,
    },
    password:{
        type:String,
    },
    //admin 管理员
    //normal 普通用户
    role:{
        type:String,
    },
    phone:{
        type:String,
        default:'12345'
    },
    address:{
        type:String
    }
}))

module.exports = {
    User
}