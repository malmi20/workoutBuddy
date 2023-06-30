import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import { useContext, useState } from "react"
import axios from "axios";

const WorkoutForm = ()=>{
    const {dispatch} = useWorkoutContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] =useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async(e)=>{
        e.preventDefault() //prevent refesh the code

        try {
            const workout ={title,load,reps}
        
            const response = await axios.post('http://localhost:4000/api/workoutRoutes',workout)


            if(response.status === 200){
                setTitle('')
                setLoad('')
                setReps('')
                setError(null)
                setEmptyFields([])
                dispatch({type:'CREATE_WORKOUT', payload:response.data})
                console.log("workout added successfully", response.data)
            }
        } catch (error) {
            setError(error.response.data.error)
            setEmptyFields(error.response.data.emptyFields)
        }
    }

    return(


        <form className="create" onSubmit={handleSubmit}>
            <h3>Add New Workout</h3>

            <label>Exercise Title:</label>
            <input 
               type="text"
               onChange={(e)=> setTitle(e.target.value)}
               value={title}
               className = {emptyFields.includes('title')? 'error': ''}
            />

            <label>Load: (in Kg)</label>
            <input
               type="number"
               onChange={(e)=> setLoad(e.target.value)}
               value={load}
               className = {emptyFields.includes('load')? 'error': ''}
            />

            <label>Reps: </label>
            <input
               type="number"
               onChange={(e)=> setReps(e.target.value)}
               value={reps}
               className = {emptyFields.includes('reps')? 'error': ''}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>

    )
}

export default WorkoutForm