import React from 'react'
import Lists from './../components/lists'
export default class User extends React.Component {
  render() {
    return (
      <div className={ this.props.className }>
        <Lists type='user' /> 
      </div>
    )
  }
  componentDidMount() {
    console.log("user componentWillUnmount")
  }
}