//Редьюсер авторизации
const reducer = (state, action) => {
    switch (action.type) {
        case 'JOINED':
            return {
                ...state,
                joined: action.payload
            }
        default:
            return state
    }
}
export default reducer;