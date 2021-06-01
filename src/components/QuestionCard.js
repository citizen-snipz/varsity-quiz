import React from "react"
import questions from "../questionsDB"

function QuestionCard(props) {
  //Make color-coded tags display at bottom of card
  const tags = questions.map((question) => (
    <QuestionCard key={question.id} categories={question.categories} />
  ))
  return (
    <div>
      <h3>Question: {props.question}</h3>
      <h3>Answer: {props.answer}</h3>
      <h3>{props.bonus && `"Bonus Question: " ${props.bonus}`}</h3>
      <h4>Tags: {tags}</h4>
    </div>
  )
}

export default QuestionCard
