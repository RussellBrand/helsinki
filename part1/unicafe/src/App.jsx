import { useState } from "react";

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1> Give Feedback </h1>
      <button
        onClick={() => {
          setGood((x) => x + 1);
        }}
      >
        good
      </button>

      <button
        onClick={() => {
          setBad((x) => x + 1);
        }}
      >
        bad
      </button>

      <button
        onClick={() => {
          setNeutral((x) => x + 1);
        }}
      >
        neutral
      </button>

      <Stats good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;

const Stats = (props) => {
  const { good, bad, neutral } = props;
  const howMany = good + bad + neutral;

  if (!howMany) {
    return (
      <>
        {" "}
        <h1> Stats </h1>
        <p>No votes cast yet</p>
      </>
    );
  }

  return (
    <>
      <h1> Stats </h1>

      <p> good: {good} </p>
      <p> bad: {bad} </p>
      <p> neutral: {neutral} </p>
      <p> all: {howMany} </p>
      <p> average: {howMany ? (good - bad) / howMany : "no votes yet"} </p>
      <p>
        positive: {howMany ? 100 * (good / howMany) + " %" : "no votes yet"}
      </p>
    </>
  );
};
