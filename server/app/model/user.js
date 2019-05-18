'use strict';
const { modifiedPlugin } = require('./plugins/updatedTime');
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    userName: { type: String },
    passWord: { type: String },
    updatedTime: { type: Date, default: new Date() },
    createdTime: { type: Date, default: new Date() },
  });
  UserSchema.plugin(modifiedPlugin);
  return mongoose.model('User', UserSchema);
};
