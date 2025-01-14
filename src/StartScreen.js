import React from "react";

export default function StartScreen({ numberOfQuest }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numberOfQuest} question to test your React mastery</h3>
      <button className="btn btn-ui"> Let's Start</button>
    </div>
  );
}
