import React from 'react';
import { connect } from 'react-redux';

const MessageItem = ({ item, userId }) => (
  <li className={item.from === userId ? 'isMe' : ''}>
    {/** this will refactor public  method */}
    <p className='recordTime'>{item.from !== userId ? item.fromName+':' : ''} {new Date(item.createdTime).toLocaleString()}</p>
    {item.message}
  </li>
);

export default connect(
  null,
  {  }
)(MessageItem);
