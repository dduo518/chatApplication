import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Header from '../page/header';
import ChatContent from '../page/chatContent';
 
import { Layout } from 'element-react';
import MenuTab from '../components/menuTab'  
export default () => {
  return (
    <Router> 
        <Header title='chat' />
        <Layout.Row className='chatPannel' type='flex'>
          <Layout.Col offset='2' span='6'> 
            <MenuTab /> 
          </Layout.Col>
          <Layout.Col span='14'>
            <ChatContent/>
          </Layout.Col>
        </Layout.Row> 
    </Router>
  );
}

