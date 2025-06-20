const mysql = require('mysql2/promise');

let connection;

async function initializeDb() {
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

            //inserting data if empty
            const insertStatements =
            `INSERT INTO Users (username, email, password_hash, role) VALUES
            ('eve_owner', 'eve@example.com', 'secretpass2', 'owner');

            INSERT INTO Dogs (owner_id, name, size) VALUES
            ((SELECT user_id FROM Users WHERE username = 'eve_owner'), 'Charlie', 'large');

            INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
                ((SELECT dog_id FROM Dogs WHERE name = 'Charlie'
                AND owner_id = (SELECT user_id FROM Users WHERE username = 'eve_owner')), '2025-06-11 14:00:00', 60, 'City Central Park', 'open');

        `;
        await connection.query(insertStatements);
        console.log('Initial data inserted successfully!');

    }
    catch (err) {
        console.error('Failed to connect or insert initial data:', err);
        // Exit the process if database initialization fails
        process.exit(1);
    }
}

}