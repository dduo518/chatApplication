'use strict';
const { ValidateParamterError } = require('../error/validateParamterError');
module.exports = (validateSchema, app) => {
  return async (ctx, next) => {
    const errors = app.validator.validate(validateSchema.body, ctx.request.body);
    if (errors) {
      ctx.error = new ValidateParamterError(errors);
      return;
    }
    await next();
  };
};
