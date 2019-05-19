import { combineReducers  } from 'redux'; 
import menuTab from './menuTab'
import chat from './chat'
import login from './login'
export default combineReducers({ menuTab, login, chat});
