const Header = (props) => {
  const { course } = props;
  return <h1> {course} </h1>;
};

const Section = (props) => {
  const { name, exercises } = props;
  return (
    <p>
      <b>{name}: </b>
      {exercises}
    </p>
  );
};

const Content = (props) => {
  const { parts } = props;
  return (
    <div>
      {parts.map(({ name, exercises }) => {
        return <Section key={name} name={name} exercises={exercises} />;
      })}
    </div>
  );
};

const Total = (props) => {
  const { total } = props;
  return (
    <p>
      <b> Number of exercises:</b> {total}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";

  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };

  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };

  const part3 = { name: "State of a component", exercises: 14 };

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
};

export default App;
