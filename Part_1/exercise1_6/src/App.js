// exercise 1.6 - 1.14
import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const headers = ['give feedback', 'statistics']
  const buttons = [
    {
      name: 'good',
      value: good * 1,
      count: good,
      onClick: function() {
        setGood(good+1)
      }
    },
    {
      name: 'neutral',
      value: neutral * 0,
      count: neutral,
      onClick: function() {
        setNeutral(neutral+1)
      }
    },
    {
      name: 'bad',
      value: bad * -1,
      count: bad,
      onClick: function() {
        setBad(bad+1)
      }
    },
  ]

  const total_feedback = () => {
    return good + neutral + bad
  }

  const avg_feedback = () => {
    return (buttons[0].value + buttons[1].value + buttons[2].value) / total_feedback()
  }

  const pos_feedback = () => (good / total_feedback() * 100).toString() + ' %'

  return (
    <div>
      <Header header={headers[0]}/>
      <Button onClick={buttons[0].onClick} name={buttons[0].name}/>
      <Button onClick={buttons[1].onClick} name={buttons[1].name}/>
      <Button onClick={buttons[2].onClick} name={buttons[2].name}/>
      
      <Header header={headers[1]}/>

      <Statistics buttons = {buttons}
                  total={total_feedback()} 
                  avg={avg_feedback()}
                  pos={pos_feedback()} />
    </div>
  )
}

const Header = ({header}) => {
  return (
    <h1>{header}</h1>
  )
}

const Button = ({onClick, name}) => {
  return (
    <button onClick={onClick}>{name}</button>
  )
}

const Display = ({name, value}) => {
  return (
    <p>{name} {value}</p>
  )
}

const Statistics = ({buttons,total, avg, pos}) =>{
  if (total !== 0) {
    return(
      <div>
        <Display name={buttons[0].name} value={buttons[0].count}/>
        <Display name={buttons[1].name} value={buttons[1].count}/>
        <Display name={buttons[2].name} value={buttons[2].count}/>
        <p>all {total}</p>
        <p>average {avg}</p>
        <p>positive {pos}</p>
      </div>
    )
  }
  else {
    return (
      <h4>No feedback given</h4>
    )
  }
}

export default App