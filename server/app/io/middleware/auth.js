'use strict';
const { VerifyAuthError } = require('./../../error/verifyAuthError');
const { tokenVerify } = require('./../../utils/tokenHelper');
module.exports = () => {
  return async (ctx, next) => {
    console.log('middleware');
    const token = ctx.socket.handshake.query.token;
    // TODO: verify auth in redis
    if (!token) {
      throw new VerifyAuthError();
    }
    ctx.socket.userInfo = tokenVerify(token);
    await next();
  };
};

