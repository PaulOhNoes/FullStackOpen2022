import { useSelector, useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const FilterInput = () => {
  const filter = useSelector(({filter}) => filter)
  const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    // console.log(event.target.value)
    dispatch(setFilter(event.target.value))
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
          filter shown with:
          <input value={filter} onChange={handleFilterChange}/>
      </div>
    </div>
  )
}

export default FilterInput