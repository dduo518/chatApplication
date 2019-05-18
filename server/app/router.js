'use strict';
const { registered, login } = require('./../validate/user');
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  router.get('/health', controller.home.index);
  /**
   * user controller registered router
   * TODO: this will add router group or add swagger to create api doc
   */
  router.post('/api/user/registered', middleware.validateBody(registered, app), controller.user.registered);
  router.post('/api/user/login', middleware.validateBody(login, app), controller.user.login);
};
