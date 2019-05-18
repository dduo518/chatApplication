'use strict';
const { MESSAGE } = require('./message');
module.exports = class ErrorBase extends Error {
  constructor(info = {}, code = 4000, status = 404) {
    super(JSON.stringify(info));
    this.body = {
      success: false,
      code,
      message: MESSAGE[code],
      detail: info,
    };
    this.status = status;
  }
};

