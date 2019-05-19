'use strict';
const { modifiedPlugin } = require('./plugins/updatedTime');
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MessageSchema = new Schema({
    fromName: { type: String },
    from: { type: Schema.Types.ObjectId },
    to: { type: Schema.Types.ObjectId },
    toName: { type: String },
    message: { type: String },
    attachments: [{ type: String, md5: String, fileName: String }],
    updatedTime: { type: Date, default: new Date() },
    createdTime: { type: Date, default: new Date() },
  });
  MessageSchema.plugin(modifiedPlugin);
  return mongoose.model('Message', MessageSchema);
};
