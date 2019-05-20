
import {
  LOGUP_SUCCESS,
  LOGUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_INFO,
} from './../constants'
const initialState = {
  userName: null,
  userId: null,
  token: null,
  isLogin: false,
  tip: 'logup success! please login',
  groupInfo:[]
};

function login(state = initialState, action) {
  switch (action.type) {
    case LOGUP_SUCCESS: {
      const { userId, userName } = action.content 
      return { ...state, userId, userName};
    }
    case LOGUP_FAILURE: {
      return state;
    }
    case LOGIN_SUCCESS: {
      const { userId, userName, token, groupInfo } = action.content
      return { ...state, isLogin: true, userId, userName, token, groupInfo };
    }
    case LOGIN_INFO: {
      const { userId, userName, token, isLogin } = action.payload
      return { ...state, isLogin: isLogin, userId, userName, token };
    }
    default:
      return state;
  }
}

export default login