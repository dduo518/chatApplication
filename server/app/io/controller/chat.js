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
    async chat() {
      const data = this.ctx.args[0];
      const cb = this.ctx.args[1];
      const resolveMsg = await this._parseMsgPackage(data);
      const message = await this._persistentMsg(resolveMsg.message);
      resolveMsg.message.msgId = message._id;// this msgId create in server
      resolveMsg.message.createdTime = message.createdTime;// this createdTime create in server
      cb(resolveMsg.message);
      await this.messageToClient(resolveMsg);
    }

    async messageToClient(data) {
      // TODO: message receive callback if not receive ack should message reissue
      const toUserInfo = await this.getToUserSocketId(data.to);
      const socket = await this.getClientSocket(toUserInfo.toSocketId);
      socket && socket.emit(data.to, JSON.stringify(data.message), this.msgAck);
    }

    getClientSocket(socketId) {
      return this.app.io.sockets.connected[socketId];
    }
    async joinRoom() {
      const data = this.ctx.args[0];
      this.ctx.socket.join(data);
    }

    async _parseMsgPackage(data) {
      const message = {
        from: this.ctx.socket.userInfo.userId,
        to: data.to,
        fromName: this.ctx.socket.userInfo.userName,
        message: data.message,
        attachments: data.attachments || [],
        _msgId: data._msgId, // this msgId create in client
      };
      return {
        to: data.to, message,
      };
    }

    async _persistentMsg(msg) {
      const messgae = new this.ctx.model.Message(msg);
      return await messgae.save();
    }

    async msgAck(res) {
      console.log('ack:', res);
    }

    async getToUserSocketId(toUserId) {
      const toUserInfoKey = userInfoKey(toUserId);
      const toSocketId = await this.app.redis.hget(toUserInfoKey, 'socketId');
      return { toSocketId };
    }

    async chatGroup() {
      const data = this.ctx.args[0];
      const resolveMsg = await this._parseMsgPackage(data);
      const message = await this._persistentGroupMsg(resolveMsg.message);
      resolveMsg.message.msgId = message._id;// this msgId create in server
      await this.messageToGroup(resolveMsg);
    }

    async _persistentGroupMsg(msg) {
      const messgae = new this.ctx.model.GroupMessage(msg);
      return await messgae.save();
    }

    async messageToGroup(data) {
      this.ctx.socket.to(data.to).emit('newMsg', JSON.stringify(data.message), this.msgAck);
    }
  }
  return Controller;
};
