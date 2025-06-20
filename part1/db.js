const mysql = require('mysql2/promise');



let connection;

(async () => {
    try {


        const connection = await mysql.getConnection();
        console.log('Successfully connected to the database: DogWalkService');
        connection.
    }
})