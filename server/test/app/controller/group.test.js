'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { getReqLoginInfo } = require('../../utils/mockInfo');
describe('test/app/controller/group.test.js', () => {
  let loginInfo,
    param;
  before(async () => {
    const groupModel = app.model.Group;
    await groupModel.deleteMany({});
    loginInfo = await getReqLoginInfo();
    param = {
      groupId: '5cdffe227f8c351f542e43ba',
      members: [
        loginInfo.userId,
      ],
      groupName: 'groupName',
    };
  });

  it('test POST /api/group/create  should success', async () => {
    app.mockService('group', 'createGroup', () => {
      return {
        body: param,
      };
    });
    const response = await app.httpRequest()
      .post('/api/group/create')
      .set('Cookie', `token=${loginInfo.token}`)
      .send(param)
      .expect(200);
    assert(response.body.members.includes(loginInfo.userId));
    param.groupId = response.body.groupId;
  });

  it('test POST /api/group/create missing groupName should fail', async () => {
    const response = await app.httpRequest()
      .post('/api/group/create')
      .set('Cookie', `token=${loginInfo.token}`)
      .send({})
      .expect(401);
    assert(response.body.code === 4001);
    assert(response.body.success === false);
  });

  it('test GET /api/group/list  should success', async () => {
    app.mockService('group', 'list', () => {
      return {
        body: [ param ],
      };
    });
    const response = await app.httpRequest()
      .get('/api/group/list')
      .set('Cookie', `token=${loginInfo.token}`)
      .expect(200);
    assert(response.body.length === 1);
  });

  it('test POST /api/group/update  should success', async () => {
    app.mockService('group', 'updateGroup', () => {
      return {
        body: Object.assign({}, { ...param }, { groupName: 'changeName' }),
      };
    });
    const response = await app.httpRequest()
      .post('/api/group/update')
      .send({ groupId: param.groupId, groupName: 'changeName' })
      .set('Cookie', `token=${loginInfo.token}`)
      .expect(200);
    assert(response.body.groupName === 'changeName');
    assert(response.body.groupId === param.groupId);
  });

  it('test POST /api/group/update missing paramter should fail', async () => {
    const response = await app.httpRequest()
      .post('/api/group/update')
      .send({ groupId: param.groupId })
      .set('Cookie', `token=${loginInfo.token}`)
      .expect(401);
    assert(response.body.code === 4001);
    assert(response.body.success === false);
  });

  it('test POST /api/group/members/add should success', async () => {
    param.members.push('5cdffbd9f82b17348c3df6a7');
    app.mockService('group', 'addMembers', () => {
      return {
        body: Object.assign({}, { ...param }, { groupName: 'changeName' }),
      };
    });
    const response = await app.httpRequest()
      .post('/api/group/members/add')
      .send({ groupId: param.groupId, members: [ '5cdffbd9f82b17348c3df6a7' ] })
      .set('Cookie', `token=${loginInfo.token}`)
      .expect(200);
    assert(response.body.groupId === param.groupId);
    assert(response.body.members.includes('5cdffbd9f82b17348c3df6a7'));
  });

  it('test POST /api/group/members/add missing paramter should fail', async () => {
    const response = await app.httpRequest()
      .post('/api/group/members/add')
      .send({ members: [ '5cdffbd9f82b17348c3df6a7' ] })
      .set('Cookie', `token=${loginInfo.token}`)
      .expect(401);
    assert(response.body.code === 4001);
    assert(response.body.success === false);
  });

  it('test POST /api/group/members/add missing paramter should fail', async () => {
    const response = await app.httpRequest()
      .post('/api/group/members/add')
      .send({ groupId: param.groupId })
      .set('Cookie', `token=${loginInfo.token}`)
      .expect(401);
    assert(response.body.code === 4001);
    assert(response.body.success === false);
  });

  it('test DELETE /api/group/members should success', async () => {
    app.mockService('group', 'removeMembers', () => {
      return {
        body: param,
      };
    });
    const response = await app.httpRequest()
      .delete('/api/group/members')
      .send({ groupId: param.groupId, members: [ '5cdffbd9f82b17348c3df6a1' ] })
      .set('Cookie', `token=${loginInfo.token}`)
      .expect(200);
    assert(response.body.groupId === param.groupId);
    assert(!response.body.members.includes('5cdffbd9f82b17348c3df6a1'));
  });

  it('test DELETE /api/group/members missing paramter should fail', async () => {
    const response = await app.httpRequest()
      .delete('/api/group/members')
      .send({ members: [ '5cdffbd9f82b17348c3df6a7' ] })
      .set('Cookie', `token=${loginInfo.token}`)
      .expect(401);
    assert(response.body.code === 4001);
    assert(response.body.success === false);
  });

});
