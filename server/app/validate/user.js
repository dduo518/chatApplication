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
