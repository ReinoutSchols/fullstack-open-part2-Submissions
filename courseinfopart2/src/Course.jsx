/* 
2.1: Course information step6 (DONE) 
also had to change the way main.jsx renders app.
I got an error saying the ReactDOM.render method is not the best anymore for react 18.
2.2: Course information step7 (Done)
Show the sum
2.3*: Course information step8 (Done)
2.4: Course information step9 (Done)
2.5: separate module (Done)
*/

const Header = (props) => {
    console.log(props);
    return <h2>{props.course.name}</h2>;
  };


const Part = (props) => {
  console.log(props);
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

// Had to use the map method,this way I can add or remove parts.
const Content = (props) => {
    console.log(props);
    return (
      <>
        {props.parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </>
    );
  };

const Course = (props) => {
    const sumExercises = (parts) => {
    // reduce the parts by starting from 0 and adding each amount of exercises to the total sum
    return parts.reduce((sum, part) => sum + part.exercises, 0);
    };
    // I like to put logic like this out of the JSX. Looks cleaner to me. 
    // Anyway, I mapped over the course prop so I can add or remove courses. 
    // This way for each added course, this Course component gets rendered which uses the subcomponents Header and Content.
    const courselements = props.course.map((course) => (
        <div key={course.id}>
            <Header course={course}/>
            <Content parts={course.parts} />
            <strong>total of {sumExercises(course.parts)} exercises</strong>
        </div>
    ));
    return(
         <>
            <h1>Web development curriculum</h1>
            {courselements}
         </>
    );
};

export default Course;