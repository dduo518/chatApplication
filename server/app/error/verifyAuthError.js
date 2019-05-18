'use strict';
const ErrorBase = require('./ErrorBase');

class VerifyAuthError extends ErrorBase {
  constructor(info = 'Permission verification failed', code = 4004, status = 401) {
    super(info, code, status);
  }
}
module.exports = {
  VerifyAuthError,
};
