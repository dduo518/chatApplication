import {
  CHAT_ACTION,
  CONNECT_SUCCESS,
  SEND_MSG,
  SEND_MSG_SUCCESS,
  NEW_MESSAGE
} from './../constants'
import * as _ from 'lodash'
const initialState = {
  id: null,
  name: null,
  messages:[],
  type: null,
  socket:{}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHAT_ACTION: {
      const { type } = action.payload
      if (type === 'USER') {
        const { userId, userName } = action.payload.item
        return { ...state, id: userId, name: userName, type, messages: action.payload.messages };
      } else{
        const { groupId, groupName } = action.payload.item
        return { ...state, id: groupId, name: groupName, type, messages: action.payload.messages };
      }
    }
    case CONNECT_SUCCESS: {
      return { ...state, socket: action.socket }
    }
    case SEND_MSG: {
      const messages = state.messages
      messages.push(action.payload)
      return { ...state, messages}
    }
    case SEND_MSG_SUCCESS: {
      state.messages = _.map(state.messages, item => {
        if (item._msgId === action.payload._msgId) {
          item = action.payload
        }
        return item
      })
      return { ...state }
    }
    case NEW_MESSAGE: { 
      const messages = state.messages
      if (action.payload.from === state.id) {
        messages.push(action.payload)
      }
      return { ...state, messages }
    }
    default:
      return state;
  }
}
