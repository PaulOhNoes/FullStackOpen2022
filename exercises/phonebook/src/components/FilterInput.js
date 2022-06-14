const FilterInput = ({newFilter,setNewFilter}) => {
    const handleFilterChange = (event) => {
      console.log(event.target.value)
      setNewFilter(event.target.value)
    }
  
    return (
      <div>
        <h2>Phonebook</h2>
  
        <div>
            filter shown with:
            <input value={newFilter} onChange={handleFilterChange}/>
        </div>
      </div>
    )
  }

export default FilterInput