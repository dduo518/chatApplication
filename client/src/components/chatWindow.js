import React from 'react'
import { connect } from 'react-redux'
import { startConnect } from '../redux/actions'
import  MessageItem  from './messsageItem'
class ChatWindow extends React.Component {
  
  render() {
    const { messages } = this.props.appState.chat
    const { userId } = this.props.appState.login
    return (
      <div className="chatRecord">
        <ul>
          {messages.map(item =>
            (<MessageItem
              key={`item-${item.msgId}`}
              item={item}
              userId={userId}
            />))}
        </ul>
      </div>
    )
  }
  async componentDidMount() {
    console.log('start connect')
    this.props.startConnect()
  }
}


export default connect(
  state => ({ appState: state }),
  { startConnect }
)(ChatWindow)