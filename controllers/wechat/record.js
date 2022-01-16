const record = require('../../sql/wechat/record')
module.exports = {
    async addVisitRecord(ctx){
        await record.addVisitRecord(ctx.userId)
        ctx.body = JSON.stringify({
            msg: 'success'
        })
    },
    async addVisitLibraryRecord(ctx){
        await record.addVisitLibraryRecord(ctx.userId,ctx.body.libraryId)
        ctx.body = JSON.stringify({
            msg: 'success'
        })
    }
}