const fs = require("fs");
const excel = require("node-xlsx")
const library = require('../../sql/admin/library')

function getFileData(name,path){
    let jsonData = []
    if(/\.xlsx$/.test(name)){
        const sheetList = excel.parse(path)[0].data
        for(let i = 1; i < sheetList.length; i++){
            if(!sheetList[i][0]){
                continue
            }
            jsonData[i-1] = {
                title: sheetList[i][0],
                option: new Array(sheetList[i][1],sheetList[i][2],sheetList[i][3],sheetList[i][4],sheetList[i][5]).filter(t=>t),
                answer: sheetList[i][6],
                analysis: sheetList[i][7]
            }
        }
    }
    else if(/\.json$/.test(name)){
        const result = fs.readFileSync(path)
        jsonData = JSON.parse(result)
    }
    else{
        return false
    }
    return jsonData
}

module.exports = {
    async add(ctx,next){
        const jsonData = getFileData(ctx.request.files.file.name,ctx.request.files.file.path)
        if(!jsonData){
            ctx.body = JSON.stringify({
                code: 500,
                msg: '文件格式不正确'
            })
            return
        }
        const libraryId = await library.add(ctx.data.name,ctx.data.describe)
        library.addSubject(libraryId[0].id,jsonData)
        ctx.body = JSON.stringify({
            msg: '操作成功'
        })
        next()
    },
    async append(ctx,next){
        const jsonData = getFileData(ctx.request.files.file.name,ctx.request.files.file.path)
        console.log(jsonData)
        if(!jsonData){
            ctx.body = JSON.stringify({
                code: 500,
                msg: '文件格式不正确'
            })
            return
        }
        const libraryId = ctx.data.id
        console.log(libraryId)
        library.addSubject(libraryId,jsonData)
        ctx.body = JSON.stringify({
            msg: '操作成功'
        })
        next()
    },
    async list(ctx,next){
        if(!ctx.userId){
            ctx.body = JSON.stringify({
                msg: '请登录后操作',
                code: 500
            })
            return 
        }
        const data = await library.list()
        ctx.write({
            msg: 'success',
            data
        })
        next()
    },
    async set(ctx,next){
        await library.set(ctx.data.id,ctx.data.title,ctx.data.descr)
        ctx.write({
            msg: 'success',
        })
        await next()
    },
    async del(ctx,next){
        const data = await library.del(ctx.data.id)
        ctx.write({
            msg: 'success',
            data
        })
        next()
    },
    async setStar(ctx,next){
        await library.setStar(ctx.data.id,ctx.data.isStar)
        ctx.write({
            msg: 'success',
        })
        await next()
    },
    async delSubject(ctx,next){
        await library.delSubject(ctx.data.id)
        ctx.write({
            msg: 'success',
        })
        await next()
    },
    async getSubject(ctx,next){
        const result = await library.getSubject(ctx.params.title || '',ctx.params.id || '')
        ctx.write(result)
        await next()
    },
    async setSubject(ctx,next){
        await library.setSubject(ctx.data.id,ctx.data.title,ctx.data.options,ctx.data.answer,ctx.data.analysis)
        ctx.write({
            msg: 'success',
        })
        await next()
    }
}