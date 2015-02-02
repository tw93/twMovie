# twMovie
js大法好！node+mongoDB的电影网站。
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
6. 用户列表页面：http://localhost:3000/admin/userlist

#接下来
1. ~~后台美化，可以简约地管理。~~
2. 确定到底要做一个什么网站。（软件分享？电影分享？音乐分享？技术分享？）。
3. 前端页面试着加一个mvvc框架。（react或者angular）。
4. 适配移动端。
5. ~~优化登录，登出流程，使用户登录登出时候跳转到之前提交页面（url中文通过encodeURI解决了）~~
