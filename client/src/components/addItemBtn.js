import React from 'react';
import { connect } from 'react-redux'
import { Button } from 'element-react';
const AddItemBtn = ({}) => {
  return (
    <div className='btn'>
      <Button type='primary' icon='plus'></Button>
    </div>
  )
}

export default connect(
  null,
  {  }
)(AddItemBtn)