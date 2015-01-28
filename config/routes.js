var Index = require('../app/controllers/index');
var Movie = require('../app/controllers/movie');
var User = require('../app/controllers/user');
var _ = require('underscore');

module.exports = function(app) {
    //pre handle  user
    app.use(function(req, res, next) {
        var _user = req.session.user;
        app.locals.user = _user;
        next();
    });
    //Index
    app.get('/', Index.index);
    //Movie
    app.get('/movie/:id', Movie.detail);
    app.get('/admin/movie',User.signinRequire,User.adminRequire, Movie.new);
    app.get('/admin/movie/update/:id',User.signinRequire,User.adminRequire, Movie.update);
    app.post('/admin/movie/new',User.signinRequire,User.adminRequire, Movie.save);
    app.get('/admin/movie/list',User.signinRequire,User.adminRequire, Movie.list);
    app.delete('/admin/movie/list',User.signinRequire,User.adminRequire, Movie.del);
    //User
    app.post('/user/signup', User.signup);
    app.post('/user/signin', User.signin);
    app.get('/signin', User.showSignin);
    app.get('/signup', User.showSignup);
    app.get('/admin/userlist',User.signinRequire,User.adminRequire,User.userlist);
    app.get('/logout', User.logout);
}