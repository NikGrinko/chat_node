//Редьюсер авторизации
const reducer = (state, action) => {
    switch (action.type) {
        case 'JOINED':
            return {
                ...state,
                joined: true,
                roomId: action.payload.roomId,
                userName: action.payload.userName
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload
            }
        case 'SET_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case 'SET_DATA':
            return {
                ...state,
                messages: action.payload.messages,
                users: action.payload.users
            }
        default:
            return state
    }
}
export default reducer;