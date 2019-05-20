import React from 'react';
import { connect } from 'react-redux'
import { Menu } from 'element-react';
import Lists from '../components/lists'; 
import EditGroupBtn from '../components/editGroupBtn'; 
import { exchangeIndex, getGroupList, getUserList } from '../redux/actions'
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
        <EditGroupBtn list={this.props.appState.menuTab.userLists} selectList={[]}/>
      </div>
    )
  }
  onSelect(index) { 
    console.log('change')
    this.props.exchangeIndex(index)
    return false;
  }
  componentDidMount() {
    this.props.getGroupList()
    this.props.getUserList()
  }
}

export default connect(
  state => ({ appState: state }),
  { exchangeIndex, getGroupList, getUserList }
)(MenuTab)