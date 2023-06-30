import { useEffect, useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import axios from "axios";
//components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {

  const {workouts, dispatch} = useWorkoutContext()
 // const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await axios("http://localhost:4000/api/workoutRoutes");
      if (response.status === 200) {
       // setWorkouts(json);
       const json = response.data;//array of data
       dispatch({type: 'SET_WORKOUTS', payload: [...json]})
      }
    };
    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout=>(
            <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>

      <div><WorkoutForm/></div>
    </div>
  );
};

export default Home;
