'use strict';
const uuid = require('uuid');
const crypto = require('crypto');

module.exports = {
  UUID() {
    return uuid.v1().replace(/[-]/g, '');
  },
  MD5(text) {
    return crypto.createHash('md5').update(text += '').digest('hex');
  },
  SHA1(text) {
    return crypto.createHash('sha1').update(text += '').digest('hex');
  },
  SHA256(text) {
    return crypto.createHash('sha1').update(text += '').digest('hex');
  },
};
