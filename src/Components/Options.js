import React from "react";

export default function Options({ currentQuestion, answer, dispatch }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {currentQuestion.options.map((option, index) => (
        <button
          className={`btn btn-option } ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === currentQuestion.correctOption
                ? "correct"
                : "wrong"
              : ""
          }  `}
          key={index}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
