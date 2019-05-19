import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout } from 'element-react';
import Header from './header';
import ChatContent from './chatContent';
import MenuTab from './menuTab'
class Page extends React.Component {
  render() {
    const { isLogin } = this.props;
    if (isLogin) {
        return ( 
          <div>
            <Header title='chat' />
            <Layout.Row className='chatPannel' type='flex'>
              <Layout.Col offset='2' span='6'>
                <MenuTab />
              </Layout.Col>
              <Layout.Col span='14'>
                <ChatContent />
              </Layout.Col>
            </Layout.Row>
          </div>
        );
    } else {
      return (<Redirect to="/login" />)
    }
  }
}


const mapStateToProps = (state) => {
  return { isLogin: state.login.isLogin}
}
export default connect(
  mapStateToProps,
  {  }
)(Page);