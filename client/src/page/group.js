import React from 'react'
import Lists from './../components/lists'
export default class Group extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        <Lists type='group'/> 
      </div>
    )
  }
}