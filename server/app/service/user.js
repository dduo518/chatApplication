'use strict';
const Service = require('egg').Service;
const { UserRegisteredError, UserLoginError } = require('./../error/userError');
const { MD5 } = require('./../utils/cryptoHelper');
const { createToken } = require('./../utils/tokenHelper');
const { userInfoKey } = require('./../keys');
class UserService extends Service {
  async registered(params) {
    const error = await this.userInfoIsExists(params.userName);
    if (error) {
      return { error };
    }
    const user = new this.ctx.model.User({
      userId: this.app.mongoose.Types.ObjectId(),
      userName: params.userName,
      passWord: MD5(params.passWord),
    });

    const userInfo = await user.save();
    const body = {
      userId: userInfo.userId,
      userName: userInfo.userName,
    };
    return { body };
  }

  async userInfoIsExists(userName) {
    const userInfo = await this.ctx.model.User.find({
      userName,
    }, { userName: 1, _id: 0 });
    if (userInfo.length > 0) {
      const error = new UserRegisteredError(userInfo, 4002);
      return error;
    }
    return null;
  }

  async login(params) {
    const userInfo = await this.ctx.model.User.findOne({
      userName: params.userName,
      passWord: MD5(params.passWord),
    }, { passWord: 0, _id: 0 });
    if (!userInfo) {
      const error = new UserLoginError();
      return { error };
    }


    const groupInfo = await this.ctx.model.Group.find({
      members: { $in: [ this.ctx.transformStrToObjectId(userInfo.userId) ] },
    }, { groupId: 1, _id: 0, groupName: 1 });

    const user = { userName: userInfo.userName, userId: userInfo.userId, groupInfo };
    const token = createToken(user);
    user.token = token;
    user.groupInfo = groupInfo;
    user.status = 0;
    const userInfoRedisKey = userInfoKey(userInfo.userId);
    await this.putDataInRedis(userInfoRedisKey, user);
    return { body: user };
  }

  /**
   * TODO: userInfo should set exp time in redis and when goto verifyAuth middleware reset the exp time
   * so the cookie will no exp if always request api or connect websocket
   * data save in redis and data is map[string]{} use string to key
   * @param {string} key
   * @param {Object} data map[string]{} use for in
   */
  async putDataInRedis(key, data) {
    const command = [];
    for (const _key in data) {
      let val = data[_key];
      if (typeof val !== 'string') val = JSON.stringify(val);
      command.push([ 'hset', key, _key, val ]);
    }
    await this.app.redis.multi(command).exec();
  }

  async logout(userId) {
    const userInfoRedisKey = userInfoKey(userId);
    await this.app.redis.del(userInfoRedisKey);
    return { body: userId };
  }

  async list(userId) {
    // when get the user list should exclude own user
    // TODO: Pagination and search from name
    const where = { userId: { $ne: [ this.app.mongoose.Types.ObjectId(userId) ] } };
    const list = await this.ctx.model.User.find(where, { passWord: 0, _id: 0 });
    return { body: list };
  }
}
module.exports = UserService;
