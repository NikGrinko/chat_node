import React, { useState } from 'react';
import socket from '../socket';
import axios from 'axios';
const SignIn = ({ onLogin }) => {
    const [isLoading, setLoading] = useState(false);
    const [signState, setSignState] = useState({
        roomId: '',
        userName: ''
    });
    //Отправка авторизационных данных для комнаты
    const onSubmit = () => {
        if (signState.roomId == '' || signState.userName == '') {
            return alert('Введите корректные данные!');
        }
        setLoading(true);
        axios.post('/rooms', signState)
            .then((res) => { onLogin(signState) })
        setSignState({
            roomId: '',
            userName: ''
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
    const newUserNameNameState = (event) => {
        setSignState((prevState) => {
            return {
                ...prevState,
                userName: event.target.value
            }
        })
    }
    return (
        <>
            <div className='sing-in'>
                <input onChange={newIdState} className='sing-in__id' type='text' placeholder='Room ID' value={signState.roomId} />
                <input onChange={newUserNameNameState} className='sing-in__name' type='text' placeholder='Ваше имя' value={signState.userName} />
                <button disabled={isLoading} onClick={() => onSubmit()}>{isLoading ? 'ВХОД...' : 'ВОЙТИ'}</button>
            </div>
        </>
    )
}

export default SignIn; 