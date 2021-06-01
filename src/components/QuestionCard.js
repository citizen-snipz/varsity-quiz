import React from "react"

function QuestionCard(props) {
  //Make color-coded tags display at bottom of card
  return (
    <div>
      <h3>Question: {props.question}</h3>
      <h3>Answer: {props.answer}</h3>
      <h3>{props.bonus && `Bonus Question:  ${props.bonus}`}</h3>
      {/* todo: Make color-coded tags display at bottom of card */}

      <h4>Tags: {props.categories}</h4>
    </div>
  )
}

export default QuestionCard
