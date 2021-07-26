import React, { useState } from "react"
import { Link } from "react-router-dom"

function FilterOptions(props) {
  const { dataOptions, requestApi } = props

  const categoryInitializer = dataOptions.categories.reduce((obj, cat) => {
    const propName = cat.toLowerCase()
    obj[propName] = false
    return obj
  }, {})

  const [formState, setFormState] = useState({
    categories: categoryInitializer,
    year: "",
    match: ""
  })

  function handleCategoryClick(event) {
    const categoryButtonName = event.target.defaultValue.toLowerCase()
    setFormState((prevState) => {
      return {
        ...prevState,
        categories: {
          ...prevState.categories,
          [categoryButtonName]: !prevState[categoryButtonName]
        }
      }
    })
  }

  const categoryInputs = dataOptions.categories.map((category, i) => (
    <input
      key={i}
      className={`filterCategoryBtn ${
        formState.categories[category.toLowerCase()] && "selected"
      }`}
      type="button"
      value={category}
      onClick={handleCategoryClick}
    />
  ))
  const yearOptions = dataOptions.year.map((availYear, i) => (
    <option key={i} value={availYear}>
      {availYear}
    </option>
  ))
  const matchOptions = dataOptions.match.map((availMatch, i) => (
    <option key={i} value={availMatch}>
      {availMatch}
    </option>
  ))

  function handleSubmit(event) {
    event.preventDefault()
    requestApi("post", "/questions/filter", formState)
  }

  function handleChange(event) {
    console.log(event.target.value)
    setFormState((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value
      }
    })
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <h2>Search for Questions:</h2>
        <p>Filter by category: {categoryInputs}</p>
        <label>
          Filter by year:{" "}
          <select name="year" onChange={handleChange}>
            <option value="">Year</option>
            {yearOptions}
          </select>
        </label>
        <label>
          Filter by match:{" "}
          <select name="match" onChange={handleChange}>
            <option value="">Match</option>
            {matchOptions}
          </select>
        </label>
        <button>Get Practice Questions</button>
      </form>
    </React.Fragment>
  )
}

export default FilterOptions
