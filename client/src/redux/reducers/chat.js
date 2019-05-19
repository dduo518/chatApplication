import {
  CHAT_ACTION,
  CONNECT_SUCCESS
} from './../constants'

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
        return { ...state, id: userId, name: userName, type };
      } else{
        const { groupId, groupName } = action.payload.item
        return { ...state, id: groupId, name: groupName , type };
      }
    }
    case CONNECT_SUCCESS: {
      return { ...state, socket: action.socket }
    }
    default:
      return state;
  }
}
