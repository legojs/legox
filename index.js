var debug = require('debug')('legox');
var app = require('koa')();
var config = require('./config/config');

//config 注入中间件，方便调用配置信息
app.use(function*(next) {
  if (!this.config) {
    this.config = config;
  }
  yield next;
});

//记录log,router use : this.logger.error(new Error(''))
app.context.logger = require('mini-logger')({
  dir: config.log_dir,
  format: 'YYYY-MM-DD-[{category}][.log]'
});

//监听错误
var onerror = require('koa-onerror');
onerror(app);

//xtemplate对koa的适配，提供rendor方法
var xtplApp = require('xtpl/lib/koa');
xtplApp(app, {
  views: config.view_dir
});

//路由
var router = require('koa-router')();
router.get('/', function*() {
  yield this.render('index', { "title": "legox" });
});
app.use(router.routes());

//启动服务
app.listen(config.port);
console.log('listening on port %s', config.port);

module.exports = app;
