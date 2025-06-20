const mysql = require('mysql2/promise');



let connection;

(async () => {
    try {
        //connect to mysql without specifying a database
         connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'DogWalkService'
        })
        console.log('Connected to MySQL database!');
        // SQL INSERT statements from the previous interaction
        const insertStatements =
        `INSERT INTO Users (username, email, password_hash, role) VALUES`
        ('eve_owner', 'eve@example.com', 'secretpass2', 'owner');

        

    }
})