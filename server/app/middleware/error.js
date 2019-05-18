'use strict';
module.exports = () => {
  return async function error(ctx, next) {
    await next();
    if (ctx.error instanceof Error) {
      ctx.body = ctx.error.body;
      ctx.status = ctx.error.status;
    }
  };
};
