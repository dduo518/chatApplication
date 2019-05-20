import io from 'socket.io-client';
import { socketURL } from './../config'
import { Notification } from 'element-react';
import store from './../redux/store'
import {
  SEND_MSG_SUCCESS,
  NEW_MESSAGE,
  NEW_GROUP_MESSAGE
} from '../redux/constants';
let socket 
export const startSocket = (token) => {
  socket = io(`${socketURL}?token=${token}`)
  return socket;
}

export const sendPkgMsg = (content) => {
  const state = store.getState()
  return {
    message: content,
    to: state.chat.id,
    from: state.login.userId,
    fromName: state.login.userName,
    attachments: [],
    createdTime: Date.now(),
    _msgId: Date.now(), // this will replace uuid method
    msgId: Date.now()
  }
}

export const sendMsgToServerBySocket = async (message,type, dispatch) => {
  const state = store.getState()
  await state.chat.socket.emit(type, message, (response) => {
    dispatch({
      type: SEND_MSG_SUCCESS,
      payload: response
    })
  })
}



export const errorHandel = () => {
  const state = store.getState()
  // TODO: listen connect and to do some tip 
  state.chat.socket.on('connect', () => {
    console.log(state.login.userId)
  })
  state.chat.socket.on('reconnect', (message) => {
    console.log('reconnect')
  })
  state.chat.socket.on('connect_error', (message) => {
    console.log('reconnect')
  })
}


export const listenPrivateChannel = async (dispatch) => {
  const state = store.getState()
  state.chat.socket.on(state.login.userId, (message) => {
    const newMessage = JSON.parse(message)
    notificationInfo('NEW MESSAGE', newMessage.message)
    dispatch({
      type: NEW_MESSAGE,
      payload: { ...JSON.parse(message) }
    })
  })
}

export const listenGroupChannel = (groupId, dispatch) => {
  const state = store.getState()
  socket.on(groupId, (message) => {
    const newMessage = JSON.parse(message)
    if (state.login.userId !== newMessage.from) {
      notificationInfo('NEW GROUP MESSAGE', newMessage.message)
      dispatch({
        type: NEW_GROUP_MESSAGE,
        payload: { ...newMessage }
      })
    }
  })
}

function notificationInfo(title,message) {
  Notification.info({
    title: title,
    message: message,
  })
}


