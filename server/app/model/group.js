'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GroupSchema = new Schema({
    name: { type: String },
    members: [],
  });
  return mongoose.model('Group', GroupSchema);
};
