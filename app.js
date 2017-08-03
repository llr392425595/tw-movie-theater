"use strict"
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//sqlite数据库连接
var orm = require('orm')
app.use(orm.express("sqlite:///Users/a/Desktop/Reporsitories/tw_theater/src/tw-movie-theater/data/movies.db",{
  define: function(db, models, next) {
    // 定义model 把数据库的类型映射为node.js的类型，长度、唯一、是否可空等配置将使用数据库中的定义，
      // Node.js的类型有Number、String、Boolean、Date、Object、Buffer和Array。
    models.genre = db.define('genre', {
        id: Number,
        name: String
    }),
    models.movie = db.define('movie', {
        id: Number,
        alt: String,
        year: Number,
        title: String,
        rating: String,
        original_title: String,
        directors: String,
        casts: String,
        image: String
    });
    models.movieGenre = db.define('movie_genre', {
        id: Number,
        movie_id: Number,
        genre_id: Number
    });
    next()
  }
}
))

//app.use('/', index);
//app.use('/users', users);
var test = require('./routes/test')

var movie = require('./routes/movie')

var urlrouter = require('urlrouter')

var router = urlrouter(function(app) {
  "use strict";
    app.get('/test1', test.testUrl2)
    app.get('/test/:title', test.testUrl)
    //根据姓名获取数据列表
    app.get('/movies/:title', movie.searchByName)
    app.get('/movies/category/:genre_id', movie.category)

})
app.use(router)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
