'use strict';
const { VerifyAuthError } = require('./../error/verifyAuthError');
const { tokenVerify } = require('./../utils/tokenHelper');
// TODO: verify cookies exp and Correct information or Compare with stored on redis, etc.
// we get user Info from redis or cookie,saving ctx.request context
module.exports = async (ctx, next) => {
  const cookie = ctx.cookies.get('token', { signed: false });

  if (!cookie) {
    const err = new VerifyAuthError();
    ctx.body = err.body;
    ctx.status = err.status;
    return;
  }
  ctx.request.userInfo = tokenVerify(cookie);
  await next();
};

