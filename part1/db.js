const mysql = require('mysql2/promise');

let connection;

const pool = mysql.createPool({


            host: 'localhost',
            user: 'root',
            password: '',
            database: 'DogWalkService'
        });
        console.log('Connected to MySQL database!');
