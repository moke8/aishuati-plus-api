const koa = require('koa')
const jwt = require('jsonwebtoken')
const path = require('path')
const cors = require('koa-cors');
const bodyParser = require('koa-body')
const toHump = require('./utils/toHump')
const KoaStatic = require('koa-static');
const router = require('./router/index')
const global = require('./utils/global')
const app = new koa();



// 接受文件
app.use(bodyParser({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}))
// 将请求内容统一转换
app.use(async (ctx, next) => {
    ctx.params = ctx.request.query
    ctx.data = ctx.request.body
    await next()
})

// 返回键名转驼峰
app.use(toHump)

// 对token验证
app.use(async (ctx, next) => {
    let url = ctx.request.url
    if (/^\/wx/.test(url) && ctx.request.header.authorization) {
        const data = jwt.verify(ctx.request.header.authorization, global.wechat.appId)
        ctx.userId = data.userId
        await next()
    }
    else if (/^\/admin/.test(url)) {
        if(/^\/admin\/user\/login/.test(url)){
            await next()
        }
        else if(ctx.request.header.authorization){
            let err = false
            try{
                const data = jwt.verify(ctx.request.header.authorization, 'admin')
                ctx.userId = data.userId
            }catch(e){
                err = true
                await next()
                ctx.write({
                    code: 302,
                    msg: '您的用户信息已失效'
                })
            }
            if(!err)
                await next()
        }
        else{
            await next()
            ctx.write({
                code: 302,
                msg: '未登录，请登录后重试'
            })
        }
    }
    else{
        await next()
    }
    
})
app.use(cors({
    origin: function (ctx) {
        return "*"; // 允许来自所有域名请求
    },
}))

app.use(router.routes())
app.use(KoaStatic(path.join(__dirname, './static')))


app.listen(3000, () => {
    console.log('应用已经启动，http://localhost:3000');
})