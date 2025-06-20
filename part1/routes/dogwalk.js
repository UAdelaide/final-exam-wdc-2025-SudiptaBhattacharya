var express = require('express');
var router = express.Router();
var db = require('../db')

// GET /api/dogs: returning the list of all dogs
//with their respective name,size and owner's username
router.get('/dogs', async(req, res) => {
    //use try-catch block for error check
    try{
    const [rows] = await db.query(
        `SELECT d.name AS dog_name, d.size,
            u.username AS owner_username
        FROM Dogs d
        JOIN Users u ON d.owner_id = u.user_id

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

//GET /api/walkrequests/open -
// this helps in returning all walk requests currently open
//json data includes dog name, request time, location and owner's username

router.get('/walkrequests/open', async(req, res) => {
    try{
        const [rows] = await db.query(`
        Select wrs.request_id, d.name AS dog_name,
            wrs.requested_time, wrs.duration_minutes,
            wrs.location,
            u.username AS owner_username
        From WalkRequests wrs
        JOIN Dogs d ON wrs.dog_id = d.dog_id
        JOIN Users u ON d.owner_id = u.user_id
        WHERE wrs.status = 'open'
        `);
        res.json(rows);

    }
    catch(error){
        console.error("Error in returning open walk requests available", error);
        res.status(500).json({
            error: 'Failed to fetch the open walk requests'});
        })

    }
})

module.exports = router;