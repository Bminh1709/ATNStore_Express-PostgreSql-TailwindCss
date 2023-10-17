const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "minh",
    database: "atnstore"
});

client.connect();
module.exports = client;
