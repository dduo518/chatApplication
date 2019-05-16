import React from "react"
import UserLists from '../../components/userLists'
import GroupLists from '../../components/groupList'
import ChatWindow from '../../components/chatWindow'
import { Layout } from 'element-react';
export default class ChatContent extends React.Component {
  render() {
    return (
      <Layout.Row gutter="20">
        <Layout.Col span="6">
          <GroupLists name='group' />
        </Layout.Col>
        <Layout.Col span="12">
          <ChatWindow name='ChatWindow' />
        </Layout.Col>
        <Layout.Col span="6">
          <UserLists name='UserLists' />
        </Layout.Col>
      </Layout.Row>
    )
  }
}