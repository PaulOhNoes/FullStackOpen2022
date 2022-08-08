import { configureStore } from "@reduxjs/toolkit"
import anecdotesReducer from '../reducers/anecdoteReducer'
import notificationReducer from "../reducers/notificationReducer"
import filterReducer from "../reducers/filterReducer"

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
    notifications: notificationReducer
  }
})

export default store