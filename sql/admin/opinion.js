const mysql = require('../index')

module.exports = {
    list(){
        return mysql.query('select *, (select title from `subject` where id = opinion.subject_id)  as subject_title, (select title from library where id = opinion.library_id)  as library_title from opinion')
    },
}
