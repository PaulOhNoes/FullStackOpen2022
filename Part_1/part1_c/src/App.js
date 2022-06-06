// Part 1.C - Component state, even handlers

// const Hello = (props) => {
//   // const name = props.name
//   // const age = props.age
//   const {name, age} = props

//   // const bornYear = () => {
//   //   const yearNow = new Date().getFullYear()
//   //   return yearNow - age

//   const bornYear = () => new Date().getFullYear() - age

//   return (
//     <div>
//       <p>Hello {name}, you are {age} years old</p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }

// const App = () => {
//   const name = 'Peter'
//   const age = 10

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name='Maya' age={26+10} />
//       <Hello name={name} age={age} />
//     </div>
//   )
// }

// **Page re-rendering**
// const App = (props) => {
//   const {counter} = props
//   return (
//     <div>{counter}</div>
//   )
// }

//**States**
// import {useState} from 'react'

// const App = () => {
//   const [counter, setCounter ] = useState(0)

//   setTimeout(
//     () => setCounter(counter + 1),
//     1000
//   )

//   return (
//     <div>{counter}</div>
//   )
// }

//**Event Handling**
import {useState} from 'react'
const App = () => {
  const [counter, setCounter] = useState(0)

  // const handleClick = () => {
  //   console.log('clicked')
  // }

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return(
    <div>
      <Display counter={counter} />
      <Button name='plus' function={increaseByOne} />
      <Button name='minus' function={decreaseByOne} />
      <Button name='reset' function={setToZero} />
    </div>
  )
}

const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.function}>
      {props.name}
    </button>
  )
}

export default App;
