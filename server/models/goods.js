const mongoose = require('mongoose')

const Goods = mongoose.model('Good',new mongoose.Schema({    //定义用户模块users
    goodsname:{
        type:String,
    },
    // 商品描述
    goodsDes:{
        type:String,
    },
    
    goodsPrice:{
        type:String
    },
    // 商品类型
    goodsCategory:{
        type:String
    },
    goodsId:{
        type:String
    }
}))

module.exports = {
    Goods
}