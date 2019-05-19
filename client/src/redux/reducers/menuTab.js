import { MENU, CHANGE_INDEX } from './../constants'

const initialState = {
  userLists: [],
  groupList: [],
  index: MENU.USER
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_INDEX: {
      const { content } = action.payload;
      return { ...state, index: content };
    }
    default:
      return state;
  }
}
