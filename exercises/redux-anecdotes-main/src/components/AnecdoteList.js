import { useSelector, useDispatch } from 'react-redux'
import { incrementVote} from '../reducers/anecdoteReducer'
import { replaceNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  // const anecdotes = useSelector(({anecdotes}) => anecdotes.sort((a,b) => a.votes - b.votes).reverse()) //sort by descending votes
  const anecdotes = useSelector(({anecdotes, filter}) => 
    anecdotes
      .map(a => a)
      .sort((a,b) => a.votes - b.votes)
      .reverse()
      .filter(anecdotes => anecdotes.content.includes(filter))
  ) // can not manipulate the state
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(incrementVote(anecdote.id))
    dispatch(replaceNotification(`you voted for '${anecdote.content}'`))
    setTimeout( () => {
      dispatch(replaceNotification(''))
    }, 5000)
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