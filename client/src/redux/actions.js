import {
  LOGIN_FAILURE,
  CHAT_ACTION,
  CHANGE_INDEX,
  LOGIN_SUCCESS,
  LOGUP_FAILURE,
  LOGUP_SUCCESS,
  LOGIN_INFO,
  GET_USERLIST,
  GET_GROUPLIST,
  CONNECT_SUCCESS,
  CONNECT_FAILURE
} from './constants';
import * as axios from './../configs/axios'
import { startSocket } from './../io/connect'

export const chatAction = content => {
  return {
    type: CHAT_ACTION,
    payload: content
  };
}

export const isLogin = () => {
  return (dispatch) => {
    const loginInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
    const isLogin = !!loginInfo.token
    dispatch({
      type: LOGIN_INFO,
      payload: { ...loginInfo, isLogin}
    })
    return isLogin
  }
}

export const getGroupList = (token) => {
  return async (dispatch) => {
    const groupListResp = await axios.groupList({ token: token });
    dispatch({
      type: GET_GROUPLIST,
      payload: groupListResp
    })
  } 
}

export const getUserList = (token) => {
  return async (dispatch) => {
    const userListResp = await axios.userList({ token:token });
    dispatch({
      type: GET_USERLIST,
      payload: userListResp
    })
  }
}

export const exchangeIndex = content => ({
  type: CHANGE_INDEX,
  payload: {
    content
  }
})

export const loginSubmit = content => {
  return async (dispatch) => {
    try {
      const response = await axios.login(content);
      window.localStorage.setItem('userInfo', JSON.stringify(response))
      dispatch({
        type: LOGIN_SUCCESS,
        content: response,
      })
     
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE
      })
    }
  }
}

export const logupSubmit = content => {
  return async (dispatch) => {
    try {
        dispatch({
          type: LOGUP_SUCCESS,
          content: await axios.logup(content),
        })
    } catch (error) {
      dispatch({
        type: LOGUP_FAILURE
      })
    }
  };
};

export const startConnect = ()=>{
  return async (dispatch) => {
    try {
      const loginInfo = JSON.parse(window.localStorage.getItem('userInfo') || '{}')
      console.log("start connect socket")
      const socket = startSocket(loginInfo.token)
      dispatch({
        type: CONNECT_SUCCESS,
        socket
      })
    } catch (error) {
      dispatch({
        type: CONNECT_FAILURE
      })
    }
  };
}