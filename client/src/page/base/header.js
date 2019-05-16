import React from 'react';
export default class Header extends React.Component {
  render() {
    return (
      <div className='headPannel'>
        {this.props.title}
      </div>
    )
  }
}

