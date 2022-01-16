const user = require('../../sql/admin/user')
const jwt = require('jsonwebtoken')
module.exports = {
    async login(ctx,next){
        const userData = await user.login(ctx.data.userName,ctx.data.password)
        if(userData.length === 0){
            ctx.write({
                msg: '用户名或密码不正确',
                code: 500
            })
            return
        }
        ctx.write({
            msg: 'success',
            token: jwt.sign({ userId: userData[0].user_id }, 'admin', { expiresIn: '4h' }),
            userId: userData[0].user_id
        })
        next()
    },
}