var index_controller = require('../controller/index');
module.exports = function(app) {
  //首页
  app.get('/', index_controller.index);
};
