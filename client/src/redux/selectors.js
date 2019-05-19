import { MENU } from './constants'
export const getLists = (store, index) => {
  switch (index) {
    case MENU.GROUP:
      return { lists: store.menuTab.groupLists, index: store.menuTab.index};
    default:
      return { lists: store.menuTab.userLists, index: store.menuTab.index};
  }
};
