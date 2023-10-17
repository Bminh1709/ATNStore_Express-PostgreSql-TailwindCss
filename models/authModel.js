const db = require('../databasebg'); 

const auth = {
    isShopExist: async function (username, password) {
        const query = await db.query('SELECT * FROM shop WHERE username = $1 AND password = $2', [username, password]);
        if (query.rowCount == 1)
        {
            return query.rows[0]['shopid'];
        }
        return false;
    },
    isUserExist: async function (username, password) {
        const query = await db.query('SELECT * FROM users U LEFT JOIN role R ON U.role_id = R.roleid WHERE username = $1 AND password = $2', [username, password]);
        if (query.rowCount == 1)
        {
            return query.rows[0];
        }
        return false;
    }
}

module.exports = auth;