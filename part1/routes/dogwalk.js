var express = require('express');
var router = Router();
var db = require('./db')

// GET /api/dogs: returning the list of all dogs
//with their respective name,size and owner's username
router.get('/api/dogs', async(req, res) => {
    const [rows] = await db.query(
        `SELECT d.name, d.size,
            u.owner_username
        FROM Dogs d
        JOIN Users u ON d.owner_id = u.user_id
        ORDER BY d.name`
    )
})

module.exports = router;