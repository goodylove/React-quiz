import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      console.log(question);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? question.points
            : state.points,
      };

    default:
      throw new Error("Unknown type ");
  }
}
function App() {
  const [{ status, questions, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // derived state
  const numberOfQuest = questions.length;

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((response) =>
        response
          .json()
          .then((res) => dispatch({ type: "dataReceived", payload: res }))
      )
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <>
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numberOfQuest={numberOfQuest} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Question
              currentQuestion={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />

            <NextButton dispatch={dispatch} />
          </>
        )}
      </Main>
    </>
  );
}

export default App;
