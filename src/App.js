import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";

const initialState = {
  questions: [],
  status: "loading",
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

    default:
      throw new Error("Unknown type ");
  }
}
function App() {
  const [{ status, questions }, dispatch] = useReducer(reducer, initialState);
  // deriverd state
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
        {status === "ready" && <StartScreen numberOfQuest={numberOfQuest} />}
      </Main>
    </>
  );
}

export default App;
