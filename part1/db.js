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
        //create if not exists


    }
})