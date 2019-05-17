'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GroupMessageSchema = new Schema({
    groupId: { type: Schema.Types.ObjectId },
    groupName: { type: String },
    fromName: { type: String },
    from: { type: Schema.Types.ObjectId },
    message: { type: String },
    attachments: [{ type: String, md5: String, fileName: String }],
  });
  return mongoose.model('GroupMessage', GroupMessageSchema);
};
