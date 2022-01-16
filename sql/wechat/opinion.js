const mysql = require('../index')

module.exports = {
    add(userId,contact,content){
        return mysql.query(`INSERT INTO opinion (wechat_id,content,contact) VALUES (${userId},"${content}","${contact}")`)
        // return mysql.query(`select *, (SELECT count(*) FROM visit_library_record WHERE library_id = library.id and DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= date(visit_time)) as monthCount from library  order by order_num desc, monthCount desc`)
    },
    export(userId,subjectId,libraryId,contact,content){
        return mysql.query(`INSERT INTO opinion (wechat_id,subject_id,library_id,content,contact) VALUES (${userId},${subjectId},${libraryId},"${content}","${contact}")`)
        // return mysql.query(`select *, (SELECT count(*) FROM visit_library_record WHERE library_id = library.id and DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= date(visit_time)) as monthCount from library  order by order_num desc, monthCount desc`)
    },
}