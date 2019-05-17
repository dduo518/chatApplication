'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MessageSchema = new Schema({
    fromName: { type: String },
    from: { type: Schema.Types.ObjectId },
    message: { type: String },
    attachments: [{ type: String, md5: String, fileName: String }],
  });
  return mongoose.model('Message', MessageSchema);
};
