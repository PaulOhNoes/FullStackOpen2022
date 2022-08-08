import React from 'react';
import ReactDOM from 'react-dom/client'
import {combineReducers} from 'redux'
import App from './app'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import noteReducer, { createNote } from './reducers/noteReducer'
import filterReducer, { filterChange } from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

console.log(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)