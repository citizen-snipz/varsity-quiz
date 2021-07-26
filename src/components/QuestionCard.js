import React from "react"

function QuestionCard(props) {
  return (
    <div className="card">
      <h3>Question: {props.question}</h3>
      <h3 className="answer">Answer: {props.answer}</h3>
      <h3>{props.bonus && `Bonus Question:  ${props.bonus}`}</h3>
      {/* todo: Make color-coded tags display at bottom of card */}

      <h4>Tags:</h4>
      <ul className="tagsList">
        {props.categories.map((tag) => {
          return (
            <li key={tag} className={tag}>
              {tag}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default QuestionCard
