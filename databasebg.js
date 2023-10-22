const {Client} = require('pg')

// const client = new Client({
//     host: "localhost",
//     user: "postgres",
//     port: 5432,
//     password: "minh",
//     database: "atnstore"
// });
const client = new Client({
    connectionString: 'postgres://atn_user:6TQrd8ITsFjFabZ7DwcZmA1K8lGrvJ7x@dpg-ckoin4s1tcps7394563g-a/atn?ssl=true',
    ssl: { rejectUnauthorized: false }
});

client.connect()
    .then(() => {
        console.log('Connected to the database successfully!');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });
module.exports = client;
