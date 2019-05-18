'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {

  it('should GET /health', () => {
    return app.httpRequest()
      .get('/health')
      .expect('hi egg')
      .expect(200);
  });
});
