import "./App.css"
import Header from "./components/Header"
import QuestionCard from "./components/QuestionCard"
import Footer from "./components/Footer"
import questions from "./questionsDB"
import React from "react"

class App extends React.Component {
  constructor() {
    super()
  }
  render() {
    // const questionList = questionsDB.map(question => <QuestionCard key={question.id} />)
    return (
      <div className="App">
        <Header />
        <QuestionCard />
        <Footer />
      </div>
    )
  }
}

export default App
