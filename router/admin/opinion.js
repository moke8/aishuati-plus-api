const Router = require('koa-router')
const router = new Router();
const opinionCon = require('../../controllers/admin/opinion')
router.get("/list", opinionCon.list)
module.exports = router;