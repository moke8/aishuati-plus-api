const mysql = require('../index')

module.exports = {
    login(userName,password){
        return mysql.query(`select * from user where user_name="${userName}" AND user_password="${password}"`)
    },
}