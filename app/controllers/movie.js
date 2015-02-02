var Movie = require('../models/movie.js');
var Comment = require('../models/comment.js');
var Category = require('../models/category.js');
var _ = require('underscore');
//detail page
exports.detail = function(req, res) {
    var id = req.params.id;
    Movie.update({_id:id},{$inc:{pv:1}},function(err,movie){
        if(err){
            console.log(err);
        }
    })
    Movie.findById(id, function(err, movie) {
        Comment.find({
                movie: id
            })
            .populate('from', 'name')
            .populate('reply.from reply.to', 'name')
            .exec(function(err, comments) {
                console.log(comments);
                res.render('detail', {
                    title: "twMovie" + movie.title,
                    movie: movie,
                    comments: comments,
                    path:req.originalUrl
                });
            })

    });
};

//admin page
exports.new = function(req, res) {
    Category.find({}, function(err, categories) {
        if (err) {
            console.log(err);
        }
        res.render('movie_edit', {
            title: "电影录入页",
            categories: categories,
            movie: {},
            path: req.path
        })
    })
};
//admin movie update
exports.update = function(req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
            Category.fetch(function(err, categories) {
                if (err) {
                    console.log(err);
                }
                res.render('movie_edit', {
                    title: "更新:" + movie.title,
                    movie: movie,
                    categories: categories,
                    path: req.path
                });
            })

        });
    }
};

//new page  admin post movie
exports.save = function(req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if (id) {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err);
            }
            _movie = _.extend(movie, movieObj);
            _movie.save(function(err, movie) {
                if (err) {
                    console.log(err);
                }
                console.log(_movie._id);
                res.redirect('/movie/' + _movie._id);
            })
        })
    } else {
        _movie = new Movie(movieObj);
        _movie.save(function(err, movie) {
            var categoryId = _movie.category;
            Category.findById(categoryId, function(err, category) {
                if (err) {
                    console.log(err);
                }
                category.movies.push(movie._id);
                category.save(function(err, category) {
                    if (err) {
                        console.log(err);
                    }
                    res.redirect('/movie/' + movie._id);
                })
            })

        })
    }
};


//list page
exports.list = function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('movie_list', {
            title: "电影列表页",
            movies: movies,
            path: req.path
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