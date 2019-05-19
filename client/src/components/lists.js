import React from 'react'
import Item from './item'
import { connect } from 'react-redux';
import { getLists } from "../redux/selectors";
const Lists = ({ lists, index }) => {
  return (
  <ul>
    {lists && lists.length
      ? lists.map((item, index) => {
        return <Item key={`item-${item.id}`} item={item} />;
      })
        : `no ${index} list!`}
  </ul>
  )
};

const mapStateToProps = state => {
  const {lists,index} = getLists(state, state.menuTab.index);
  return { lists, index };
}
export default connect(mapStateToProps)(Lists);