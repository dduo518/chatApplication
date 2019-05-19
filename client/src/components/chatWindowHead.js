import React from 'react'
import { connect } from 'react-redux'
const ChatWindowHead = ({userName}) => {
    return (
      <div className="chatHead">
        <h3>chatting with:{userName}</h3>
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