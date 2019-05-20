import React from 'react';
import { connect } from 'react-redux';
import { chatAction } from '../redux/actions';
import { Button } from 'element-react';
class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow:false
    }
  }
  startChat(e) {
    this.props.chatAction({ item: this.props.item, type: this.props.type })
    return false;
  }
  editeGroup(e) {
    return false;
  }
  render() {
    return (
      <li
        onClick={this.startChat.bind(this)}>
        {this.props.item.name}
        {this.props.type === 'GROUP' ? (<Button
          type='mini'
          icon='edit'
          onClick={this.editeGroup.bind(this)}
        ></Button>) : ''}
      </li>
    );
  }
}

export default connect(
  null,
  { chatAction }
)(Item);
