import "./App.css"
import Header from "./components/Header"
import QuestionCard from "./components/QuestionCard"
import Footer from "./components/Footer"
import { useState, useCallback, useEffect } from "react"
import AddQuestionForm from "./components/AddQuestionForm"
import { BrowserRouter, Switch, Route, Link, NavLink } from "react-router-dom"
import axios from "axios"
import QuestionFeed from "./components/QuestionFeed"

function App() {
  const [results, setResults] = useState(null)

  async function requestApi(method, path, body = {}) {
    const data = await axios[method](
      `https://varsity-quiz-api.herokuapp.com${path}`,
      body
    )
    console.log(data)
    return data.data
  }

  useEffect(() => {
    async function getWholeFeed() {
      const questions = await requestApi("get", "/questions")
      setResults(questions)
    }
    getWholeFeed()
  }, [])
  // const questionList = questionsDB.map(question => <QuestionCard key={question.id} />)
  return (
    <BrowserRouter>
      <div className="App">
        <Header>
          <ul>
            <li>
              <NavLink to="/">Login</NavLink>
            </li>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/feed">Feed</NavLink>
            </li>
            <li>
              <NavLink to="/create">Add Question</NavLink>
            </li>
          </ul>
        </Header>
        <Switch>
          <Route exact path="/">
            <h2>Welcome to Varsity Quiz App!</h2>
            <p>To get started, click the button below</p>
            <Link to="/feed">Start Practice</Link>
          </Route>
          <Route path="/feed">
            {results && <QuestionFeed questions={results.questions} />}
          </Route>
          <Route path="/create">
            <AddQuestionForm />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
