const {Client} = require('pg')

const client = new Client({
    connectionString: 'postgres://atn_user:6TQrd8ITsFjFabZ7DwcZmA1K8lGrvJ7x@dpg-ckoin4s1tcps7394563g-a.oregon-postgres.render.com/atn?ssl=true',
});

client.connect();
module.exports = client;
