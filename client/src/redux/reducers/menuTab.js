import {
  MENU,
  CHANGE_INDEX,
  GET_USERLIST,
  GET_GROUPLIST
} from './../constants'

const initialState = {
  userLists: [],
  groupLists: [],
  index: MENU.USER
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_INDEX: {
      const { content } = action.payload;
      return { ...state, index: content };
    }
    case GET_USERLIST: {
      const { payload } = action;
      return { ...state, userLists: payload };
    }
    case GET_GROUPLIST: {
      const { payload } = action;
      return { ...state, groupLists: payload };
    }
    default:
      return state;
  }
}
