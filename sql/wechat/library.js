const mysql = require('../index')

module.exports = {
    list(){
        return mysql.query(`select *, (SELECT count(*) FROM visit_library_record WHERE library_id = library.id and DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= date(visit_time)) as monthCount from library  order by monthCount desc`)
        // return mysql.query(`select *, (SELECT count(*) FROM visit_library_record WHERE library_id = library.id and DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= date(visit_time)) as monthCount from library  order by order_num desc, monthCount desc`)
    },
    subjectList(libraryId,search){
        return mysql.query(`select * from subject where library_id=${libraryId}`+ (search ? ` and title like '%${search}%'` :''))
        // return mysql.query(`select *, (SELECT count(*) FROM visit_library_record WHERE library_id = library.id and DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= date(visit_time)) as monthCount from library  order by order_num desc, monthCount desc`)
    },
    addVisitLibraryRecord(userId,libraryId){
        return mysql.query(`INSERT INTO visit_library_record (wechat_id, library_id) VALUES (${userId},${libraryId})`)
    },
    upSubjectFail(userId,subjectId){
        return mysql.query(`INSERT INTO subject_fail(subject_id,wechat_id) VALUES (${subjectId},${userId || 'NULL'})`)
    }
}