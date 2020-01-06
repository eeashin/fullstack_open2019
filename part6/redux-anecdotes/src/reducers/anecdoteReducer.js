import anecdoteService from '../service/anecdotes'

export const voteA = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteService.youVote(votedAnecdote)
    dispatch({
      type: 'VOTE_BY_ID',
      data: updatedAnecdote
    })
  }
}

export const addNew = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => {

  console.log('state now: ', state)
  console.log('action data', action.data)

  switch (action.type) {
    case 'VOTE_BY_ID':
      const id = action.data.id
      return state.filter(a => a.id !== id ? a : action.data)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data.sort((a, b) => b.votes - a.votes)
    default: return state
  }
}

export default anecdoteReducer