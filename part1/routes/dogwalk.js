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

    }
});

//GET /api/walkers/summary-
// this helps in returning summary of all walkers with average rating and
// no. of completed walks

//there is no average_rating and total_rating, instead we can keep count of the rating_id
//count(rating_id) will count how many times a walker was rated by owner
//as total_ratings and
//AVG(rating) - this find average of all ratings for each walker

router.get('/walkers/summary', async(req, res) => {
    try{
        const [rows] = await db.query(`
        SELECT u.username AS walker_username,
                COUNT(wr.rating_id) AS total_ratings,
                ROUND(AVG(wr.rating), 1) AS average_rating,
                (
                    SELECT COUNT(*)
                    FROM WalkRequests wrs
                    JOIN WalkApplications wa ON wrs.request_id = wa.request_id
                    WHERE wa.walker_id = u.user_id
                    AND wr.status = 'completed'
                    AND wa.status = 'accepted' -- Making sure completed walks includes completed
                    -- status from WalkRequestsand accepted status from WalkApplications
                ) AS completed_walks
                FROM Users u
                LEFT JOIN WalkRatings wr ON u.user_id = wr.walker_id
                WHERE u.role = 'walker'
                GROUP BY u.user_id
        `);
        res.json(rows);

    }
    catch(error){
        console.error("Error in returning summary of each walker ", error);
        res.status(500).json({
            error: 'Failed to fetch the summary of each walker with their average rating and number of completed walks. '});

    }
});

module.exports = router;