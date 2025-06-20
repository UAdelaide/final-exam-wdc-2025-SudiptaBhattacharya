var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('../db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//add new route path for dogs and dogs walk requests
var dogWalkROuter = require('./routes/dogwalk');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//mount dogs and requests route
app.use('/api', dogWalkROuter);

module.exports = app;
