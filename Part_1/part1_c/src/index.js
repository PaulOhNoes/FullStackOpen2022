import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

// let counter = 1

// const refresh = () => {
//   ReactDOM.createRoot(document.getElementById('root')).render(
//     <App counter={counter}/>
//   )
// }
  
// // **refreshes 3 times, dry code**
// // refresh()
// // counter += 1
// // refresh()
// // counter += 1
// // refresh()

// // **refreshes infinite times using setInterval**
// setInterval(() => {
//   refresh()
//   counter += 1
// },1000)