# twMovie
js大法好！node+mongoDB的电影网站。
主要的models有用户，电影，电影类别，评论四大模块。
同时具有后台管理系统，可以对电影进行编辑和查看。
#安装
1. 使用前确保你已经安装了nodejs或者iojs了
2. 使用npm install -g bower安装bower前端文件管理器
3. 运行bower install安装项目前端框架
4. npm install安装node包依赖
5. 使用命令node app.js或者直接grunt就可以运行了,在本地测试端口号为3000

#测试
1. 本地首页:http://localhost:3000
2. 本地详细页面：http://localhost:3000/movie/id(确保你已经新建电影)
3. 后台管理页面：http://localhost:3000/admin/movie/list
4. 电影录入页面：http://localhost:3000/admin/movie/new
5. 用户登录页面：http://localhost:3000/signin
6. 用户登录注册：http://localhost:3000/signup
7. 用户列表页面：http://localhost:3000/admin/user/list
8. 电影类别录入：http://localhost:3000/admin/category/new
8. 电影类别列表：http://localhost:3000/admin/category/list

#demo演示地址（不保证最新代码）
1. 测试地址：https://twmovie-tw93-8.c9.io/
2. 测试管理员用户名：admin  密码：admin
3. 点击管理员的用户名链接就可以进入后台管理。
4. 本地址用户测试和演示，请您不要删除里面的东西，谢谢。

#接下来
1. ~~后台美化，可以简约地管理。~~
2. ~~优化登录，登出流程，使用户登录登出时候跳转到之前提交页面（url中文通过encodeURI解决了）。~~
3. ~~选择一个node空间进行展示（最后找的cloud9）。~~
3. 确定到底要做一个什么网站。（软件分享？电影分享？音乐分享？技术分享？）。
3. 前端页面试着加一个mvvc框架。（react或者angular）。
4. 适配移动端。

