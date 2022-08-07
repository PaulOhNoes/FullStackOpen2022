import React from 'react';
import ReactDOM from 'react-dom/client'

import App from './app'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

// const root = ReactDOM.createRoot(document.getElementById('root'))
// const renderApp = () => {
//   root.render(<App />)
// }

// renderApp()
// store.subscribe(renderApp)