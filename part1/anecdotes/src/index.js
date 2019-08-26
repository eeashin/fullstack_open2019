import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
      {text}
  </button>
)

const Votes = ({selected,votes}) => (
  <p>Has {votes[selected]} votes</p>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0));

  const vote = (selected) => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy)
};

  return (
    <div>
      <h3>Anecdode of the day</h3>
      <p>{props.anecdotes[selected]}</p>
      <Votes votes={votes} selected={selected}/>
      <Button handleClick={() => vote(selected)} text="vote"/>
      <Button handleClick={() => setSelected(Math.floor(Math.random() * props.anecdotes.length))} text="next anecdote"/>
      <h3>Anecdote with most votes</h3>
      <p>{props.anecdotes[votes.indexOf(Math.max.apply(null, votes))]}</p>
      <Votes votes={votes} selected={votes.indexOf(Math.max.apply(null, votes))}/>  
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)