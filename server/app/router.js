'use strict';
const { registered, login } = require('./validate/user');
const { createGroup, addMembers, removeMembers, updateGroup } = require('./validate/group');
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
  router.post('/api/user/logout', middleware.verifyAuth, controller.user.logout);
  router.get('/api/user/list', middleware.verifyAuth, controller.user.list);

  /**
   * group api
   */
  router.get('/api/group/list', middleware.verifyAuth, controller.group.groupList);
  router.post('/api/group/create', middleware.validateBody(createGroup, app), middleware.verifyAuth, controller.group.createGroup);
  router.post('/api/group/update', middleware.validateBody(updateGroup, app), middleware.verifyAuth, controller.group.updateGroup);
  router.post('/api/group/members/add', middleware.validateBody(addMembers, app), middleware.verifyAuth, controller.group.addMembers);
  router.delete('/api/group/members', middleware.validateBody(removeMembers, app), middleware.verifyAuth, controller.group.removeMembers);

  /**
   * pull message api
   */
  router.get('/api/message/list/:id', middleware.verifyAuth, controller.message.getMessage);
  router.get('/api/group/message/list/:id', middleware.verifyAuth, controller.message.getGroupMessage);

  /**
   * chating event
   */
  app.io.route('chat', app.io.controller.chat.chat);
  app.io.route('joinRoom', app.io.controller.chat.joinRoom);
  app.io.route('chatGroup', app.io.controller.chat.chatGroup);
};
