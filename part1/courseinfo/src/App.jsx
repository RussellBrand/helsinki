const Header = (prop) => {
  const { course } = prop;
  return <h1> {course} </h1>;
};
const Content = (prop) => {
  const { part1, exercises1, part2, exercises2, part3, exercises3 } = prop;
  return (
    <>
      <p>
        <b>{part1} </b>
        {exercises1}
      </p>
      <p>
        <b>{part2}</b> {exercises2}
      </p>
      <p>
        <b>{part3}</b> {exercises3}
      </p>
    </>
  );
};
const Total = (prop) => {
  const { total } = prop;
  return (
    <p>
      <b> Number of exercises</b> {total}{" "}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
