const mysql = require('../index')

module.exports = {
    addVisitRecord(userId){
        return mysql.query(`INSERT INTO visit_record (wechat_id) VALUES (${userId})`)
    }
}