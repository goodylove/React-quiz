import React from "react";
import Options from "./Options";

export default function Question({currentQuestion, answer, dispatch }) {
  return <div>
    <h4>Question</h4>
    <h3>{currentQuestion.question}</h3>
    <Options  currentQuestion={currentQuestion} dispatch={dispatch} answer={answer}/>
  </div>;
}




