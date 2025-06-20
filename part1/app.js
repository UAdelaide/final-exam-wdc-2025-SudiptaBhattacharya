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
              ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
              ('carol123', 'carol@example.com', 'hashed789', 'owner'),
              ('reet120', 'reet@example.com', 'hashed200', 'walker'),
              ('alex999', 'alex@example.com', 'hashed550', 'walker')
          `);

          const [dogRows] = await db.query('SELECT COUNT(*) AS count FROM Dogs');
          if (dogRows[0].count === 0) {
            await db.query(`
              INSERT INTO Dogs (owner_id, name, size)
              VALUES
                (1, 'Max', 'medium'),
                (3, 'Bella', 'small'),
                (1, 'Mylo', 'small'),
                (3, 'Teddy', 'large'),
                (3, 'Becky', 'medium')
            `);
          }


      await db.query('SELECT COUNT(*) AS count FROM Users'
        INSERT IGNORE INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
        VALUES
          (1, '2025-06-10 08:00:00', 30, 'Parklands', 'open'),
          (2, '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted'),
          (3, '2025-06-11 10:00:00', 25, 'Botanic Park', 'completed'),
          (5, '2025-06-12 14:00:00', 60, 'BedFord Park', 'cancelled'),
          (4, '2025-06-13 16:00:00', 20, 'HindMarsh Square', 'open');
      `);

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
