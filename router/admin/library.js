const Router = require('koa-router')
const router = new Router();
const libraryCon = require('../../controllers/admin/library')
router.post("/add", libraryCon.add)
router.post("/append", libraryCon.append)
router.post("/excelAdd", libraryCon.add)
router.post("/del", libraryCon.del)
router.post("/set", libraryCon.set)
router.get("/list", libraryCon.list)
router.post("/star", libraryCon.setStar)
router.get("/getSubject", libraryCon.getSubject)
router.post("/setSubject", libraryCon.setSubject)
router.post("/delSubject", libraryCon.delSubject)
module.exports = router;