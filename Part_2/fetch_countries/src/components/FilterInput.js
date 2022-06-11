const FilterInput = ({newFilter,setNewFilter}) => {
    const handleFilterChange = (event) => {
      console.log(event.target.value)
      setNewFilter(event.target.value)
    }
  
    return (
      <div>
        <div>
            find countries <input value={newFilter} onChange={handleFilterChange}/>
        </div>
      </div>
    )
  }

export default FilterInput