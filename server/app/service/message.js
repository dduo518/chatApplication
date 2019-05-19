'use strict';
const Service = require('egg').Service;
class MesssageService extends Service {
  async getMessage() {
    return { body: {} };
  }
  async getGroupMessage() {
    return { body: {} };
  }
}
module.exports = MesssageService;
