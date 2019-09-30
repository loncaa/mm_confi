var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var {connectRoutes} = require('./src/controllers/routes')

const session = require('express-session')

const mongooseConfig = require('./src/config/db-config')
const mongoose = require('mongoose')

mongoose.connect(mongooseConfig.url, { useCreateIndex: true, useNewUrlParser: true });
mongoose.connection.on("error", err => {
    console.error("MongoDB connection error: " + err);
    process.exit(-1);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//setup session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false
}))

connectRoutes('/app', app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
