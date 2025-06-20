const mysql = require('mysql2/promise');

let connection;

(async function initializeDb() {
    try {
        //connect to mysql without specifying a database
         connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'DogWalkService'
        });
        console.log('Connected to MySQL database!');
        // SQL INSERT statements from the previous interaction
        const insertStatements =
        `INSERT INTO Users (username, email, password_hash, role) VALUES
        ('eve_owner', 'eve@example.com', 'secretpass2', 'owner');

        INSERT INTO Dogs (owner_id, name, size) VALUES
        ((SELECT user_id FROM Users WHERE username = 'eve_owner'), 'Charlie', 'large');



        `;
        await connection.query(insertStatements);
        console.log('Initial data inserted successfully!');

    }
    catch (err) {
        console.error('Failed to connect or insert initial data:', err);
        // Exit the process if database initialization fails
        process.exit(1);
    }
})
