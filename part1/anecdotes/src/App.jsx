// import React from "https://deno.land/x/react_deno@17.0.2/react.ts";
// import ReactDOM from "https://deno.land/x/react_deno@17.0.2/dom.ts";
// import ReactDOMServer from "https://deno.land/x/react_deno@17.0.2/dom_server.ts";

import { useState } from "react";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const [maxVotes, setMaxVotes] = useState(0);
  const [favorite, setFavorite] = useState(0);
  const nextQuote = () => {
    setSelected(getRandomInt(anecdotes.length));
  };
  const voteForMe = () => {
    let newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    const theMaxVotes = Math.max(...newVotes);
    setMaxVotes(theMaxVotes);
    setFavorite(newVotes.findIndex((x) => x === theMaxVotes));
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} vote(s)</p>
      <button onClick={nextQuote}>Next Quote</button>
      <button onClick={voteForMe}>Vote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[favorite]}</p>
      <p>has {votes[favorite]} vote(s)</p>
    </div>
  );
};

export default App;
