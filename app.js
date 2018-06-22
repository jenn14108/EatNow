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
  //Set up needed variables in order to do authentication
  //GoogleStrategy = require('passport-google-oauth').OAuth25Strategy; --> in cofig/passport.js
  session = require('express-session');
  passport = require('passport');
  configPassport = require('./config/passport');
  configPassport(passport);

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

//CODE FOR AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', mainPageRouter);
app.use('/about', aboutRouter);
//app.use('/search', searchRouter);
//app.use('/signUp', signUpRouter);


//Authentication routes
app.get('/loginerror', function(req,res){
  res.render('loginerror',{})
})
app.get('/login', function(req,res){
  res.render('login',{})
})
// route for logging out
app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
//This rout is visited to start the google authentication. Passport will send you to
//Google to get authenticated. Then, it will send the browser back to /login/authorized page
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));


app.get('/login/authorized',
        passport.authenticate('google', {
                successRedirect : '/',
                failureRedirect : '/loginerror'
        }));


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
