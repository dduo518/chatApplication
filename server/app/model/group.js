'use strict';
const { modifiedPlugin } = require('./plugins/updatedTime');
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GroupSchema = new Schema({
    name: { type: String },
    members: [],
    updatedTime: { type: Date, default: new Date() },
    createdTime: { type: Date, default: new Date() },
  });
  GroupSchema.plugin(modifiedPlugin);
  return mongoose.model('Group', GroupSchema);
};
