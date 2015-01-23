var express=require('express');
var path=require('path');
var bodyParser = require('body-parser');
var port=process.env.PORT || 3000;
var app=express();

app.set('views','./views/pages');
app.set('view engine','jade');
app.use(express.static(path.join(__dirname,'bower_components')));
app.listen(port);
console.log('server has started on port'+port);

//index page
app.get('/', function (req, res) {
	res.render('index',{
		title:"首页",
		movies:[
            {
			title:'机械战警',
			_id:0,
			poster:'http://upload.wikimedia.org/wikipedia/zh/thumb/2/29/%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg/426px-%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg'
		    },
            {
                title:'机械战警',
                _id:1,
                poster:'http://upload.wikimedia.org/wikipedia/zh/thumb/2/29/%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg/426px-%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg'
            },
            {
                title:'机械战警',
                _id:2,
                poster:'http://upload.wikimedia.org/wikipedia/zh/thumb/2/29/%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg/426px-%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg'
            },
            {
                title:'机械战警',
                _id:3,
                poster:'http://upload.wikimedia.org/wikipedia/zh/thumb/2/29/%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg/426px-%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg'
            },
            {
                title:'机械战警',
                _id:4,
                poster:'http://upload.wikimedia.org/wikipedia/zh/thumb/2/29/%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg/426px-%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg'
            },
            {
                title:'机械战警',
                _id:5,
                poster:'http://upload.wikimedia.org/wikipedia/zh/thumb/2/29/%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg/426px-%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg'
            }]
	})
});

//detail page
app.get('/movie/:id', function (req, res) {
	res.render('detail',{
		title:"详细页",
        movie:{
            doctor:'汤威',
            country:'美国',
            title:'机械战警',
            poster:'http://upload.wikimedia.org/wikipedia/zh/thumb/2/29/%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg/426px-%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg',
            language:'英语',
            year:2014,
            flash:'http://player.youku.com/player.php/sid/XNjM3Njc3MTY4/v.swf',
            summary:'2028年，专事军火开发的机器人公司Omni Corp.生产了大量装备精良的机械战警，他们被投入到维和和惩治犯罪等行动中，取得显著的效果。罪犯横行的底特律市，嫉恶如仇、正义感十足的警察亚历克斯·墨菲（乔尔·金纳曼 饰）遭到仇家暗算，身体受到毁灭性破坏。借助于Omni公司天才博士丹尼特·诺顿（加里·奥德曼 饰）最前沿的技术，墨菲以机械战警的形态复活。数轮严格的测试表明，墨菲足以承担起维护社会治安的重...'
        }
	})
});

//admin page
app.get('/admin/movie', function (req, res) {
	res.render('admin',{
		title:"后台录入页",
        movie:{
            doctor:'',
            country:'',
            title:'',
            poster:'',
            language:'',
            flash:'',
            year:'',
            summary:''
        }
	})
});

//list page
app.get('/admin/list', function (req, res) {
	res.render('list',{
		title:"列表页",
        movies:[
            {
                title:'机械战警',
                _id:0,
                poster:'http://upload.wikimedia.org/wikipedia/zh/thumb/2/29/%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg/426px-%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg',
                country:'美国',
                year:2014,
                doctor:'汤威'
            },
            {
                title:'机械战警',
                _id:1,
                poster:'http://upload.wikimedia.org/wikipedia/zh/thumb/2/29/%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg/426px-%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg',
                country:'美国',
                year:2014,
                doctor:'汤威'
            },
            {
                title:'机械战警',
                _id:2,
                poster:'http://upload.wikimedia.org/wikipedia/zh/thumb/2/29/%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg/426px-%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg',
                country:'美国',
                year:2014,
                doctor:'汤威'
            },
            {
                title:'机械战警',
                _id:3,
                poster:'http://upload.wikimedia.org/wikipedia/zh/thumb/2/29/%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg/426px-%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg',
                country:'美国',
                year:2014,
                doctor:'汤威'
            },
            {
                title:'机械战警',
                _id:4,
                poster:'http://upload.wikimedia.org/wikipedia/zh/thumb/2/29/%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg/426px-%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg',
                country:'美国',
                year:2014,
                doctor:'汤威'
            },
            {
                title:'机械战警',
                _id:5,
                poster:'http://upload.wikimedia.org/wikipedia/zh/thumb/2/29/%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg/426px-%E9%90%B5%E7%94%B2%E5%A8%81%E9%BE%8D.jpg',
                country:'美国',
                year:2014,
                doctor:'汤威'
            }]
	})
});