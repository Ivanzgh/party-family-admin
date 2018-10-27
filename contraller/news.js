const {Router} = require('express')
const router = Router()
const news = require('../model/news')
const admin = require('../model/admin')
const jwt = require('jsonwebtoken')
const cert = require('../utils/auth')
const auth = require('./auth')   //鉴权

//获取新闻列表
router.get('/news', async (req, res, next) => {
    try {
        let {page = 1, page_size = 10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        const data = await news.find()
            .skip((page - 1) * page_size)
            .limit(page_size)
            .sort({_id: -1})
            .populate({
                path: 'author',
                select: '-password'
            })
            .populate({
                path: 'type'
            })
        res.json({
            code: 200,
            data
        })
    } catch (err) {
        next(err)
    }
})

//获取单条新闻
router.get('/news/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        let data = await news.findById(id)
            .populate({
                path: 'author',
                select: '-password'
            })
            .populate({
                path: 'type'
            })
        res.json({
            code: 200,
            data
        })
    } catch (err) {
        next(err)
    }
})

//获取登陆验证后的新闻列表
router.get('/getnews', (req, res, next) => {
    let token = req.headers.token || req.body.token || req.query.token
    if (token) {
        jwt.verify(token, cert, function (err, decode) {
            if (err) {
                res.json({
                    code: 403,
                    msg: '登录状态失效'
                })
                return
            }
            admin.findOne({_id: decode.userId})
                .then(user => {
                    news.find().then(data => {
                        res.json({
                            code: 200,
                            data: {
                                news: data,
                                user: user
                            }
                        })
                    })
                })
        })
    } else {
        res.json({
            code: 403,
            msg: 'token缺失'
        })
    }
})

//添加新闻
router.post('/addnews', auth, async (req, res, next) => {
    try {
        let {
            header,
            title,
            author,
            content,
            contentText,
            type,
        } = req.body
        let data = await news.create({
            header,
            title,
            author,
            content,
            contentText,
            type,
        })
        res.json({
            code: 200,
            data,
            msg: '添加成功'
        })
    } catch (err) {
        next(err)
    }
})

//删除单条新闻
router.post('/news/delete', auth, async (req, res, next) => {
    try {
        let {id} = req.params
        const data = await news.deleteOne(id)
        res.json({
            code: 200,
            data,
            msg: '删除成功'
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router;