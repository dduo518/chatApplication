import React from 'react';
import { Menu } from 'element-react';
import User from '../page/user';
import Group from '../page/group';

const MENU = {
  USER: 'USER',
  GROUP: 'GROUP'
};

const CLASSNAME  = {
  ACTIVE: 'active',
  DEFAULTCLASSNAME:'itemList'
}

export default class MenuTab extends React.Component {
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
          <User className={`${this.changeTab(MENU.USER)}`}/>
          <Group className={`${this.changeTab(MENU.GROUP)}`}/>
        </div>
      </div>
    )
  }
  
  changeTab(data) {
    return `${this.state.index === data ? CLASSNAME.DEFAULTCLASSNAME + ' ' + CLASSNAME.ACTIVE : CLASSNAME.DEFAULTCLASSNAME}`
  }

  onSelect(index) { 
    console.log(index)
    this.setState({ index: index });
  }

  componentDidMount() { 
    console.log("componentWillUnmount")
    console.log(this.state.index)
  }
}