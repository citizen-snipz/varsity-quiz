import React from "react"
import QuestionCard from "./QuestionCard"

function QuestionFeed({ questions }) {
  return (
    <React.Fragment>
      {questions.map((question, i) => (
        <QuestionCard key={question._id} {...question} />
      ))}
    </React.Fragment>
  )
}

export default QuestionFeed
