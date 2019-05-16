import React from 'react';
import { Layout } from 'element-react';
export default class Header extends React.Component {
  render() {
    return (
      <div className='headPannel'>
        <Layout.Row>
          <Layout.Col span="24">
              {this.props.title}
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
}

