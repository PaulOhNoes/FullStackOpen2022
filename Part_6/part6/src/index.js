import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './app'
import { Provider } from 'react-redux'

import store from './store'

console.log(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)