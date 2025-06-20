var express = require('express');
var router = express.Router();
var db = require('../db')

// GET /api/dogs: returning the list of all dogs
//with their respective name,size and owner's username
router.get('/dogs', async(req, res) => {
    //use try-catch block for error check
    try{
    const [rows] = await db.query(
        `SELECT d.name, d.size,
            u.username
        FROM Dogs d
        JOIN Users u ON d.owner_id = u.user_id
        ORDER BY d.name;
        `
    );
    res.json(rows);
}
    catch(error){
        console.error("Error fetching the list of dogs owned by each owner: ", error);
        //send status code in page and error message
        res.status(500).json({
            message: 'Failed to get list of dogs', error: error.message})
        }
});

module.exports = router;