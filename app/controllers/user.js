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
			title: "用户列表",
			users: users,
			path: req.path
		});
	});

};

//list delete user
exports.del = function(req, res) {
	var id = req.query.id;
	if (id) {
		User.remove({
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

//user login
exports.signin = function(req, res) {
	var _user = req.body.user;
	var return_url = req.body.return_url ? req.body.return_url : '/';
	console.log(return_url);
	var name = _user.name;
	var password = _user.password;
	console.log(req.header);
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
				return res.redirect(return_url);
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
	var return_url = (req.param('return_url') != "undefined") ? req.param('return_url') : '/';
	console.log("assa" + return_url);
	res.redirect(encodeURI(return_url));
};


//show signin
exports.showSignin = function(req, res) {
	res.render('signin', {
		title: '用户登录',
		user: {},
	})
};
//show signup
exports.showSignup = function(req, res) {
	res.render('signup', {
		title: '用户注册',
		user: {},
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