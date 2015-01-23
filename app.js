var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var Movie = require('./models/movie.js');
var _ = require('underscore');
var port = process.env.PORT || 3000;
var app = express();
mongoose.connect('mongodb://localhost:27017/twMovie');
app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true, saveUninitialized: true, secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'bower_components')));
app.listen(port);
console.log('server has started on port' + port);

//index page
app.get('/', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('index', {
            title: "首页",
            movies: movies
        });
    });

});

//detail page
app.get('/movie/:id', function (req, res) {
    var id = req.param.id;
    Movie.findById(id, function (err, movie) {
        res.render('detail', {
            title: "twMovie" + movie.title,
            movie: movie
        });
    });
});

//admin page
app.get('/admin/movie', function (req, res) {
    res.render('admin', {
        title: "后台录入页",
        movie: {
            doctor: '',
            country: '',
            title: '',
            poster: '',
            language: '',
            flash: '',
            year: '',
            summary: ''
        }
    })
});
//admin movie update
app.get('admin/movie/:id',function(req,res){
    var id=req.param.id;
    if(id){
        Movie.findById(id,function(err,movie){
            res.render('admin',{
                title:'twMovie列表页',
                movie:movie
            })
        })
    }
});

//new page  admin post movie
app.post('/admin/movie/new', function (res, req) {
    var id = req.body.movie._id;
    var movie = req.body.movie;
    var _movie;
    if (id == 'undefined') {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }
            _movie = _.extend(movie, movieObj);
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/movie/' + movie._id);
            })
        })
    } else {
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            year: movieObj.year,
            country: movieObj.country,
            language: movieObj.language,
            summary: movieObj.summary,
            poster: movieObj.poster,
            flash: movieObj.flash
        });
        _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
            }
            res.redirect('/movie/' + movie._id);
        })
    }
})


//list page
app.get('/admin/list', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: "列表页",
            movies: movies

        });
    });

});