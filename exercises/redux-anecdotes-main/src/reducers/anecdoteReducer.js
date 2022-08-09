import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotes"

export const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote(state, action){
      state.push(action.payload)
    },
    incrementVote(state, action){
      const id = action.payload
      const anecdoteToChage = state.find(a => a.id === id)
      const changedAnecdoteObj = {...anecdoteToChage, votes: anecdoteToChage.votes +  1}
      return(
        state.map(a => a.id !== id ? a : changedAnecdoteObj)
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

// const reducer = (state = initialState, action) => {
//   // console.log('state now: ', state)
//   // console.log('action', action)
//   switch(action.type){
//     case 'INCREMENT':{
//       const id = action.data.id
//       const anecdoteToChange = state.find(a => a.id === id)
//       const changedAnecdoteObj = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
//       return state.map(a => a.id !== id ? a : changedAnecdoteObj)
//     }
//     case 'NEW_NOTE': {
//       return [...state, asObject(action.data.content)]
//     }
//     default:
//       console.log('does this ever work')
//       return state
//   }
// }

// export const incrementVote = (id) => {
//   return(
//     {
//       type: 'INCREMENT',
//       data: {
//         id: id
//       }
//     }
//   )
// }

// export const newAnecdote = (content) => {
//  return({
//     type: 'NEW_NOTE',
//     data: {
//       content: content
//     }
//   })
// }

export const {newAnecdote, incrementVote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdotesService.create(content)
    dispatch(newAnecdote(anecdote))
  }
}

export const updateAnecdoteVote = (obj) => {
  return async dispatch => {
    const changedObj = {...obj, votes: obj.votes + 1}
    const anecdote = await anecdotesService.update(changedObj)
    dispatch(incrementVote(anecdote.id))
  }
}

export default anecdoteSlice.reducer