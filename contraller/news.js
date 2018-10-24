const {Router} = require('express')
const router = Router()
const news = require('../model/news')

//新闻列表
router.get('/news', async (req, res, next) => {
    try {
        let data = await news.find()
        res.json({
            code : 200,
            data
        })
    }catch (err) {
        next(err)
    }
})

//添加新闻
router.post('/addnews',async (req,res,next) => {
    try {
        let {
            category,
            header,
            title,
            lookNumber
        } = req.body
        let data = await news.create({
            category,
            header,
            title,
            lookNumber
        })
        res.json({
            code : 200 ,
            data,
            msg : '添加成功'
        })
    }catch (err) {
        next(err)
    }
})

module.exports = router;