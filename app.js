var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser=require('cookie-parser');
var expressSession=require('express-session');
var mongoStore=require('connect-mongo')(expressSession);
var port = process.env.PORT || 3000;
var app = express();
var dbUrl='mongodb://localhost/twMovie'
mongoose.connect(dbUrl);
app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(expressSession({
    secret:'tw93',
    store:new mongoStore({
        url:dbUrl,
        collection:'sessions'
    }),
	proxy: true,
    resave: true,
    saveUninitialized: true
}));
require('./config/routes.js')(app);
app.locals.moment = require('moment');
app.listen(port);
console.log('server has started on port' + port);
