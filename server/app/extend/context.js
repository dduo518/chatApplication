'use strict';
module.exports = {
  /**
   * this will repacking the data
   * @param {Object} result
   */
  sendResponse(result) {
    if (result.error) {
      this.error = result.error;
      return;
    }
    this.body = result.body;
  },
  // Set cookies at the controller level and not unsafe
  // TODO: will Encrypted transmission
  setCookie(key, val, options = { signed: false, httpOnly: false }) {
    this.cookies.set(key, val, options);
  },

  transformStrToObjectId(id) {
    return this.app.mongoose.Types.ObjectId(id);
  },
};
