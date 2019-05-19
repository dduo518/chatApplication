import React from 'react';
import { connect } from 'react-redux';
import Lists from './../components/lists'
class User extends React.Component {
  render() {
    return (
      <div className={ this.props.className }>
        <Lists type='user' /> 
      </div>
    )
  }
}

export default connect(
  null,
  { }
)(User);