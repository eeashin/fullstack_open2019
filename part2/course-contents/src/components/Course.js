import React from "react";

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);

const Content = ({ parts }) =>
  parts.map(part => (
    <Part key={part.name} part={part.name} exercises={part.exercises} />
  ));

const Exercise = ({ allExe }) => {
  const allExercises = allExe.reduce((sum, count) => {
    console.log("what is happening", sum, count);
    return sum + count.exercises;
  }, 0);
  return (
    <p>
      <strong>Total of {allExercises} exercises</strong>
    </p>
  );
};
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Exercise allExe={course.parts} />
    </div>
  );
};
export default Course;
 