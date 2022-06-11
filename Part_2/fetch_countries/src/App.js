// Phonebook Exercise 2.6-2.11
import { useState, useEffect } from 'react'
import axios from 'axios'
import FilterInput from './components/FilterInput'
import CountriesResults from './components/CountriesResults'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('Beginning of countries effect')
    axios.get('https://restcountries.com/v3.1/all')
    .then((response) => {
      console.log("List of countries obtained")
      setCountries(response.data)
    })
  }, [])

  // console.log("Render", countries.length, "countries")
  // console.log(countries)

  // Returns a new array either the full country list or a filter one
  const filterCountries = newFilter
    ? countries.filter(country => country.name.common.includes(newFilter)) //If true return this array
    : [] //If false return this array

  return (
    <div>
      <FilterInput newFilter={newFilter} setNewFilter={setNewFilter}/>
      {console.log(filterCountries)}
      <CountriesResults filterCountries={filterCountries}/>
    </div>
  )
}

export default App