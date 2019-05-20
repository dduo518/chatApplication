'use strict';
const Service = require('egg').Service;
class GroupService extends Service {
  async list(userId) {
    const where = {
      members: { $in: [ userId ] },
    };
    const list = await this.ctx.model.Group.find(where, { _id: 0 });
    return { body: list };
  }

  async createGroup(param) {
    const newGroup = await this.ctx.model.Group.create({
      groupId: this.app.mongoose.Types.ObjectId(),
      groupName: param.groupName,
      members: param.members,
    });
    return { body: newGroup };
  }

  async addMembers(param) {
    const update = {
      $addToSet: {
        members: param.userIds,
      },
    };
    return this._opreatorMember(param.groupId, update);
  }

  async removeMembers(param) {
    const update = {
      $pullAll: {
        members: param.userIds,
      },
    };
    return this._opreatorMember(param.groupId, update);
  }

  async updateGroup(param) {
    const update = {
      $set: {
        groupName: param.groupName,
      },
    };
    return this._opreatorMember(param.groupId, update);
  }

  async _opreatorMember(groupId, opreator) {
    const where = {
      groupId,
    };
    const result = await this.ctx.model.Group.findOneAndUpdate(where, opreator, { new: true });
    return { body: result };
  }
}

module.exports = GroupService;
