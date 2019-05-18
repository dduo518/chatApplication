'use strict';
const ErrorBase = require('./ErrorBase');

class UserRegisteredError extends ErrorBase {
  constructor(info = 'User Registered Error', code = 4001, status = 401) {
    super(info, code, status);
  }
}

class UserLoginError extends ErrorBase {
  constructor(info = 'Invalid Username or Password', code = 4003, status = 401) {
    super(info, code, status);
  }
}

module.exports = {
  UserRegisteredError,
  UserLoginError,
};
