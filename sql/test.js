const mysql = require('./index')

module.exports = {
    testShowTable(){
        return mysql.query('show tables')
    }
}