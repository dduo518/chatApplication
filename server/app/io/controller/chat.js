'use strict';
const { userInfoKey } = require('./../../keys');
// eslint-disable-next-line jsdoc/require-param
/**
 * the chat logic is
 * 1.every one have a channel of userid to receive message from server
 * 2.the server have a public 'chat' channel to reveive message from client
 * 3.multi-end synchronization
 * TODO: message should save redis and async save mongodb and do ack reissue mechanism
 */
module.exports = app => {
  class Controller extends app.Controller {
    async index() {
      const data = this.ctx.args[0];
      const resolveMsg = await this._parseMsgPackage(data);
      const message = await this._persistentMsg(resolveMsg.message);
      resolveMsg.message = {
        from: message.from,
        fromName: message.fromName,
        to: message.to,
        text: message.text,
        attachments: message.attachments,
        msgId: message._id, // this msgId create in server
        _msgId: resolveMsg._msgId, // this msgId create in client
      };
      await this.messageToClient(resolveMsg);
    }

    async messageToClient(data) {
      // TODO: message receive callback if not receive ack should message reissue
      this.ctx.socket.emit(data.to, JSON.stringify(data.message), this.msgAck);
    }

    async joinRoom() {
      console.log('joinRoom');
    }

    async _parseMsgPackage(data) {
      const toUserInfo = await this.getToUserInfo(data.to);
      const message = {
        from: this.ctx.socket.userInfo.userId,
        fromName: this.ctx.socket.userInfo.userName,
        to: data.to,
        toName: toUserInfo.toName,
        text: data.message,
        attachments: data.attachments || [],
      };
      return {
        to: data.to, toSocketId: toUserInfo.toSocketId, message, _msgId: data._msgId,
      };
    }

    async _persistentMsg(msg) {
      const messgae = new this.ctx.model.Message({
        fromName: msg.fromName,
        from: app.mongoose.Types.ObjectId(msg.from),
        to: app.mongoose.Types.ObjectId(msg.to),
        message: msg.text,
        attachments: msg.attachments,
      });
      return await messgae.save();
    }

    async msgAck(res) {
      console.log('ack:', res);
    }

    async getToUserInfo(toUserId) {
      const toUserInfoKey = userInfoKey(toUserId);
      const result = await Promise.all([
        this.app.redis.hget(toUserInfoKey, 'socketId'),
        this.app.redis.hget(toUserInfoKey, 'userName'),
      ]);
      const toSocketId = result[0];
      const toName = result[1];
      return { toSocketId, toName };
    }
  }
  return Controller;
};
