import "./App.css"
import Header from "./components/Header"
import QuestionCard from "./components/QuestionCard"
import Footer from "./components/Footer"
import React from "react"
import questions from "./questionsDB"
import AddQuestionForm from "./components/AddQuestionForm"

class App extends React.Component {
  render() {
    // const questionList = questionsDB.map(question => <QuestionCard key={question.id} />)
    return (
      <div className="App">
        <Header />
        {/* {questions.map((question) => (
          <QuestionCard key={question.id} {...question} />
        ))} */}
        <AddQuestionForm />
        <Footer />
      </div>
    )
  }
}

export default App
