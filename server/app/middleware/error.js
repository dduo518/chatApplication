'use strict';
const ErrorBase = require('../error/ErrorBase');
module.exports = () => {
  return async function error(ctx, next) {
    try {
      await next();
      if (ctx.error instanceof Error) {
        ctx.body = ctx.error.body;
        ctx.status = ctx.error.status;
      }
    } catch (error) {
      const err = new ErrorBase({ message: error.message, stack: error.stack });
      ctx.body = err.body;
      ctx.status = err.status;
    }
  };
};
