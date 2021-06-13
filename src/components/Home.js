import React from "react"
import { Link } from "react-router-dom"
import FilterOptions from "./FilterOptions"

function Home(props) {
  return (
    <React.Fragment>
      <h2>Welcome to Varsity Quiz App!</h2>
      <p>
        To get started, choose the questions you want. <br />
        If no filters are applied, you will get all questions in the database.
      </p>
      <FilterOptions dataOptions={props.dataOptions} />
    </React.Fragment>
  )
}

export default Home
