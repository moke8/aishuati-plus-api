const mysql = require('mysql');

class Mysql {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '********',
            database: 'koa_test'
        })
        this.connection.connect()
    }
    query(sql) {
        return new Promise((resolve,reject)=>{
            try{
                this.connection.query(sql, function (error, results, fields) {
                    if (error){
                        reject(error)
                        return
                    }
                    resolve(results)
                });
            }catch(e){
                reject()
            }
        })
    }
}

module.exports = new Mysql()