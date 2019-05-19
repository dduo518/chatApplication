'use strict';

const Controller = require('egg').Controller;

class MessageController extends Controller {
  async getMessage() {
    const { ctx } = this;
    const result = await ctx.service.message.getMessage(this.ctx.request.param);
    ctx.sendResponse(result);
  }

  async getGroupMessage() {
    const { ctx } = this;
    const result = await ctx.service.message.getGroupMessage(this.ctx.request.param);
    ctx.sendResponse(result);
  }
}

module.exports = MessageController;
