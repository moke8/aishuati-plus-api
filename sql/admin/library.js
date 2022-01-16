const { del } = require('../../router')
const mysql = require('../index')

module.exports = {
    list(){
        return mysql.query(`select *, (SELECT count(*) FROM visit_library_record WHERE library_id = library.id) as count, (SELECT count(*) FROM visit_library_record WHERE library_id = library.id and DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(visit_time)) as sevenCount, (SELECT count(*) FROM visit_library_record WHERE library_id = library.id and DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= date(visit_time)) as monthCount from library  order by order_num desc, monthCount desc, id`)
    },
    add(title,desc){
        mysql.query(`INSERT INTO library (title,descr) VALUES ("${title}","${desc}")`)
        return mysql.query("SELECT LAST_INSERT_ID() as id")
    },
    addSubject(libraryId,data){
        let sql = "INSERT INTO subject (library_id,title,opt,answer,analysis) VALUES "
        data.forEach(item=>{
            sql+= ` (${libraryId},${mysql.connection.escape(item.title)},${mysql.connection.escape(JSON.stringify(item.option))},${mysql.connection.escape(item.answer)},${mysql.connection.escape(item.analysis)}), `
        })
        sql = sql.slice(0, sql.length - 2)
        return mysql.query(sql)
    },
    del(libraryId){
        return mysql.query(`DELETE from library WHERE id = ${libraryId}`)
    },
    set(id,title,descr){
        return mysql.query(`UPDATE \`library\` SET title=${mysql.connection.escape(title)},descr=${mysql.connection.escape(descr)} where id=${id}`)
    },
    setStar(libraryId,star){
        return mysql.query(`UPDATE library set order_num = ${star} WHERE id = ${libraryId}`)
    },
    getSubject(title,libraryId){
        return mysql.query('select `subject`.*, library.title as library_name, (SELECT count(*) FROM subject_fail WHERE subject_id = subject.id) as count from subject LEFT JOIN library on library_id = library.id WHERE library_id = '+ (libraryId || 'library_id') +' and `subject`.title like "%'+title+'%" ORDER BY library_id')
    },
    setSubject(id,title,option,answer,analysis){
        return mysql.query(`UPDATE \`subject\` SET title=${mysql.connection.escape(title)},opt=${mysql.connection.escape(JSON.stringify(option))},answer=${mysql.connection.escape(answer)},analysis=${mysql.connection.escape(analysis)} where id=${id}`)
    },
    delSubject(id){
        return mysql.query(`DELETE FROM \`subject\` WHERE id = ${id}`)
    }
}
