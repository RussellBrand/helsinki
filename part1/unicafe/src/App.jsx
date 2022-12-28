import { useState } from "react";

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1> Give Feedback </h1>
      <Button text="good" updater={setGood} />
      <Button text="bad" updater={setBad} />
      <Button text="neutral" updater={setNeutral} />

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

      <StatisticLine text="good" value={good} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="all" value={howMany} />
      <StatisticLine
        text="average"
        value={howMany ? (good - bad) / howMany : "no votes yet"}
      />
      <StatisticLine
        text="positive"
        value={howMany ? 100 * (good / howMany) + " %" : "no votes yet"}
      />
    </>
  );
};

const Button = (props) => {
  const { text, updater } = props;
  return (
    <button
      onClick={() => {
        updater((x) => x + 1);
      }}
    >
      {text}
    </button>
  );
};

const StatisticLine = (props) => {
  const { text, value } = props;
  return (
    <>
      <b> {text} :</b> {value} <br />
    </>
  );
};
