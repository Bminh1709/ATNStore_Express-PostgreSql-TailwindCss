var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var exphbs = require('express-handlebars'); 

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var shopRouter = require('./routes/shop');
var accessRouter = require('./routes/access');
var userRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var directorRouter = require('./routes/director');

var app = express();

// view engine setup
app.engine('.hbs', exphbs.engine({ 
  extname: '.hbs',
  defaultLayout: "layout",
  layoutsDir: path.join(__dirname, 'views/layouts'),
  helpers: {
    eq: function (v1, v2) {
      return v1 === v2;
    }
  },
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
  },
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'buiminh', // Change this to a strong, random value
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/', indexRouter);
app.use('/shop', shopRouter);
app.use('/about', aboutRouter);
app.use('/access', accessRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/director', directorRouter);


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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`);
});

module.exports = app;
