const Router = require('koa-router')
const wxUser = require('./wechat/user')
const wxLibrary = require('./wechat/library')
const wxOpinion = require('./wechat/opinion')
const adminUser = require('./admin/user')
const adminWechat = require('./admin/wechat')
const adminLibrary = require('./admin/library')
const adminOpinion = require('./admin/opinion')
const router = new Router()

router.use('/wx/user',wxUser.routes())
router.use('/wx/library',wxLibrary.routes())
router.use('/wx/opinion',wxOpinion.routes())
router.use('/admin/user',adminUser.routes())
router.use('/admin/wechat',adminWechat.routes())
router.use('/admin/library',adminLibrary.routes())
router.use('/admin/opinion',adminOpinion.routes())

module.exports = router;