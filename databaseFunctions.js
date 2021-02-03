const roleinfo = require('./roledescs.js');

const initFunctions = (conn) => {

    const actions = {
        checkLogin: (guid) => {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT COUNT(*) AS guidCount FROM whitelist WHERE guid = ?'
                conn.query(sql, [guid], (err, result, fields) => {
                    if (err) throw err
                    if (result === undefined) {
                        reject(new Error('Veritabanindan geri donus alinamadi'))
                    } else {
                        resolve(result)
                    }
                })
            })
        },
        checkIfRoleAvailable: (roleCode) => {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT isAvailable AS isAvailable FROM roles WHERE roleid = ?'
                conn.query(sql, [roleCode], (err, result, fields) => {
                    if (err) throw err
                    if (result === undefined) {
                        reject(new Error('Veritabanindan geri donus alinamadi'))
                    } else {
                        resolve(result)
                    }
                })
            })

        },
        checkApplicationCount: (guid) => {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT COUNT(*) AS appCount FROM website_roleregister WHERE guid = ?'
                conn.query(sql, [guid], (err, result, fields) => {
                    if (err) throw err
                    if (result === undefined) {
                        reject(new Error('Veritabanindan geri donus alinamadi'))
                    } else {
                        resolve(result)
                    }
                })
            })

        },
        registerRole: (guid, icNick, dcNick, roleCode) => {
            return new Promise((resolve, reject) => {
                const roleName = roleinfo.roleNames[roleCode]
                const sql = 'INSERT INTO website_roleregister (guid, ic_nick, dc_nick, role_code, role_name) VALUES (?, ?, ?, ?, ?)'
                conn.query(sql, [guid, icNick, dcNick, roleCode, roleName], (err, result, fields) => {
                    if (err) throw err
                    resolve()
                })
            })

        },
        checkIfUserBanned: (guid) => {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT is_banned FROM website_bannedUsers WHERE guid = ?'
                conn.query(sql, [guid], (err, result, fields) => {
                    if (err) throw err
                    if (result === undefined) {
                        reject(new Error('Veritabanindan geri donus alinamadi'))
                    } else {
                        resolve(result)
                    }
                })
            })

        },
        saveToBanlist: (guid) => {
            return new Promise((resolve, reject) => {
                const sql = 'INSERT INTO website_bannedUsers (guid) VALUES (?)'
                conn.query(sql, [guid], (err, result, fields) => {
                    if (err) throw err
                    resolve()
                })
            })

        },
        checkIfExistInBanlist: (guid) => {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT COUNT(*) AS isExist FROM website_bannedUsers WHERE guid = ?'
                conn.query(sql, [guid], (err, result, fields) => {
                    if (err) throw err
                    if (result === undefined) {
                        reject(new Error('Veritabanindan geri donus alinamadi'))
                    } else {
                        resolve(result)
                    }
                })
            })

        }
    }
    return actions
}

module.exports = { initFunctions }