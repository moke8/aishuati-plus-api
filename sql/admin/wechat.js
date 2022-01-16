const mysql = require('../index')

module.exports = {
    user(){
        return mysql.query(`select *, (SELECT count(*) FROM visit_record WHERE wechat_id = wechat_user.id) as count, (SELECT count(*) FROM visit_record WHERE wechat_id = wechat_user.id and DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(visit_time)) as sevenCount, (SELECT count(*) FROM visit_record WHERE wechat_id = wechat_user.id and DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= date(visit_time)) as monthCount from wechat_user`)
    },
}