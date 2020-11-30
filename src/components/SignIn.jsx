import React, { useState } from 'react';
import socket from '../socket';
import axios from 'axios';
const SignIn = ({ onLogin }) => {
    const [isLoading, setLoading] = useState(false);
    const [signState, setSignState] = useState({
        roomId: '',
        name: ''
    });
    //Отправка авторизационных данных для комнаты
    const onSubmit = () => {
        if (signState.roomId == '' || signState.name == '') {
            return alert('Введите корректные данные!');
        }
        setLoading(true);
        axios.post('/rooms', signState)
            .then(onLogin())
        setSignState({
            roomId: '',
            name: ''
        })
    }
    //Изменение состояния формы
    const newIdState = (event) => {
        setSignState((prevState) => {
            return {
                ...prevState,
                roomId: event.target.value
            }
        })
    }
    //Изменение состояния формы
    const newNameState = (event) => {
        setSignState((prevState) => {
            return {
                ...prevState,
                name: event.target.value
            }
        })
    }
    return (
        <>
            <div className='sing-in'>
                <input onChange={newIdState} className='sing-in__id' type='text' placeholder='Room ID' value={signState.roomId} />
                <input onChange={newNameState} className='sing-in__name' type='text' placeholder='Ваше имя' value={signState.name} />
                <button disabled={isLoading} onClick={() => onSubmit()}>{isLoading ? 'ВХОД...' : 'ВОЙТИ'}</button>
            </div>
        </>
    )
}

export default SignIn; 