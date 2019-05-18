'use strict';
const Controller = require('egg').Controller;

module.exports = class UserController extends Controller {
  async registered() {
    const { ctx } = this;
    const result = await ctx.service.user.registered(this.ctx.request.body);
    if (result.error) {
      ctx.error = result.error;
      return;
    }
    ctx.body = result.body;
  }
};
