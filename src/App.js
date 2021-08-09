import './App.css';
import Header from './components/Header';
import QuestionCard from './components/QuestionCard';
import Footer from './components/Footer';
import { useState, useCallback, useEffect } from 'react';
import AddQuestionForm from './components/AddQuestionForm';
import { BrowserRouter, Switch, Route, Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import QuestionFeed from './components/QuestionFeed';
import Home from './components/Home';
import FilterOptions from './components/FilterOptions';

function App() {
  const [questions, setQuestions] = useState(null);
  const [dataOptions, setDataOptions] = useState(null);

  async function requestApi(httpMethod, path, body = {}) {
    const data = await axios[httpMethod](
      `https://varsity-quiz-api.herokuapp.com${path}`,
      body
    );
    console.log(data);
    return data;
  }

  useEffect(() => {
    async function getWholeFeed() {
      const { data } = await requestApi('post', '/questions');
      setQuestions(data.questions);
    }
    getWholeFeed();
  }, []);

  useEffect(() => {
    async function getDataOptions() {
      const { data } = await requestApi('get', '/dataOptions');
      setDataOptions(data);
    }
    getDataOptions();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header>
          <NavLink to="/">Login</NavLink>

          <NavLink to="/">Home</NavLink>

          <NavLink to="/feed">Feed</NavLink>

          <NavLink to="/create">Add Question</NavLink>
        </Header>
        <Switch>
          <Route exact path="/">
            <Home />
            {dataOptions && (
              <FilterOptions
                requestApi={requestApi}
                dataOptions={dataOptions}
              />
            )}
          </Route>
          <Route path="/feed">
            {questions && <QuestionFeed questions={questions} />}
          </Route>
          <Route path="/create">
            {dataOptions && (
              <AddQuestionForm
                requestApi={requestApi}
                categories={dataOptions.categories}
              />
            )}
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
