const CHAT_ACTION = "CHAT_ACTION";
const CHANGE_INDEX = "CHANGE_INDEX";
let nextTodoId = 0;
export const chatAction = content => ({
  type: CHAT_ACTION,
  payload: {
    id: ++nextTodoId,
    content
  }
});

export const exchangeIndex = content => ({
  type: CHANGE_INDEX,
  payload: {
    content
  }
})
