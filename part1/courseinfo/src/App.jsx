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
  const course = {
    name: "Half Stack application development",

    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },

      {
        name: "Using props to pass data",
        exercises: 7,
      },

      { name: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={sum(course.parts)} />
    </div>
  );
};

function sum(parts) {
  return parts.map(({ exercises }) => exercises).reduce((a, b) => a + b);
}

export default App;
