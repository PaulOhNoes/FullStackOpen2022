const App = () => {
  // declare variables
  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14

  // const part1 = {
  //   name: 'Fundamentals of React',
  //   exercise: 10,
  // }

  // const part2 = {
  //   name: 'Using props to pass data',
  //   exercise: 7,
  // }

  // const part3 = {
  //   name: 'State of a component',
  //   exercise: 14,
  // }

  // const course = 'Half Stack application development'
  // const parts = [
  //   {
  //     name: 'Fundamentals of React',
  //     exercise: 10,
  //   },
  //   {
  //     name: 'Using props to pass data',
  //     exercise: 7,
  //   },
  //   {
  //     name: 'State of a component',
  //     exercise: 14,
  //   },
  // ]
  
  const course = {
    title: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercise: 10,
      },
      {
        name: 'Using props to pass data',
        exercise: 7,
      },
      {
        name: 'State of a component',
        exercise: 14,
      },
    ],
  }

  return(
    <div>
      <Header course={course.title}/>
      <Content part={course.parts[0].name} exercise={course.parts[0].exercise}/>
      <Content part={course.parts[1].name} exercise={course.parts[1].exercise}/>
      <Content part={course.parts[2].name} exercise={course.parts[2].exercise}/>
      <Total total={course.parts[0].exercise + course.parts[1].exercise + course.parts[2].exercise}/>
    </div>
  )
}

const Header = (props) => {
  
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
    
  return (
    <p>{props.part} - {props.exercise}</p>
  )
}

const Total = (props) => {

  return(
    <p>Number of exercises = {props.total}</p>
  )
}

export default App;
