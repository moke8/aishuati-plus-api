const Router = require('koa-router')
const router = new Router();
const userCon = require('../../controllers/admin/user')
router.post("/login", userCon.login)
module.exports = router;