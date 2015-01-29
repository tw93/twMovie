var Comment = require('../models/comment.js');
var _ = require('underscore');

//comment save
exports.save = function(req, res) {
    var _comment = req.body.comment;
    var comment = new Comment(_comment);
    var movieId=_comment.movie;
    comment.save(function(err, comment) {
        if (err) {
            console.log(err);
        }
        res.redirect('/movie/' +movieId);
    })
};
