const Router = require('koa-router')
const router = new Router();
const opinionCon = require('../../controllers/wechat/opinion')
router.post("/add", opinionCon.addOpinion)
router.post("/export", opinionCon.addExport)
module.exports = router;