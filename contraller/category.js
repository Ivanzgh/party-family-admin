const {Router} = require('express')
const router = Router()
const category = require('../model/category')
const auth = require('./auth')

//添加分类
router.post('/addCategory',auth,async (req,res,next) => {
    try {
        let {
            title,
            icon,
        } = req.body
        let data = await category.create({
            title,
            icon,
        })
        res.json({
            code : 200,
            data,
            msg : '分类添加成功'
        })
    }catch (err) {
        next(err)
    }
})

//获取分类列表
router.get('/category',async (req,res,next) => {
    try {
        let data = await category.find()
        res.json({
            code : 200,
            data
        })
    }catch (err) {
        next(err)
    }
})

//获取单个分类
router.get('/category/:id',async (req,res,next) => {
    try {
        let {id} = req.params
        let data = await category.findById(id)
        res.json({
            code : 200,
            data
        })
    }catch (err) {
        next(err)
    }
})

module.exports = router