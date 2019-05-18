'use strict';
const Service = require('egg').Service;
const { UserRegisteredError, UserLoginError } = require('./../error/userError');
const { MD5 } = require('./../../utils/cryptoHelper');
const { createToken } = require('./../../utils/tokenHelper');
const { userInfoKey } = require('./../keys');
class UserService extends Service {
  async registered(params) {
    const error = await this.userInfoIsExists(params.userName);
    if (error) {
      return { error };
    }
    const user = new this.ctx.model.User({
      userName: params.userName,
      passWord: MD5(params.passWord),
    });

    const userInfo = await user.save();
    const body = {
      userId: userInfo._id,
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
    }, { passWord: -1, userName: 1 });
    if (!userInfo) {
      const error = new UserLoginError();
      return { error };
    }
    const user = { userName: userInfo.userName, userId: userInfo._id };
    const token = createToken(user);
    user.token = token;
    user.status = 0;
    const userInfoRedisKey = userInfoKey(userInfo._id);
    await this.putDataInRedis(userInfoRedisKey, user);
    return { body: user };
  }

  /**
   * data save in redis and data is map[string]{} use string to key
   * @param {string} key
   * @param {Object} data map[string]{} use for in
   */
  async putDataInRedis(key, data) {
    const command = [];
    for (const _key in data) {
      let val = data[_key];
      if (typeof val === 'string') val = JSON.stringify(val);
      command.push([ 'hset', key, _key, val ]);
    }
    await this.app.redis.multi(command).exec();
  }

  async logout(userId) {
    const userInfoRedisKey = userInfoKey(userId);
    await this.app.redis.del(userInfoRedisKey);
    return { body: userId };
  }
}
module.exports = UserService;
