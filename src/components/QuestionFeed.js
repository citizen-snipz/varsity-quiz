import React from "react"
import QuestionCard from "./QuestionCard"

function QuestionFeed({ questions }) {
  return (
    <React.Fragment>
      {questions.map((question) => (
        <QuestionCard key={question.id} {...question} />
      ))}
    </React.Fragment>
  )
}

export default QuestionFeed
