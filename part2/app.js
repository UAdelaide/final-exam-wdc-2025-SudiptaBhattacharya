const express = require('express');
const path = require('path');
require('dotenv').config();
//add express-session route for session management:
const session = require('express-session');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

//setup session management:
app.use(session({
    secret: process.env.SESSION_SECRET || 'dog-secret',
    resave: false,
    saveUninitialized: false
}));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;