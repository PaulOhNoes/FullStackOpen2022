import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import FilterInput from "./components/FilterInput"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { initializeAnecdotes } from "./reducers/anecdoteReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <Notification />
      <FilterInput />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App