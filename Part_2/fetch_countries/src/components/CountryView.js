import { useState, useEffect } from "react"
import axios from "axios"

const CountryView = ({country, display}) => {
    const [weather, setWeather] = useState({})
    const api_key = process.env.REACT_APP_WEATHER_API_KEY

    console.log(country, weather)

    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=imperial&appid=${api_key}`)
        .then((response) => {
            console.log(response)
            setWeather(response.data)
        })
    },[])

    console.log(country, weather)
    // console.log(weather, "display:", display)
    
    if (display) {
        return (
            <div>
              <h2>{country.name.common}</h2>
              <p>capital: {country.capital[0]}</p>
              <p>area: {country.area}</p>
      
              <h3>languages:</h3>
              <ul>
                {/* {console.log(Object.values(filterCountries[0].languages))} */}
                {Object.values(country.languages).map(language => 
                    <li key={`${country.name.common}-${language}`}>{language}</li>
                  )}
              </ul>
              <h3>Flag</h3>
              <img src={country.flags.png}></img>
              <CountryWeather name={country.name.common} weather={weather} />

              {/* {console.log("Weather", weather)} */}
            </div>
          )
    }
    
}

const CountryWeather = ({name, weather}) =>{
    if(Object.keys(weather).length !==0){ //Prevents the app from breaking when it renders the components before recieving the weather api data
        return(
            <div>
                <h2>Weather in {name}</h2>
                <p>temperature {weather.main.temp} Fahrenheit</p>
                <p>wind {weather.wind.speed} m/s</p>
            </div>
        )
    }
}

export default CountryView