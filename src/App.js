import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
  questions: [],
  error: null,
  state: "loading",
};

function reducer(state, action) {
  switch (action.type) {
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function (props) {
    fetch("http://localhost:8000/questions")
      .then((response) => response.json().then((res) => console.log(res)))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <>
      <Header />

      <Main>
        <p>1/5</p>
        <p>Questions</p>
      </Main>
    </>
  );
}

export default App;
