const Header = (props) => {
  const { course } = props;
  return <h1 style={{ color: "red" }}> {course} </h1>;
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
      {parts.map(({ id, name, exercises }) => {
        return <Section key={id} name={name} exercises={exercises} />;
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

const Courses = (props) => {
  const { courses, curriculum } = props;
  return (
    <div>
      <h1>{curriculum} </h1>
      {courses.map((course) => {
        return <Course key={course.id} course={course} />;
      })}
    </div>
  );
};

const Course = (props) => {
  const { course } = props;
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

export default Courses;
