var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var {exposeAppRoutes} = require('./controllers/routes')
var {setupSwaggerDocumentation} = require('./swagger/swaggerUiGenerator')

const session = require('express-session')

const mongooseConfig = require('./config/db-config')
const mongoose = require('mongoose')

mongoose.connect(mongooseConfig.url, { useCreateIndex: true, useNewUrlParser: true });
mongoose.connection.on("error", err => {
    console.error("MongoDB connection error: " + err);
    process.exit(-1);
});

var app = express();

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

setupSwaggerDocumentation(app)

exposeAppRoutes('/app', app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({ok: false, message:'Not found'});
});

module.exports = app;
