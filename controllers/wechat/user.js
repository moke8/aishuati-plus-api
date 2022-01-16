const user = require('../../sql/wechat/user')
const record = require('../../sql/wechat/record')
const request = require('request')
const global = require('../../utils/global')
const jwt = require('jsonwebtoken')
module.exports = {
    async getOpenId(ctx) {
        const data = ctx.data
        await new Promise(resolve => {
            request({
                method: 'get',
                url: `https://api.weixin.qq.com/sns/jscode2session?appid=${global.wechat.appId}&secret=${global.wechat.secret}&js_code=${data.code}&grant_type=authorization_code`
            }, (error, res, body) => {
                if (error) {
                    ctx.code = 500
                }
                ctx.body = body
                resolve()
            })
        })
    },
    async register(ctx) {
        const data = ctx.data
        const WXBizDataCrypt = require('../../utils/WXBizDataCrypt')
        const pc = new WXBizDataCrypt(global.wechat.appId, data.sessionKey)
        const wxData = pc.decryptData(data.encryptedData, data.iv)
        const userId = await user.register({
            openid: data.openid,
            nickname: wxData.nickName,
            avatar: wxData.avatarUrl,
            sex: wxData.gender
        })
        ctx.body = JSON.stringify({
            userId
        })
    },
    async getUserInfo(ctx, next) {
        const userData = await user.getUserInfo(ctx.params.openid)
        if (!userData.length) {
            ctx.body = JSON.stringify({
                isRegister: false
            })
        }
        else {
            ctx.body = JSON.stringify({
                isRegister: true,
                token: jwt.sign({ userId: userData[0].id }, global.wechat.appId, { expiresIn: '4h' }),
                ...userData[0]
            })
            // 增加访问记录
            record.addVisitRecord(userData[0].id)
        }
        // next()
    }
}