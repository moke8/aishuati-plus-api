const Router = require('koa-router')
const router = new Router();
const userCon = require('../../controllers/wechat/user')
router.post("/getOpenId", userCon.getOpenId)
router.post("/register", userCon.register)
router.get("/getUserInfo", userCon.getUserInfo)
module.exports = router;