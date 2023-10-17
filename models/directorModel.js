const db = require('../databasebg'); 

const admin = {
    getShops: async function () {
        const query = await db.query('SELECT * FROM shop');
        return query.rows;
    },
    getToys: async function () {
        const query = await db.query('SELECT * FROM toy LEFT JOIN category ON toy.category_id = category.categoryid');
        return query.rows;
    },
    getToysByShop: async function (shopId) {
        const query = await db.query('SELECT * FROM toy LEFT JOIN category ON toy.category_id = category.categoryid WHERE shop_id = $1',[shopId]);
        return query.rows;
    }
}

module.exports = admin;