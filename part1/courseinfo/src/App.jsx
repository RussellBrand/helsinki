const Header = (props) => {
  const { course } = props;
  return <h1> {course} </h1>;
};

const Part = (props) => {
  const { part, exercises } = props;
  return (
    <p>
      <b>{part}: </b>
      {exercises}
    </p>
  );
};

const Content = (props) => {
  const { part1, exercises1, part2, exercises2, part3, exercises3 } = props;
  return (
    <>
      <Part part={part1} exercises={exercises1} />
      <Part part={part2} exercises={exercises2} />
      <Part part={part3} exercises={exercises3} />
    </>
  );
};
const Total = (props) => {
  const { total } = props;
  return (
    <p>
      <h2>
        {" "}
        <b> Number of exercises:</b> {total}
      </h2>
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
