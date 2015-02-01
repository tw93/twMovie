// user signUp
var User = require('../models/user.js');
exports.signup = function(req, res) {
	var _user = req.body.user;
	User.find({
		name: _user.name
	}, function(err, user) {
		if (err) {
			console.log(err);
		}
		console.log(user.length);
		if (user.length == 0) {
			console.log("thwww");
			var user = new User(_user);
			user.save(function(err, user) {
				if (err) {
					console.log(err);
				}
				console.log('reg is ok');
				req.session.warn = '注册成功，现在登录获得更好体验。';
				return res.redirect('/signin');
			});


		} else {

			req.session.warn = '已经有人抢先注册这个用户了，亲换一个试试。';
			return res.redirect('/signup');
		}
	});

};

//user list page
exports.userlist = function(req, res) {
	User.fetch(function(err, users) {
		if (err) {
			console.log(err);
		}
		res.render('user_list', {
			title: "twMovie用户列表",
			users: users
		});
	});

};

//user login
exports.signin = function(req, res) {
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;
	User.findOne({
		name: name
	}, function(err, user) {
		if (err) {
			console.log(err);
		}
		console.log(user);
		if (user == null) {
			console.log('the user name is not reg');
			req.session.warn = '用户名不正确，请重新登录。';
			return res.redirect('/signin');
		}
		user.comparePassword(password, function(isMatch) {
			if (isMatch) {
				req.session.user = user;
				return res.redirect('/');
			} else {
				console.log('the password is not macth');
				req.session.warn = '密码不正确,请重新登录。';
				return res.redirect('/signin');
			}
		})
	})
};

//user logout
exports.logout = function(req, res) {
	delete req.session.user;
	//delete app.locals.user;
	res.redirect('/')
};


//show signin
exports.showSignin = function(req, res) {
	res.render('signin', {
		title: '用户登录',
		user: {}
	})
};
//show signup
exports.showSignup = function(req, res) {
	res.render('signup', {
		title: '用户注册',
		user: {}
	})
};


//usersignRequire
exports.signinRequire = function(req, res, next) {
	var user = req.session.user;
	if (!user) {
		req.session.warn = '如果想进行下面操作，请您先登录。';
		return res.redirect('/signin');
	}
	next();
};

//user adminRequire
exports.adminRequire = function(req, res, next) {
	var user = req.session.user;
	if (user.role <= 10) {
		req.session.warn = '对不起您不是管理员，请使用管理员帐号登录。';
		return res.redirect('/signin');
	}
	next();
};