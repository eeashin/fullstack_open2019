
const notificationReducer = (state = 'A Message', action) => {
    console.log('state notification: ', state)
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