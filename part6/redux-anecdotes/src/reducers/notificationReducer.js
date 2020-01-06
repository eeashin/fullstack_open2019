
const notificationReducer = (state = null, action) => {
    console.log('state noti: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'SET_MSG':
            return action.message
        case 'NULL_MSG':
            return null
        default:
            return state;
    }
}

export const setMessage = (message, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_MSG',
            message
        })
        setTimeout(() => {
            dispatch({
                type: 'NULL_MSG'
            })
        }, time *100)
    }
}

export default notificationReducer