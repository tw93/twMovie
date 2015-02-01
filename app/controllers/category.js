var Category = require('../models/category.js');
var _ = require('underscore');

//admin page
exports.new = function(req, res) {
    res.render('category_admin', {
        title: "类别录入页",
        category: {
            name: ''
        }
    })
};
//admin movie update
exports.update = function(req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
            res.render('admin', {
                title: "更新：" + movie.title,
                movie: movie
            });
        });
    }
};

//new page  admin post category
exports.save = function(req, res) {
    var id = req.body.category._id;
    var categoryObj = req.body.category;
    var _category;
    if (id !== 'undefined') {
        Category.findById(id, function(err, category) {
            if (err) {
                console.log(err);
            }
            _category = _.extend(category, categoryObj);
            _category.save(function(err, category) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/admin/category/list');
            })
        })
    } else {
        _category = new Category({
            name: categoryObj.name
        });
        _category.save(function(err, movie) {
            if (err) {
                console.log(err);
            }
            res.redirect('/admin/category/list');
        })
    }
};


//list page
exports.list = function(req, res) {
    Category.fetch(function(err, categories) {
        if (err) {
            console.log(err);
        }
        res.render('category_list', {
            title: "电影类别列表页",
            categories: categories
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