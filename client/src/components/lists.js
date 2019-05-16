import React from 'react'
export default class Lists extends React.Component {
  render() {
    return (
      <div>
        <h1> this {this.props.type} list</ h1>
      </div>
    )
  }
}