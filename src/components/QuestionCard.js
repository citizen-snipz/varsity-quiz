import React, { useState } from 'react';

function QuestionCard(props) {
  const [toggleAnswer, setToggleAnswer] = useState(false);

  return (
    <div className="card">
      <h3>Question: {props.question}</h3>
      <h3
        onClick={() => setToggleAnswer((prevState) => !prevState)}
        className={`answer ${!toggleAnswer && 'hidden'}`}
      >
        {toggleAnswer
          ? `Answer: ${props.answer}`
          : 'Click here to reveal the answer!'}
      </h3>
      <h3>{props.bonus && `Bonus Question:  ${props.bonus}`}</h3>
      {/* todo: Make color-coded tags display at bottom of card */}

      <h4>Tags:</h4>
      <ul className="tagsList">
        {props.categories.map((tag) => {
          return (
            <li key={tag} className={tag}>
              {tag}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default QuestionCard;
