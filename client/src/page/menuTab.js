import React from 'react';
import { Menu } from 'element-react';
import Lists from '../components/lists'; 
import { connect } from 'react-redux'
import { exchangeIndex } from '../redux/actions'
import { MENU } from '../redux/constants'

class MenuTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: MENU.USER
    };
  }
  render() {
    return (
      <div className='menu'>
        <div >
          <Menu defaultActive={MENU.USER}  mode='horizontal' onSelect={this.onSelect.bind(this)}>
            <Menu.Item index={MENU.USER}>
              {MENU.USER}
            </Menu.Item>
            <Menu.Item index={MENU.GROUP}>
              {MENU.GROUP}
            </Menu.Item>
          </Menu> 
        </div>
        <div className='menuList'>
          <Lists />
        </div> 
      </div>
    )
  }
  
  onSelect(index) { 
   this.props.exchangeIndex(index)
  }
}

export default connect(
  null,
  { exchangeIndex }
)(MenuTab)