import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdoteVote} from '../reducers/anecdoteReducer'
import { setNotifcation } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = useSelector(({anecdotes, filter}) => 
    anecdotes
      .map(a => a)
      .sort((a,b) => a.votes - b.votes)
      .reverse()
      .filter(anecdotes => anecdotes.content.includes(filter))
  ) // can not manipulate the state

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(updateAnecdoteVote(anecdote))
    dispatch(setNotifcation(`you voted for '${anecdote.content}'`, 5))
  }
  return(
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList