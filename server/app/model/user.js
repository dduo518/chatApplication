'use strict';
const { modifiedPlugin } = require('./plugins/updatedTime');
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    userId: { type: Schema.Types.ObjectId },
    userName: { type: String },
    passWord: { type: String },
    friends: [],
    updatedTime: { type: Date, default: new Date() },
    createdTime: { type: Date, default: new Date() },
  });

  UserSchema.plugin(modifiedPlugin);
  return mongoose.model('User', UserSchema);
};
