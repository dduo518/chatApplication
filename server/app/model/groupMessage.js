'use strict';
const { modifiedPlugin } = require('./plugins/updatedTime');
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GroupMessageSchema = new Schema({
    to: { type: Schema.Types.ObjectId },
    fromName: { type: String },
    from: { type: Schema.Types.ObjectId },
    message: { type: String },
    attachments: [{ type: String, md5: String, fileName: String }],
    updatedTime: { type: Date, default: new Date() },
    createdTime: { type: Date, default: new Date() },
  });
  GroupMessageSchema.plugin(modifiedPlugin);
  return mongoose.model('GroupMessage', GroupMessageSchema);
};
