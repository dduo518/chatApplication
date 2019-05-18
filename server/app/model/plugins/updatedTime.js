'use strict';
exports.modifiedPlugin = schema => {
  schema.pre('update', next => {
    this.update({}, { $set: { updatedTime: new Date() } });
    next();
  });
};

