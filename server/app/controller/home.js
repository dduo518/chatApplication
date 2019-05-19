'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    await ctx.model.User.find({});
    await app.redis.set('foo', 'bar');
    ctx.body = 'hi egg';
  }
  async render() {
    await this.ctx.render('index.js');
  }
}

module.exports = HomeController;
