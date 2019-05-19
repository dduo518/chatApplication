import React from 'react'
import Item from './item'
import { connect } from 'react-redux';
import { getLists } from "../redux/selectors";
const Lists = ({ lists, index }) => {
  return (
  <ul className='list'>
    {lists && lists.length
      ? lists.map((item) => {
        return <Item key={`item-${item.id}`} item={item} type={index} />;
      })
        : `no ${index} list!`}
  </ul>
  )
};

const mapStateToProps = state => {
  const { lists, index } = getLists(state, state.menuTab.index);
  if (index === 'USER') {
    return {
      lists: lists.map(item => transformUserName(item)),
      index
    }
  } else {
    return {
      lists: lists.map(item => transformGroupName(item)),
      index
    }
  }
}

const transformUserName = (item) => ({ ...item, id: item.userId, name: item.userName })
const transformGroupName = (item) => ({ ...item, id: item.groupId, name: item.groupName })

export default connect(mapStateToProps)(Lists);