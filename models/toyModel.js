const db = require('../databasebg'); 

const toy = {
    getCategories: async function () {
        const query = await db.query('SELECT * FROM category');
        return query.rows;
    },
    getToys: async function (shopId) {
        const query = await db.query('SELECT * FROM toy LEFT JOIN category on category.categoryid = toy.category_id WHERE shop_id = $1', [shopId]);
        return query.rows;
    },
    getToysWithFilter: async function (filter, category) {
        let query;
        if (category) {
            query = await db.query('SELECT * FROM toy LEFT JOIN category on category.categoryid = toy.category_id WHERE (toyname ILIKE $1 OR description ILIKE $1) AND category.categoryid = $2', [`%${filter}%`, category]);
        } else {
            query = await db.query('SELECT * FROM toy LEFT JOIN category on category.categoryid = toy.category_id WHERE toyname ILIKE $1 OR description ILIKE $1', [`%${filter}%`]);
        }
        return query.rows;
    },
    getToy: async function (toyid) {
        const query = await db.query('SELECT * FROM toy WHERE toyid = $1', [toyid]);
        return query.rows[0];
    },
    getToyImg: async function (toyid) {
        const query = await db.query('SELECT * FROM toy WHERE toyid = $1', [toyid]);
        return query.rows[0]['image'];
    },
    addToy: async function (toy, image, shopId) {
        const query = await db.query('INSERT INTO toy (toyname, price, origin, description, category_id, image, shop_id) VALUES ($1, $2, $3, $4, $5, $6, $7);', [toy.toyname, toy.price, toy.origin, toy.description, toy.category_id, image, shopId]);
        if (query.rowCount > 0) return true;
        else return false;
    },
    deleteToy: async function (toyid) {
        const query = await db.query('DELETE FROM toy WHERE toyid = $1', [toyid]);
        if (query.rowCount > 0) return true;
        else return false;
    },
    updateToyWImg: async function (toy, image) {
        const query = await db.query('UPDATE toy SET toyname=$1, price=$2, origin=$3, description=$4, category_id=$5, image=$6 WHERE toyid = $7;', [toy.toyname, toy.price, toy.origin, toy.description, toy.category_id, image, toy.toyid]);
        if (query.rowCount > 0) return true;
        else return false;
    },
    updateToy: async function (toy) {
        const query = await db.query('UPDATE toy SET toyname=$1, price=$2, origin=$3, description=$4, category_id=$5 WHERE toyid = $6;', [toy.toyname, toy.price, toy.origin, toy.description, toy.category_id, toy.toyid]);
        if (query.rowCount > 0) return true;
        else return false;
    },
}

module.exports = toy;