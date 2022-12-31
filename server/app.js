const createError = require('http-errors');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');


const connectdb = require('./config/db');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var logger = require('morgan');
const cors = require('cors');
var config = require('./config');
var passport = require('passport');


var usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');
const events = require('./routes/events');
const auth = require('./routes/auth');

const app = express();

dotenv.config({ path: './config/config.env'});

//db connection 
connectdb();


//passport config
require('./config/passport')(passport);
const url = config.mongoUrl;
const connect = mongoose.connect(url);
connect.then((db) => {
console.log("Connected correctly to server");
}, (err) => { console.log(err); });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cookieParser());

//session 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store : new MongoStore({mongooseConnection: mongoose.connection })
}));  

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.use('/', indexRouter);
app.use('/events', events);
app.use('/auth',auth);


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
        
// listner 
const PORT = process.env.PORT || 5000;
  app.listen(PORT , console.log(`server started on port ${PORT}`));

module.exports = app;
