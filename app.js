const
  createError = require('http-errors');
  express = require('express');
  path = require('path');
  cookieParser = require('cookie-parser');
  logger = require('morgan');
  bodyParser = require('body-parser');
  connect = require('connect');
  resultsController = require('./controllers/resultsController');
  mainPageRouter = require('./routes/mainPage');
  searchPageRouter = require('./routes/search');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', mainPageRouter);
app.post('/yelpFindRestaurant' , resultsController.yelpFindRestaurant,
                                resultsController.renderMain);
app.use('/search', searchPageRouter);


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
