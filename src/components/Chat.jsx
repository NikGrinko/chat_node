import React, { useState, useRef, useEffect } from 'react';
import socket from '../socket';
const Chat = ({ users, messages, userName, roomId, onAddMessage }) => {
    const messageRef = useRef(null)

    useEffect(() => {
        messageRef.current.scrollTo(0, 99999)
    }, [messages])

    const [stateForm, setStateForm] = useState();
    const setMessageValue = (event) => {
        setStateForm(event.target.value)
    }
    const onSendMessage = () => {
        socket.emit('NEW_MESSAGE', {
            text: stateForm,
            userName,
            roomId
        })
        onAddMessage({
            text: stateForm,
            userName,
        })
        setStateForm('')
    }
    console.log('users ', users)
    return (
        <>
            <div className="chat">
                <div className="chat-wrapper">
                    <div className="chat__list">
                        <div className="chat__list-wrapper">
                            <h2 className="room-name">Комната: {roomId}</h2>
                            <h2 className="list-counter">Онлайн ({users.length})</h2>
                            <ul className='chat-users'>
                                {users.map((user, index) => {
                                    return <li key={user + index} className='chat-users__item'>{user}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className='messages'>
                        <div className='messages-wrapper'>
                            <ul ref={messageRef} className='messages__list'>
                                {messages.map((message, index) => {
                                    return <li key={message + index} className='messages__list-item'>
                                        <div className='user-message'>{message.text}</div>
                                        <div className='user-name'>{message.userName}</div>
                                    </li>
                                })}
                            </ul>
                            <div className='messages__form'>
                                <textarea rows='3' value={stateForm} onChange={setMessageValue} className='form-textarea'></textarea>
                                <button onClick={() => onSendMessage()} className='form-button'>Отправить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Chat;