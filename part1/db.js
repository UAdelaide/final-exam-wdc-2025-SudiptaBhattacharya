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

         // Check if the Users table already contains data
         const [rows] = await connection.execute('SELECT COUNT(*) AS count FROM Users');
         if (rows[0].count === 0) {
            console.log('Users table is empty. Inserting initial data...');

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
