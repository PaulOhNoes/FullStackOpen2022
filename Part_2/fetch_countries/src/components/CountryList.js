import { useState } from 'react'
import CountryView from './CountryView'
const CountryList = ({country}) => {
    const [display, setDisplay] = useState(false)

    return (
        <li>
            {country.name.common} 
            <button onClick={() =>{
                // setDisplay(true)
                setDisplay(!display)
            }}>Show</button>

            <CountryView country={country} display={display}/>
        </li> 
    )
}

export default CountryList