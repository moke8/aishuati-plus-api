const library = require('../../sql/wechat/library')
module.exports = {
    async getLibraryList(ctx){
        const data = await library.list()
        ctx.write(data)
    },
    async subject(ctx){
        const data = await library.subjectList(ctx.params.id,ctx.params.searchText)
        ctx.write(data)
        library.addVisitLibraryRecord(ctx.userId,ctx.params.id)
    },
    async upSubjectFail(ctx){
        library.upSubjectFail((ctx.userId || ''),ctx.data.id)
        ctx.write({
            msg: 'success'
        })
    }
}