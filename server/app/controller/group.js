'use strict';

const Controller = require('egg').Controller;

class GroupController extends Controller {
  async groupList() {
    const { ctx } = this;
    const result = await ctx.service.group.list(
      ctx.transformStrToObjectId(this.ctx.request.userInfo.userId)
    );
    ctx.sendResponse(result);
  }

  async createGroup() {
    const { ctx } = this;
    ctx.request.body.members.push(this.ctx.request.userInfo.userId);
    const params = {
      groupName: ctx.request.body.groupName,
      members: ctx.request.body.members,
    };
    params.members = params.members.map(item => ctx.transformStrToObjectId(item));
    const result = await ctx.service.group.createGroup(params);
    ctx.sendResponse(result);
  }

  async addMembers() {
    const { ctx } = this;
    const params = {
      groupId: ctx.transformStrToObjectId(this.ctx.request.body.groupId),
      userIds: this.ctx.request.body.members,
    };
    params.userIds = params.userIds.map(item => ctx.transformStrToObjectId(item));
    const result = await ctx.service.group.addMembers(params);
    ctx.sendResponse(result);
  }

  async removeMembers() {
    const { ctx } = this;
    const params = {
      groupId: ctx.transformStrToObjectId(this.ctx.request.body.groupId),
      userIds: this.ctx.request.body.members,
    };
    params.userIds = params.userIds.map(item => ctx.transformStrToObjectId(item));
    const result = await ctx.service.group.removeMembers(params);
    ctx.sendResponse(result);
  }

  async updateGroup() {
    const { ctx } = this;
    const params = {
      groupId: ctx.transformStrToObjectId(this.ctx.request.body.groupId),
      groupName: this.ctx.request.body.groupName,
    };
    const result = await ctx.service.group.updateGroup(params);
    ctx.sendResponse(result);
  }
}

module.exports = GroupController;
