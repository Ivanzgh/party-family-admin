const {Router} = require('express')
const router = Router()
const admin = require('../model/admin')
const jwt = require('jsonwebtoken')
const cert = require('../utils/auth')
const auth = require('./auth')

//新增用户
router.post('/adduser',auth, async (req, res, next) => {
    try {
        let {
            username,
            password,
            desc,
            sex,
            nickname,
            avatar
        } = req.body
        let data = await admin.create({
            username,
            password,
            desc,
            sex,
            nickname,
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
        let {username, password} = req.body     //获取用户输入的值

        if (username&&password) {
            const user = await admin.findOne({username})
            if (user) {
                if (password === user.password) {
                    req.session.admin = user    //将用户信息存在session里
                    const token = jwt.sign({ userId : user._id },cert,{expiresIn : 60*60*7})
                    res.json({
                        code : 200,
                        token,
                        data : user,
                        msg : '登录成功'
                    })
                }else {
                    res.json({
                        code : 400,
                        msg : '密码不正确'
                    })
                }
            } else {
                res.json({
                    code : 400,
                    msg : '用户不存在'
                })
            }
        } else {
            res.json({
                code : 400,
                msg : '缺少必要参数'
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
        let {page=1,page_size=10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        let data = await admin.find()
            .skip((page - 1) * page_size)
            .limit(page_size)
            .sort({_id: -1})
        res.json({
            code : 200,
            data : data
        })
    }catch (err) {
        next(err)
    }
})

//删除单个管理员
router.post('/admin/delete',auth, async (req, res, next) => {
    try {
        let {id} = req.params
        const data = await admin.deleteOne(id)
        res.json({
            code: 200,
            data,
            msg: '删除成功'
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router