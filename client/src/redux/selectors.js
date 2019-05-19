import { MENU } from './constants'
export const getLists = (store, index) => {
  switch (index) {
    case MENU.GROUP:
      return { lists: store.menuTab.groupList, index: store.menuTab.index};
    default:
      return { lists: store.menuTab.groupList, index: store.menuTab.index};
  }
};
