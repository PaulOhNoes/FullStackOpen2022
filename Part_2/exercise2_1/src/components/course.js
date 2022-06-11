import React from 'react'

const Course = ({course}) =>{
    const parts = course.parts
  
    const total_exercises = 0
    const sum_exercises = parts.reduce (
      (previousValue, currentValue) => previousValue + currentValue.exercises,
      total_exercises //For first time call back the previous value is 0 instead of index[0] object
    )
  
    // function getTotalExercises() {
    //   let total_exercises = 0
  
    //   parts.forEach(Element => {
    //     total_exercises += Element.exercises
    //   })
  
    //   return total_exercises
    // }
  
    return (
      <div>
        <h1>{course.name}</h1>
        <div>
          {parts.map(part => 
            <p key={part.id}>{part.name} - {part.exercises}</p>
            )}
          
          <p>Total of {sum_exercises} exercises</p>
        </div>
        
      </div>
    )
  }
  
  export default Course