
import {useWorkoutContext} from '../hooks/useWorkoutsContext'
import axios from "axios";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({workout})=>{

    const {dispatch} = useWorkoutContext()

    const handleClick = async ()=>{

        const response = await axios.delete('http://localhost:4000/api/workoutRoutes/' +workout._id)

        
        if(response.status === 200){
            dispatch({type: 'DELETE_WORKOUT', payload: {_id: workout._id}})

        }

    }

    return(
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong> Load(kg) :</strong>{workout.load}</p>
            <p><strong> Reps:</strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className='material-symbols-outlined'onClick={handleClick}>delete</span>
        </div>
    )

}

export default WorkoutDetails