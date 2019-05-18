'use strict';
const Service = require('egg').Service;
const { UserRegisteredError } = require('./../error/userError');
const { MD5 } = require('./../../utils/cryptoHelper');
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
}
module.exports = UserService;
