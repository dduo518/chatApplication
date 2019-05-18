'use strict';
exports.registered = {
  body: {
    userName: {
      type: 'string',
      require: true,
      allowEmpty: false,
    },
    passWord: {
      type: 'string',
      require: true,
      allowEmpty: false,
    },
  },
};
exports.login = exports.registered;

exports.logout = {
  body: {
    userId: {
      type: 'string',
      require: true,
      allowEmpty: false,
    },
  },
};
