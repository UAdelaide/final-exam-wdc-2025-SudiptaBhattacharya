const mysql = require('mysql2/promise');



let connection;

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Successfully connected to the database: DogWalkService');
        connection.
    }
})