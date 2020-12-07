import React, { useReducer, useEffect } from 'react';
import './styles/main.scss';
import SignIn from './components/SignIn';
import Chat from './components/Chat.jsx';
import reducer from './reducer';
import socket from './socket';
import axios from 'axios';

function App() {

  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: []
  });
  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users
    })
  }
  //Action creater для авторизации
  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj
    });
    socket.emit('ROOM_JOIN', obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`)
    dispatch({
      type: 'SET_DATA',
      payload: data
    })
  };
  const addMessage = (message) => {
    dispatch({
      type: 'SET_MESSAGE',
      payload: message
    })
  }

  useEffect(() => {
    socket.on('ROOM:JOINED', setUsers);
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, [])


  return (
    <div className="App">
      <div className='container'>
        {!state.joined ? <SignIn onLogin={onLogin} />
          : <Chat {...state} onAddMessage={addMessage} />}
      </div>
    </div>
  );
}

export default App;
