var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv')
const connectDB = require('./config/db')
var passport = require('passport');

// import createError from 'http-errors';
// import express from 'express'
// import path from 'path'
// import cookieParser from 'cookie-parser'
// import logger from 'morgan'
// import connectDB from './config/db.js'
// import dotenv from 'dotenv';

dotenv.config()

connectDB()

//Import the necessary routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


//Initialize passport auth
app.use(passport.initialize());


//Use the imported routes
app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// export default app
module.exports = app
