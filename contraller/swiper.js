const {Router} = require('express')
const router = Router()
const swiper = require('../model/swiper')
const auth = require('./auth')

//添加轮播图
router.post('/addSwiper',auth,async (req,res,next) => {
    try {
        let {
            imgUrl,
            title,
            status,
            newsID ,
            priority
        } = req.body
        let data = await swiper.create({
            imgUrl,
            title,
            status,
            newsID ,
            priority
        })
        res.json({
            code : 200,
            data,
            msg : '轮播图添加成功'
        })
    }catch (err) {
        next(err)
    }
})

//编辑轮播图
router.patch('/swiper/:id',auth,async (req,res,next) => {
    try {
        const {id} = req.params
        const {
            imgUrl,
            title,
            status,
            newsID ,
            priority
        } = req.body
        const data = await swiper.findById(id)
        const updateData =  await data.update({$set : {
                imgUrl,
                title,
                status,
                newsID ,
                priority
            }})
        res.json({
            code : 200,
            data : updateData,
            msg : '修改成功'
        })
    }catch (err) {
        next(err)
    }
})

//获取轮播图列表
router.get('/swiper',async (req,res,next) => {
    try {
        let {page=1,page_size=10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        let data = await swiper.find()
            .skip((page-1) * page_size)
            .limit(page_size)
            .sort({priority : -1, _id : -1})
            .populate({
                path : 'newsID',
            })
        res.json({
            code: 200,
            data
        })
    }catch (err) {
        next(err)
    }
})

//获取单个轮播图
router.get('/swiper/:id',async (req,res,next) => {
    try {
        const {id} = req.params
        let data = await swiper.findById(id)
            .populate({
                path : 'newsID',
            })
        res.json({
            code: 200,
            data
        })
    } catch (err) {
        next(err)
    }
})

//删除单条轮播图
router.post('/swiper/delete',auth,async (req,res,next) => {
    try {
        let {id} = req.params
        const data =  await swiper.deleteOne(id)
        res.json({
            code : 200,
            data,
            msg : '删除成功'
        })
    }catch (err) {
        next(err)
    }
})

module.exports = router