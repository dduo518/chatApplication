import React from 'react';
import { connect } from 'react-redux'
import { Layout } from 'element-react';
class Header extends React.Component {
  render() {
    return (
      <div className='headPannel'>
        <Layout.Row>
          <Layout.Col span="24">
            <h1>userName:{this.props.userName}</h1>
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { userName: state.login.userName }
}
export default connect(
  mapStateToProps,
  {  }
)(Header);