const Router = require('koa-router')
const router = new Router();
const wechatCon = require('../../controllers/admin/wechat')
router.get("/user", wechatCon.user)
module.exports = router;