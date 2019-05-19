import React from 'react'
import { connect } from 'react-redux'
import { startConnect } from '../redux/actions'
class ChatWindow extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
  }
  render() {
    return (
      <div className="chatRecord">
        chatRecord
      </div>
    )
  }
  async componentDidMount() {
    console.log('start connect')
    const socket = await this.props.startConnect()
    socket.on(this.props.appState.login.userId, (message) => {
      console.log(message)
    })
  }
}


export default connect(
  state => ({ appState: state }),
  { startConnect }
)(ChatWindow)