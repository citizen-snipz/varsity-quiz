import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QuestionFeed from './QuestionFeed';

function FilterOptions(props) {
  const { dataOptions, requestApi } = props;

  const categoryInitializer = dataOptions.categories.reduce((obj, cat) => {
    const propName = cat.toLowerCase();
    obj[propName] = false;
    return obj;
  }, {});

  const [formState, setFormState] = useState({
    categories: categoryInitializer,
    year: '',
    match: ''
  });

  const [results, setResults] = useState(null);

  function handleCategoryClick(event) {
    const categoryButtonName = event.target.defaultValue;
    setFormState((prevState) => {
      return {
        ...prevState,
        categories: {
          ...prevState.categories,
          [categoryButtonName]: !prevState.categories[categoryButtonName]
        }
      };
    });
  }

  const categoryInputs = dataOptions.categories.map((category, i) => (
    <input
      key={i}
      className={`filterCategoryBtn ${
        formState.categories[category] && 'selected'
      }`}
      type="button"
      value={category}
      onClick={handleCategoryClick}
    />
  ));
  const yearOptions = dataOptions.year.map((availYear, i) => (
    <option key={i} value={availYear}>
      {availYear}
    </option>
  ));
  const matchOptions = dataOptions.match.map((availMatch, i) => (
    <option key={i} value={availMatch}>
      {availMatch}
    </option>
  ));

  async function handleSubmit(event) {
    event.preventDefault();
    const { data } = await requestApi('post', `/questions`, formState);
    setResults(data.questions);
  }

  function handleChange(event) {
    console.log(event.target.value);
    setFormState((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value
      };
    });
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <h2>Search for Questions:</h2>
        <p>Filter by category: {categoryInputs}</p>
        <label>
          Filter by year:{' '}
          <select name="year" onChange={handleChange}>
            <option value="">Year</option>
            {yearOptions}
          </select>
        </label>
        <label>
          Filter by match:{' '}
          <select name="match" onChange={handleChange}>
            <option value="">Match</option>
            {matchOptions}
          </select>
        </label>
        <button>Get Practice Questions</button>
      </form>
      <QuestionFeed questions={results} />
    </React.Fragment>
  );
}

export default FilterOptions;
