import React, { useState } from "react"
import { Link } from "react-router-dom"

function FilterOptions(props) {
  console.log("FilterOptions props: ", props)
  const categoryInitializer = props.dataOptions.categories.reduce(
    (obj, cat) => {
      const propName = cat.toLowerCase()
      obj[propName] = false
      return obj
    },
    {}
  )
  const [categoryState, setCategoryState] = useState(categoryInitializer)

  function handleCategoryClick(event) {
    const categoryButtonName = event.target.defaultValue.toLowerCase()
    setCategoryState((prevState) => {
      return {
        ...prevState,
        [categoryButtonName]: !prevState[categoryButtonName]
      }
    })
  }

  const categoryInputs = props.dataOptions.categories.map((category, i) => (
    <input
      key={i}
      className={`filterCategoryBtn ${
        categoryState[category.toLowerCase()] && "selected"
      }`}
      type="button"
      value={category}
      onClick={handleCategoryClick}
    />
  ))
  const yearOptions = props.dataOptions.year.map((availYear, i) => (
    <option key={i} value={availYear}>
      {availYear}
    </option>
  ))
  const matchOptions = props.dataOptions.match.map((availMatch, i) => (
    <option key={i} value={availMatch}>
      {availMatch}
    </option>
  ))

  return (
    <React.Fragment>
      <form>
        <h2>Search for Questions:</h2>
        <p>Filter by category: {categoryInputs}</p>
        <label>
          Filter by year:{" "}
          <select name="year">
            <option value="">Year</option>
            {yearOptions}
          </select>
        </label>
        <label>
          Filter by match:{" "}
          <select name="match">
            <option value="">Match</option>
            {matchOptions}
          </select>
        </label>
      </form>
      <Link to="/feed" className="practiceBtn">
        Get Practice Questions!
      </Link>
    </React.Fragment>
  )
}

export default FilterOptions
