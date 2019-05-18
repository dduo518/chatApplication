'use strict';
const Controller = require('egg').Controller;
module.exports = class UserController extends Controller {
  async registered() {
    const { ctx } = this;
    const result = await ctx.service.user.registered(this.ctx.request.body);
    ctx.sendResponse(result);
  }

  async login() {
    const { ctx } = this;
    const result = await ctx.service.user.login(this.ctx.request.body);
    ctx.sendResponse(result);
    ctx.setCookie('token', result.body ? result.body.token : null);
  }

  async logout() {
    const { ctx } = this;
    const result = await ctx.service.user.logout(this.ctx.request.userInfo.userId);
    ctx.sendResponse(result);
  }

  async list() {
    const { ctx } = this;
    const userId = this.ctx.request.userInfo.userId;
    const result = await ctx.service.user.list(userId);
    ctx.sendResponse(result);
  }

};
