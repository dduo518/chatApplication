import React from "react"
import UserLists from '../../components/userLists'
import GroupLists from '../../components/groupList'
import ChatWindow from '../../components/chatWindow'

export default class ChatContent extends React.Component {
  render() {
    return (
      <div className='chatContent'>
        <GroupLists name='group' />
        <ChatWindow name='ChatWindow' />
        <UserLists name='UserLists' />
      </div>
    )
  }
}