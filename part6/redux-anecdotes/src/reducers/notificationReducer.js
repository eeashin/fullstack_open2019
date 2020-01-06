
const notificationReducer = (state = null, action) => {
    console.log('state noti: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'SET_MSG':
            return action.message
        default:
            return state;
    }
}

export const setMessage = (message) => {
    return {
        type: 'SET_MSG',
        message
    }
}

export default notificationReducer