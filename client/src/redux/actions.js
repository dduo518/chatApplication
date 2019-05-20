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
  CONNECT_FAILURE,
  MENU,
  SEND_MSG,
} from './constants';
import * as axios from './../configs/axios'
import {
  startSocket,
  sendPkgMsg,
  sendMsgToServerBySocket,
  errorHandel,
  listenPrivateChannel,
  listenGroupChannel
} from './../io/connect'
import store from './../redux/store'

export const chatAction = content => {
  return async (dispatch) => {
    const { type } = content;
    switch (type){
      case MENU.USER: {
        content.messages = await axios.getMessageList({
          from: store.getState().login.userId,
          to: content.item.userId,
        });
        break
      }
      case MENU.GROUP: {
        content.messages = await axios.getGroupMessageList({
          groupId: content.item.groupId,
        });
        break
      }
      default:{
        break;
      }
    }
    dispatch({
      type: CHAT_ACTION,
      payload: content
    });
  }
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

export const getGroupList = () => {
  return async (dispatch) => {
    const groupListResp = await axios.groupList();
    dispatch({  
      type: GET_GROUPLIST,
      payload: groupListResp
    })
  } 
}

export const getUserList = () => {
  return async (dispatch) => {
    const userListResp = await axios.userList();
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
      const state = store.getState()
      console.log("start connect socket")
      const socket = startSocket(state.login.token)
      
      dispatch({
        type: CONNECT_SUCCESS,
        socket
      })

      errorHandel()
      
      // private new message
      listenPrivateChannel(dispatch) 

      // listen group room
      const groupInfos = state.login.groupInfo||[]
      groupInfos.forEach(item => listenGroupChannel(item.groupId, dispatch))
      
      return socket
    } catch (error) {
      dispatch({
        type: CONNECT_FAILURE
      })
    }
  };
}

export const sendMsg = (content) => {
  return async (dispatch) => { 
    const state = store.getState()
    const message = sendPkgMsg(content)
    dispatch({
      type: SEND_MSG,
      payload: message
    })
    if (state.chat.type === 'GROUP') {
      await sendMsgToServerBySocket(message, 'chatGroup', dispatch)
    } else {
      await sendMsgToServerBySocket(message, 'chat', dispatch)
    }
  }
}
  
export const createGroup = (content) => {
  return async (dispatch) => {
    try {
      await axios.createGroup(content);
      const groupListResp = await axios.groupList();
      dispatch({
        type: GET_GROUPLIST,
        payload: groupListResp
      })
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE
      })
    }
  }
}