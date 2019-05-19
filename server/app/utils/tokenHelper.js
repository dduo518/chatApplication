'use strict';
const jwt = require('jsonwebtoken');

exports.createToken = (data, signature = process.env.TOKENSIGNATURE || '<secret>') => {
  return jwt.sign(data, signature, { expiresIn: '24h' });
};

exports.tokenVerify = (token, signature = process.env.TOKENSIGNATURE || '<secret>') => {
  if (!token || typeof token !== 'string') return false;
  const decoded = jwt.verify(token, signature);
  return decoded;
};
