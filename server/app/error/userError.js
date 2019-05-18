'use strict';
const ErrorBase = require('./ErrorBase');

class UserRegisteredError extends ErrorBase {
  constructor(info = 'User Registered Error', code = 4001, status = 401) {
    super(info, code, status);
  }
}

module.exports = {
  UserRegisteredError,
};
