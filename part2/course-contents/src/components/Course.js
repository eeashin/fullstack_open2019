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

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};
export default Course;
