const mysql = require('mysql2/promise');



let connection;

(async () => {
    try {
        //connect to mysql without specifying a database
        const connection = await mysql.getConnection({
            
        })

    }
})