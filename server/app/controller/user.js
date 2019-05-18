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

  async login() {
    const { ctx } = this;
    const result = await ctx.service.user.login(this.ctx.request.body);
    if (result.error) {
      ctx.error = result.error;
      return;
    }
    
    ctx.body = result.body;
  }

  async logout() {
    const { ctx } = this;
    const result = await ctx.service.user.logout(this.ctx.request.body.userId);
    if (result.error) {
      ctx.error = result.error;
      return;
    }
    ctx.body = result.body;
  }
};
