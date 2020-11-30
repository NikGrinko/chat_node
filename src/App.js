import React, { useReducer } from 'react';
import './styles/main.scss';
import SignIn from './components/SignIn';
import reducer from './reducer';

function App() {

  const [state, dispatch] = useReducer(reducer, {
    joined: false
  });
  //Action creater для авторизации
  const onLogin = () => {
    dispatch({
      type: 'JOINED',
      payload: true
    })
  };
  return (
    <div className="App">
      <div className='container'>
        {!state.joined && <SignIn onLogin={onLogin} />}
      </div>
    </div>
  );
}

export default App;
