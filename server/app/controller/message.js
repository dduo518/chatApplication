'use strict';

const Controller = require('egg').Controller;

class MessageController extends Controller {
  async getMessage() {
    const { ctx } = this;
    const result = await ctx.service.message.getMessage({
      from: this.ctx.transformStrToObjectId(this.ctx.request.body.from),
      to: this.ctx.transformStrToObjectId(this.ctx.request.body.to),
    });
    ctx.sendResponse(result);
  }

  async getGroupMessage() {
    const { ctx } = this;
    const result = await ctx.service.message.getGroupMessage(
      this.ctx.transformStrToObjectId(this.ctx.params.groupId)
    );
    ctx.sendResponse(result);
  }
}

module.exports = MessageController;
