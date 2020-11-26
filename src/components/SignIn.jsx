import React from 'react';
import socket from '../socket';
const SignIn = () => {
    return (
        <>
            <div className='sing-in'>
                <input className='sing-in__id' type='text' placeholder='Room ID' />
                <input className='sing-in__name' type='text' placeholder='Ваше имя' />
                <button>Войти</button>
            </div>
        </>
    )
}

export default SignIn;