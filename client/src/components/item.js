import React from 'react';
import { connect } from 'react-redux';
import { chatAction } from '../redux/actions';

const Item = ({ item, chatAction }) => (
  <li onClick={() => chatAction(item.userId)}>
    {item.userName}
  </li>
);

// export default Todo;
export default connect(
  null,
  { chatAction }
)(Item);
