'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/user.test.js', () => {

  before(async () => {
    const userModel = app.model.User;
    await userModel.deleteMany({});
  });
  const params = {
    userName: 'zhengchong',
    passWord: 'password',
  };

  it('should return userInfo test registered', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.user.registered(params);
    assert(result.body.userName === params.userName);
  });

  it('should return null test userInfoIsExists', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.user.userInfoIsExists('zhengchong1');
    assert(result === null);
  });

  it('should return error test userInfoIsExists', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.user.userInfoIsExists(params.userName);

    assert(result instanceof Error);
  });

});
