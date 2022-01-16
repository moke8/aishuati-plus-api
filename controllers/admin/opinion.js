const opinion = require('../../sql/admin/opinion')
const newDate = require('../../utils/dateformat')
newDate()
module.exports = {
    async list(ctx){
        if(!ctx.userId){
            ctx.body = JSON.stringify({
                msg: '请登录后操作',
                code: 500
            })
            return 
        }
        let data = await opinion.list()
        data = data.map(item=>{
            item.datetime = new Date(item.datetime).Format("yyyy-MM-dd hh:mm:ss")
            return item
        })
        ctx.write({
            msg: 'success',
            data
        })
    }
}