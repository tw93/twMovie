var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Movie = require('./models/movie.js');
var User = require('./models/user.js');
var _ = require('underscore');
var cookieParser=require('cookie-parser');
var expressSession=require('express-session');
var mongoStore=require('connect-mongo')(expressSession);
var port = process.env.PORT || 3000;
var app = express();
var dbUrl='mongodb://localhost/twMovie'
mongoose.connect(dbUrl);
app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(expressSession({
    secret:'tw93',
    store:new mongoStore({
        url:dbUrl,
        collection:'sessions'
    })
}))
app.locals.moment = require('moment');
app.listen(port);
console.log('server has started on port' + port);

//index page
app.get('/', function(req, res) {
    console.log('user for session:');
    console.log(req.session.user);

    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('index', {
            title: "twMovie首页",
            movies: movies
        });
    });

});

//detail page
app.get('/movie/:id', function(req, res) {
    var id = req.params.id;
    Movie.findById(id, function(err, movie) {
        res.render('detail', {
            title: "twMovie" + movie.title,
            movie: movie
        });
    });
});

//admin page
app.get('/admin/movie', function(req, res) {
    res.render('admin', {
        title: "Movie后台录入页",
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
app.get('/admin/update/:id', function(req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
            res.render('admin', {
                title: "twMovie更新" + movie.title,
                movie: movie
            });
        });
    }
});

//new page  admin post movie
app.post('/admin/movie/new', function(req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if (id !== 'undefined') {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err);
            }
            _movie = _.extend(movie, movieObj);
            _movie.save(function(err, movie) {
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
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        });
        _movie.save(function(err, movie) {
            if (err) {
                console.log(err);
            }
            res.redirect('/movie/' + movie._id);
        })
    }
});


//list page
app.get('/admin/list', function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: "twMovie列表页",
            movies: movies
        });
    });

});

//list delete movie
app.delete('/admin/list', function(req, res) {
    var id = req.query.id;
    if (id) {
        Movie.remove({
            _id: id
        }, function(err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    success: 1
                });
            }
        })
    }
});

// user signUp
app.post('/user/signup', function(req, res) {
    var _user = req.body.user;
    User.find({
        name: _user.name
    }, function(err, user) {
        if (err) {
            console.log(err);
        }
        if (user.name=="") {
            res.redirect('/');
        } else {
            var user = new User(_user);
            user.save(function(err, user) {
                if (err) {
                    console.log(err);
                }
                console.log('reg is ok');
            res.redirect('/admin/userlist');
            });
        }
    });

});

//user list page
app.get('/admin/userlist', function(req, res) {
    User.fetch(function(err, users) {
        if (err) {
            console.log(err);
        }
        res.render('userlist', {
            title: "twMovie用户列表",
            users: users
        });
    });

});

//user login
app.post('/user/signin',function(req,res){
    var _user=req.body.user;
    var name=_user.name;
    var password=_user.password;
    User.findOne({name:name},function(err,user) {
        if(err){
            console.log(err);
        }
        if(user.name===''){
            console.log('the user name is not reg');
            return res.redirect('/');
        }
        user.comparePassword(password,function(isMatch){
            if(isMatch){
                req.session.user=user;
                return res.redirect('/');
            }else{
                console.log('the password is not macth');
            }
        })
    })
})