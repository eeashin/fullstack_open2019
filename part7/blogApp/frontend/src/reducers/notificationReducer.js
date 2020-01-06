export const setNotification = (text) => {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: 'NULL_MSG', data: '' })
    }, 10000)
    dispatch({
      type: 'SET_MSG',
      data: text ? text : 'Huuhaa'
    })
  }
}

const notificationReducer = (state = '', action) => {
  console.log('notifyReducer', action)
  console.log('notifyReducer', state)
  switch (action.type) {
  case 'SET_MSG':
    return action.data
  case 'NULL_MSG':
    return ''
  default:
    return state
  }
}

export default notificationReducer