const opinion = require('../../sql/wechat/opinion')
module.exports = {
    async addOpinion(ctx){
        const data = await opinion.add(ctx.userId,ctx.data.contact,ctx.data.content)
        ctx.write(data)
    },
    async addExport(ctx){
        console.log('export')
        const data = await opinion.export(ctx.userId,ctx.data.subjectId,ctx.data.libraryId,ctx.data.contact,ctx.data.content)
        ctx.write(data)
    },
}