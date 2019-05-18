'use strict';
let loginInfo = null;
const params = {
  userName: 'zhengchong111',
  passWord: 'password',
};
const { app } = require('egg-mock/bootstrap');
exports.getReqLoginInfo = async () => {
  if (loginInfo) {
    return loginInfo;
  }

  await app.httpRequest()
    .post('/api/user/registered')
    .send(params);
  const result = await app.httpRequest().post('/api/user/login').send(params);
  loginInfo = result.body;
  return loginInfo;
};
