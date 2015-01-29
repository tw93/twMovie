var Movie = require('../models/movie.js');
var Comment = require('../models/comment.js');
var _ = require('underscore');
//detail page
exports.detail = function(req, res) {
    var id = req.params.id;
    Movie.findById(id, function(err, movie) {
        Comment.find({
                movie: id
            })
            .populate('from', 'name')
            .exec(function(err, comments) {
                console.log(comments);
                res.render('detail', {
                    title: "twMovie" + movie.title,
                    movie: movie,
                    comments: comments
                });
            })

    });
};

//admin page
exports.new = function(req, res) {
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
};
//admin movie update
exports.update = function(req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
            res.render('admin', {
                title: "twMovie更新" + movie.title,
                movie: movie
            });
        });
    }
};

//new page  admin post movie
exports.save = function(req, res) {
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
};


//list page
exports.list = function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: "twMovie列表页",
            movies: movies
        });
    });

};

//list delete movie
exports.del = function(req, res) {
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
};