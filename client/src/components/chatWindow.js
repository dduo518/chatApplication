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
  componentDidMount() {
    console.log('start connect')
    this.props.startConnect()
  }
}


export default connect(
  state => ({ appState: state }),
  { startConnect }
)(ChatWindow)