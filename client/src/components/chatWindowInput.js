import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'element-react';
import { sendMsg } from '../redux/actions'
class ChatWindowInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  sendMsgHandle() {
    this.props.sendMsg(this.state.value)
    this.setState({ value: '' });
  }
  render() {
    const isChatting = this.props.appState.chat.id !== undefined ? false : true;
    return (
      <div className="chatInput">
        <input
          disabled={isChatting}
          type="text"
          value={this.state.value}
          onChange={this.handleChange}>
        </input>
        <Button
          disabled={isChatting}
          type='primary'
          icon='message'
          onClick={this.sendMsgHandle.bind(this)}
        >Send</Button>
      </div>
    )
  }
}


export default connect(
  state => ({ appState: state }),
  { sendMsg}
)(ChatWindowInput);