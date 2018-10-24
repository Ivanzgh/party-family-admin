const {Router} = require('express')
const router = Router()
const admin = require('../model/admin')

//新增用户
router.post('/adduser', async (req, res, next) => {
    try {
        let {
            username,
            password,
            desc,
            sex,
            avatar
        } = req.body
        let data = await admin.create({
            username,
            password,
            desc,
            sex,
            avatar
        })
        res.json({
            code : 200,
            data : data,
            msg : '添加成功'
        })
    }catch (err) {
        next(err)
    }
})

//登录
router.post('/login', async (req, res, next) => {
    try {
        let {username, password} = req.body
        let data = await admin.findOne({username, password})
        if (!data) {
            res.json({
                code: 401,
                msg: '用户不存在'
            })
        } else if (!data.password === password) {
            res.json({
                code: 401,
                msg: '密码不正确'
            })
        } else if (data.password === password) {
            req.session.admin = data
            let adminMsg = {
                username: data.username,
                password: data.password,
                avatar: data.avatar,
                desc: data.desc,
                sex: data.sex
            }
            res.json({
                code: 200,
                msg: '登陆成功',
                data: adminMsg
            })
        }
    } catch (err) {
        next(err)
    }
})

//退出登录
router.get('/logout',(req,res) => {
    if (req.session.admin) {
        req.session.admin = null
        res.json({
            code : 200,
            msg : '退出登录成功'
        })
    } else {
        res.json({
            code : 400,
            msg : '请先登录'
        })
    }
})

//用户列表
router.get('/admin',async (req,res,next) => {
    try {
        let data = await admin.find()
        res.json({
            code : 200,
            data : data
        })
    }catch (err) {
        next(err)
    }

})

module.exports = router;