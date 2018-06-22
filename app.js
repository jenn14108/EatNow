const
  createError = require('http-errors');
  express = require('express');
  path = require('path');
  cookieParser = require('cookie-parser');
  logger = require('morgan');
  userInfoController = require('./controllers/userInfoController');
  searchHistoryController = require('./controllers/searchHistoryController');
  mongoose = require( 'mongoose');

  mainPageRouter = require('./routes/mainPage');
  aboutRouter = require('./routes/about');
//searchRouter = require('./routes/search');
  //signUpRouter = require('./routes/signUp');

var app = express();


//connect to database
mongoose.connect( 'mongodb://localhost/EatNow')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!")
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', mainPageRouter);
app.use('/about', aboutRouter);
//app.use('/search', searchRouter);
//app.use('/signUp', signUpRouter);

//routing for the page that stores user information into the database
app.get('/signUp', userInfoController.getAllUserInfo);
app.post('/saveUserInfo', userInfoController.saveUserInfo);
app.post('/deleteUserInfo', userInfoController.deleteUserInfo);

//routing for the page that stores search terms into the database
//no need for deletion because we want to keep search history
app.get('/search', searchHistoryController.getAllSearchTerms);
app.post('/saveSearchTerm', searchHistoryController.saveSearchTerm);

app.use('/', function(req, res, next) {
  console.log("in / controller")
  res.render('signUp', { title: 'Sign Up' });
});


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
