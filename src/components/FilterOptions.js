import React from "react"
import { Link } from "react-router-dom"

function FilterOptions(props) {
  console.log(props)
  const categoryInputs = props.dataOptions.categories.map((category) => (
    <div className="ck-button">
      <label>
        <input type="checkbox" value={category} />
        <span>{category}</span>
      </label>
    </div>
  ))
  const yearOptions = props.dataOptions.year.map((availYear) => (
    <option value={availYear}>{availYear}</option>
  ))
  const matchOptions = props.dataOptions.match.map((availMatch) => (
    <option value={availMatch}>{availMatch}</option>
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
