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
        }
    }
    return actions
}

module.exports = { initFunctions }