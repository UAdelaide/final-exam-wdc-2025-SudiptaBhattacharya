var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//add new route path for dogs and dogs walk requests
var dogWalkRouter = require('./routes/dogwalk');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//mount dogs and requests route
app.use('/api', dogWalkRouter);

const insertSampleData = async () => {
    try {
        const [userRows] = await db.query('SELECT COUNT(*) AS count FROM Users');
        if (userRows[0].count === 0) {
          await db.query(`
            INSERT INTO Users (username, email, password_hash, role)
            VALUES
              ('alice123', 'alice@example.com', 'hashed123', 'owner'),

          `);
        }

          const [dogRows] = await db.query('SELECT COUNT(*) AS count FROM Dogs');
          if (dogRows[0].count === 0) {
            await db.query(`
              INSERT INTO Dogs (owner_id, name, size)
              VALUES
                (1, 'Max', 'medium'),

            `);
          }


      const [walkRequestRows] = await db.query('SELECT COUNT(*) AS count FROM WalkRequests');
          if (walkRequestRows[0].count == 0) {
            await db.query(`
            INSERT IGNORE INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
        VALUES
          (1, '2025-06-10 08:00:00', 30, 'Parklands', 'open'),

            `);
          }

        //insert 
      console.log('Sample data inserted.');

    } catch (err) {
      console.error('Error inserting sample data:', err);
    }
  };

  app.listen(3000, async () => {
    await insertSampleData();
    console.log(`Server running on http://localhost:3000}`);
  });

module.exports = app;
