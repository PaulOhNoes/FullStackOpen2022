import CountryView from "./CountryView"
import CountryList from "./CountryList"

const CountriesResults = ({filterCountries}) => {
  const numOfCountries = filterCountries.length
  // console.log("How many filtered countries", numOfCountries)
  
  // render components
  if (numOfCountries === 0){
    return (
      <h2>{numOfCountries} countries found</h2>
    )
  }
  else if (numOfCountries === 1) {
    // console.log("test", filterCountries[0])
    return (
      <CountryView key={filterCountries[0].name.common} country={filterCountries[0]} display={true}/>
    )
  }
  else if (numOfCountries <= 10){
    // console.log("10 or less countries")
    return (
      <div>
        <h2>{numOfCountries} countries found</h2>
        <ul>
          {filterCountries.map((country) =>
              <CountryList key={country.name.common} country={country}/>
            )}
        </ul>
      </div>
    )
  }
  else {
    // console.log("Too many countries")
    return(
      <h2>Too many matches, specify another filter</h2>
    )  
  }
    
}

export default CountriesResults