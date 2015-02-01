//index page
var Movie = require('../models/movie.js');
var Category = require('../models/category.js');
exports.index = function(req, res) {
    Category.find({}).populate({
        path: 'movies',
        options: {
            limit: 6
        }
    }).exec(function(err, categories) {
        if (err) {
            console.log(err);
        }

        res.render('index', {
            title: "twMovie",
            categories: categories
        });
    })
};

// search
exports.search = function(req, res) {
    var catId = req.query.cat;
    var page = parseInt(req.query.p, 10) || 0;
    var count = 3;
    var index = page * count;
    var q = req.query.q;
    if (catId) {
        Category.find({
            _id: catId
        }).populate({
            path: 'movies',
            select: 'title poster'
        }).exec(function(err, categories) {
            if (err) {
                console.log(err);
            }
            var category = categories[0] || {};
            var movies = category.movies || {};
            var results = movies.slice(index, index + count);

            console.log(movies);
            res.render('results', {
                title: "结果列表",
                movies: results,
                currentPage: (page - 0 + 1),
                query: 'cat=' + catId,
                totalPage: Math.ceil(movies.length / count),
                keyword: category.name
            });
        })
    } else {
        Movie.find({
                title: new RegExp(q + '.*', 'i')
            })
            .exec(function(err, movies) {
                if (err) {
                    console.log(err);
                }
                var results = movies.slice(index, index + count);
                console.log(results);
                res.render('results', {
                    title: "结果列表",
                    movies: results,
                    currentPage: (page + 1),
                    query: 'q=' + q,
                    totalPage: Math.ceil(movies.length / count),
                    keyword: q
                });
            })
    }
}