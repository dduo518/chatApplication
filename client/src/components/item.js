import React from 'react';
import { connect } from 'react-redux';
import { chatAction } from '../redux/actions';

const Item = ({ item,type, chatAction }) => (
  <li onClick={() => chatAction({item, type})}>
    {item.name}
  </li>
);

export default connect(
  null,
  { chatAction }
)(Item);
