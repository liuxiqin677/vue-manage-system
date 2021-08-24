const express = require('express')
const app = express()
const port = 3000
//req.body接受表单数据
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.json()) //接受前端ajax的请求
app.use(require('cors')())  //允许跨域

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ManageSystem',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})
.then(() => console.log('数据库连接成功'))
.catch(() => console.log('数据库连接失败'))



const {User} = require('./models/user')
//注册请求  localhost:3000/api/register
app.post('/api/register',async(req,res) => {
    //先获取用户注册提交的数据
    // console.log(req.body)
    const user = {
        username:req.body.username,
        password:req.body.password,
        role:req.body.radio, //
        address:req.body.address,
        phone:req.body.phone
    }
    if(await User.findOne({username:req.body.username})){
        res.send({
            status:0,
            msg:'注册失败'
        })   //0 代表失败
    }else{  
        await User.create(user)
        res.send({
            user,
            status:1,
            msg:'注册成功'
        }) //1 代表成功
    }
})
//登录请求  localhost:3000/api/login
app.post('/api/login',async(req,res) => {
    //去数据库查找该用户,如果找到了,就将用户信息返回
    const user = await User.findOne({username:req.body.username})
    if(user){
        res.send({user,status:1})   //1代表成功
    }else{
        res.send({status:0})    //0代表失败
    }
})
//获取用户列表
app.get('/api/getUsers',async(req,res) =>{
    const users = await User.find()
    res.send(users)
})
//添加用户
app.post('/api/addUser',async(req,res) => {
    const user = {
        username:req.body.username,
        role:req.body.role,
        phone:req.body.phone,
        address:req.body.address,
    }
    await User.create(user)
    res.send({
        status:200,
        msg:'用户添加成功'
    })
})
//预编译处理
app.post('/api/getOneUser',async(req,res) => {
    const username = req.body.username
    const user = await User.findOne({username:username})
    res.send(user)
})
//修改用户
app.put('/api/editUser',async(req,res) => {
    const id = req.body._id
    await User.findByIdAndUpdate(id,{
        username:req.body.username,
        role:req.body.role,
        phone:req.body.phone,
        address:req.body.address,
    },function(err,data){
        if(err){
            res.send({status:500})
        }else{
            res.send({status:200})
        }
    })
    
})
//获取登录的用户信息
app.get('/api/getLoginUser',async(req,res) => {
    const id = req.body._id
    const user = await User.findOne({_id:id})
    res.send(user)
})


const { Goods} = require('./models/goods')
// 添加商品
app.post('/api/addgoods',async(req,res) => {
    const good = {
        goodsname:req.body.goodsname,
        goodsDes:req.body.goodsDes,
        goodsPrice:req.body.goodsPrice,
        goodsCategory:req.body.goodsCategory,
        goodsId:req.body.goodsId
    }
    await Goods.create(good)
    res.send({
        status:200,
        msg:'添加商品成功'
    })
})
// 编辑/修改商品
app.put('/api/editgoods',async(req,res) => {
    const id = req.body._id
    await Goods.findByIdAndUpdate(id,{
        goodsname:req.body.goodsname,
        goodsDes:req.body.goodsDes,
        goodsPrice:req.body.goodsPrice,
        goodsCategory:req.body.goodsCategory
    },function(err,data){
        if(err){
            res.send({status:500})
        }else{
            res.send({status:200})
        }
    })
})

// 获取商品
app.get('/api/getgoods',async(req,res) => {
    const good = await Goods.find()
    res.send(good)
})

//获取单个商品
app.post('/api/getOneGood',async(req,res) => {
    const goodsId = req.body.goodsId
    const good = await Goods.findOne({goodsId:goodsId})
    res.send(good)
})
//获取商品的ID
app.get('/api/getgoodsId',async(req,res) => {
    const goods = await Goods.find()
    const arr = []
    goods.forEach(item => {
        arr.push(item.goodsId)
    })
    res.send(arr)
})
//获取商品总个数
app.get('/api/getGoodsCount',async(req,res) => {
    const total = await Goods.estimatedDocumentCount()
    // total是个数字，如果直接返回，total会被当成status 所以拼接一个空串成字符串来处理
    res.send(total+'')
})
//删除商品
app.post('/api/deletegoods',async(req,res) => {
    // console.log(req.body._id)
    // console.log(req.body.goodsId)
    await Goods.findByIdAndDelete(req.body._id,function(err,docs){
        if(err){
            res.send({msg:'删除商品失败',status:500})
        }else{
            res.send({msg:'删除商品成功',status:200})
        }
    })
})

app.listen(port, () => console.log(`http://localhost:${port}`))