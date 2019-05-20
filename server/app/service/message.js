'use strict';
const Service = require('egg').Service;
const _ = require('lodash');
class MesssageService extends Service {
  async getMessage(param) {
    const where = {
      $or: [
        {
          from: param.to,
          to: param.from,
        },
        {
          to: param.to,
          from: param.from,
        },
      ],
    };
    const result = await this.ctx.model.Message.find(where, {}, { sort: { createdTime: 1 } });
    const list = this.transformMsg(_.cloneDeep(result));
    return { body: list };
  }
  async getGroupMessage(groupId) {
    const where = { to: groupId };
    const result = await this.ctx.model.GroupMessage.find(where, {}, { sort: { createdTime: 1 } });
    const list = this.transformMsg(_.cloneDeep(result));
    return { body: list };
  }
  transformMsg(list) {
    return list.map(item => {
      return {
        msgId: item._id,
        message: item.message,
        from: item.from,
        fromName: item.fromName,
        to: item.to,
        attachments: item.attachments,
        createdTime: item.createdTime,
      };
    });
  }
}
module.exports = MesssageService;
