module.exports = function (req,res,next) {
    if (req.session && req.session.admin) {
        next()
    } else {
        res.json({
            code : 403,
            msg : '登录状态失效'
        })
    }
}

//鉴权