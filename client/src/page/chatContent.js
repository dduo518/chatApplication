import React from 'react' 
import ChatWindow from '../components/chatWindow'
import ChatWindowHead from '../components/chatWindowHead'
import ChatWindowInput from '../components/chatWindowInput' 
export default class ChatContent extends React.Component {
  render() {
    return (
      <div className='chatWindow'>
        <ChatWindowHead />
        <ChatWindow name='ChatWindow' /> 
        <ChatWindowInput />
      </div> 
    )
  }
}