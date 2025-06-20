const mysql = require('mysql2/promise');

let connection;

const pool = mysql.createPool({

        //connect to mysql without specifying a database
         connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'DogWalkService'
        });
        console.log('Connected to MySQL database!');
    