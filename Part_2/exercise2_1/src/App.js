const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

// const App = () => {  
//   const course = {
//     title: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercise: 10,
//       },
//       {
//         name: 'Using props to pass data',
//         exercise: 7,
//       },
//       {
//         name: 'State of a component',
//         exercise: 14,
//       },
//     ],
//   }

//   return(
//     <div>
//       <Header course={course.title}/>
//       <Content part={course.parts[0].name} exercise={course.parts[0].exercise}/>
//       <Content part={course.parts[1].name} exercise={course.parts[1].exercise}/>
//       <Content part={course.parts[2].name} exercise={course.parts[2].exercise}/>
//       <Total total={course.parts[0].exercise + course.parts[1].exercise + course.parts[2].exercise}/>
//     </div>
//   )
// }

// const Header = (props) => {
  
//   return (
//     <h1>{props.course}</h1>
//   )
// }

// const Content = (props) => {
    
//   return (
//     <p>{props.part} - {props.exercise}</p>
//   )
// }

// const Total = (props) => {

//   return(
//     <p>Number of exercises = {props.total}</p>
//   )
// }

export default App;
