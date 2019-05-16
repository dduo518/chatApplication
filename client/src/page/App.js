import React from 'react';
import './App.css';
import ChatContent from './base/chatContent'
import Header from './base/header'

function App() {
  return (
    <div className="App">
      <Header title="chat" />
      <ChatContent />
    </div>
  );
}
export default App;
