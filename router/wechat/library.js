const Router = require('koa-router')
const router = new Router();
const libraryCon = require('../../controllers/wechat/library')
router.get("/list", libraryCon.getLibraryList)
router.get("/subject", libraryCon.subject)
router.post("/upSubjectFail", libraryCon.upSubjectFail)
module.exports = router;