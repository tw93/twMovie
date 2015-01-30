//index page
var Movie = require('../models/movie.js');
var Category = require('../models/category.js');
exports.index = function(req, res) {
    Category.find({}).populate({path: 'movies', options: {
        limit: 5
    }}).exec(function(err, categories) {
        if (err) {
            console.log(err);
        }

        res.render('index', {
            title: "twMovie首页",
            categories: categories
        });
    })
}