// A more complex state, debugging React Apps
// import { useState } from "react";

// const App = () => {
//   // const [left, setLeft] = useState(0)
//   // const [right, setRight] = useState(0)
//   const [clicks, setClicks] = useState({
//     left: 0,
//     right: 0,
//   })

//   const handleLeftClick = () => {
//     const newClicks = {
//       left: clicks.left + 1,
//       right: clicks.right,
//     }
//     setClicks(newClicks)
//   }

//   const handleRightClick = () => {
//     const newClicks = {
//       left: clicks.left,
//       right: clicks.right + 1,
//     }
//     setClicks(newClicks)
//   }

//   return (
//     <div>
//       {clicks.left}

//       <button onClick={handleLeftClick}>
//         left
//       </button>

//       <button onClick={handleRightClick}>
//         right
//       </button>

//       {clicks.right}
//     </div>
//   )
// }

// **Handling Arrays
import { useState } from "react";

const History = (props) => {
  if (props.allClicks.length === 0){
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  else {
    return (
      <div>
        button press history: {props.allClicks.join(' ')}
      </div>
    )
  }  
}

const Button = (props) => {
  return(
    <button onClick={props.onClick}>{props.name}</button>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} name='left'/>
      <Button onClick={handleRightClick} name='right'/>
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}

export default App;
