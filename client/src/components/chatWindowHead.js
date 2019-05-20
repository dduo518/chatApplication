import React from 'react'
import { connect } from 'react-redux'
const ChatWindowHead = ({userName}) => {
    return (
      <div className="chatHead">
        <h5>chatting with:{userName}</h5>
      </div>
    )
}

const mapStateToProps = state => {
  return { userName: state.chat.name };
}

export default connect(
  mapStateToProps,
  {}
)(ChatWindowHead);