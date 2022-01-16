const wechat = require('../../sql/admin/wechat')
module.exports = {
    async user(ctx,next){
        if(!ctx.userId){
            ctx.body = JSON.stringify({
                msg: '请登录后操作',
                code: 500
            })
            return 
        }
        const userData = await wechat.user()
        ctx.write({
            msg: 'success',
            data: userData
        })
        next()
    },
}