'use strict';
const ErrorBase = require('./ErrorBase');

class ValidateParamterError extends ErrorBase {
  constructor(info = 'ValidateParamterError', code = 4001, status = 401) {
    super(info, code, status);
  }
}

module.exports = {
  ValidateParamterError,
};
