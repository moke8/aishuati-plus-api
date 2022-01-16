const mysql = require('../index')

module.exports = {
    getUserInfo(openid){
        return mysql.query(`select * from wechat_user where xcx_openid="${openid}"`)
    },
    register(data){
        return mysql.query(`INSERT INTO wechat_user (xcx_openid, xcx_nickname, xcx_avatar, xcx_sex) VALUES ("${data.openid}","${data.nickname}","${data.avatar}",${data.sex})`)
    }
}