'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {

  before(async () => {
    const userModel = app.model.User;
    await userModel.deleteMany({});
  });
  const params = {
    userName: 'zhengchong',
    passWord: 'password',
  };

  it('POST /api/user/registered should success', async () => {
    const response = await app.httpRequest()
      .post('/api/user/registered')
      .send(params)
      .expect(200);
    assert(response.body.userName === params.userName);
  });

  it('POST /api/user/registered repect registered should fail', async () => {
    const response = await app.httpRequest()
      .post('/api/user/registered')
      .send(params)
      .expect(401);
    assert(response.body.success === false);
    assert(response.body.code === 4002);
    assert(response.body.message === 'UserName already exists');
  });

  it('POST /api/user/registered missing passWord should fail', async () => {
    const response = await app.httpRequest()
      .post('/api/user/registered')
      .send({
        userName: 'zhengchong1',
      })
      .expect(401);
    assert(response.body.success === false);
    assert(response.body.code === 4001);
    assert(response.body.message === 'Parameter Error');
  });

});
