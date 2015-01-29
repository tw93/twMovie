var Comment = require('../models/comment.js');
var _ = require('underscore');

//comment save
exports.save = function(req, res) {
    var _comment = req.body.comment;
    var comment = new Comment(_comment);
    var movieId = _comment.movie;
    if (_comment.cid) {
        Comment.findById(
            _comment.cid,
            function(err, comment) {
                var reply = {
                    from: _comment.cid,
                    to: _comment.tid,
                    content: _comment.content
                };
                comment.reply.push(reply);
                comment.save(function(err, comment) {
                    if (err) {
                        console.log(err);
                    }
                    res.redirect('/movie/' + movieId);
                });

            });
    } else {
        comment.save(function(err, comment) {
            if (err) {
                console.log(err);
            }
            res.redirect('/movie/' + movieId);
        })
    }

};