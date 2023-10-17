const db = require('../databasebg'); 

const admin = {
    getUsers: async function () {
        const query = await db.query('SELECT * FROM users WHERE role_id = 3');
        return query.rows;
    },
    getShops: async function () {
        const query = await db.query('SELECT * FROM shop');
        return query.rows;
    }
}

module.exports = admin;