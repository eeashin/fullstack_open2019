import anecdoteService from '../service/anecdotes'
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const anecdoteObj = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(anecdoteObj)

export const voteA = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = {...anecdote, votes: anecdote.votes +1}
    const updatedAnecdote = await anecdoteService.youVote(votedAnecdote)
  dispatch({
    type: 'VOTE_BY_ID',
    data: updatedAnecdote
  })
  }  
}

// export const addNew = (data) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     data
//     // {
//     //   content: newData,
//     //  // id: getId(),
//     //   // votes: 0
//     // }
//   } 
// }

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
      return action.data
    default: return state
  }
}

export default anecdoteReducer