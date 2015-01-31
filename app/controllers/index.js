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
            title: "twMovie首页",
            categories: categories
        });
    })
};

// search
exports.search = function(req, res) {
    var catId = req.query.cat;
    var page = req.query.p;
    var count = 3;
    var index = page * count;

    Category.find({
        _id: catId
    }).populate({
        path: 'movies',
        select:'title poster'
    }).exec(function(err, categories) {
        if (err) {
            console.log(err);
        }
        var category = categories[0] || {};
        var movies=category.movies || {};
        var results=movies.slice(index,index+count);

        console.log(movies);
        res.render('results', {
            title: "twMovie结果列表",
            movies: results,
            currentPage: (page - 0 + 1),
            query: 'cat=' + catId,
            totalPage: Math.ceil(movies.length / count),
            keyword: category.name
        });
    })
}