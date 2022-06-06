// ** Basics **
// const App = () => {
//   const now = new Date()
//   const a = 10
//   const b = 20

//   return (
//     <div>
//       <p>Hello World, it is {now.toString()}</p>
//       <p>
//         {a} plus {b} is {a+b}
//       </p>
//     </div>
//   )
// }

// Mutliple components and props
const Hello = (props) => {
  return(
    <div>
      <p>Hello {props.name}. You look {props.looks}!</p>
    </div>
  )
}

const App = () => {
  const bernie = "Bernie"
  const fresh = "Fresh"
  return (
    <div>
      <h1>Greatings world!</h1>
      <Hello name="Paul" looks="Handsome"/>
      <Hello name="Sabrina" looks="Ugly"/>
      <Hello name={bernie} looks={fresh}/>
      <Hello name="Jacob" looks="Ugly"/>
      <Hello name="Benito" looks="Ugly"/>
      <Hello name="Chris" looks="Ugly"/>
    </div>
  )
}

export default App