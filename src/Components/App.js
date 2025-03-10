import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SEC_TIMER = 30;
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  totalPoints: 0,
  setTimeRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        setTimeRemaining: state.questions.length * SEC_TIMER,
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
      const isCorrect = action.payload === question.correctOption;
      // console.log(action.payload, question.correctOption, question.points);
      return {
        ...state,
        answer: action.payload,
        points: isCorrect ? question.points : 0,
        totalPoints: state.totalPoints + (isCorrect ? question.points : 0),
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case "restart":
      // return {
      //   ...state,
      //   status: "ready",
      //   index: 0,
      //   answer: null,
      //   points: 0,
      // };
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        setTimeRemaining: state.questions.length * SEC_TIMER,
      };

    case "tick":
      return {
        ...state,
        setTimeRemaining: state.setTimeRemaining - 1,
        status: state.setTimeRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Unknown type ");
  }
}
function App() {
  const [
    { status, questions, index, answer, points, totalPoints, setTimeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  // derived state
  const numberOfQuest = questions.length;
  const maxPoints = questions.reduce(function (prev, curr) {
    return prev + curr.points;
  }, 0);

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
            <Progress
              index={index}
              numberOfQuest={numberOfQuest}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
              maxPoints={maxPoints}
            />
            <Question
              currentQuestion={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer setTimeRemaining={setTimeRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numberOfQuestions={numberOfQuest}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            // points={points}
            maxPossiblePoints={maxPoints}
            dispatch={dispatch}
            totalPoints={totalPoints}
          />
        )}
      </Main>
    </>
  );
}

export default App;
