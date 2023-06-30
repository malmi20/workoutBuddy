const express = require('express')
const {
    getWorkouts,
    getWorkout, 
    createWorkout,
    deleteWorkout,
    updateWorkout} =  require('../controllers/workoutController')
const router = express.Router()
console.log(`test`);

//Get all workouts
router.get('/',getWorkouts)

//Get a single workout
router.get('/:id',getWorkout)

//Post a new workout
router.post('/', createWorkout)

//delete
router.delete('/:id',deleteWorkout)

//update
router.put('/:id',updateWorkout)





module.exports= router