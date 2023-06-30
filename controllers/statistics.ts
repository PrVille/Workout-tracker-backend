import express from "express"
import User from "../models/user"
import Workout from "../models/workout"

const router = express.Router()

router.get("/", async (_req, res) => {
  const users = await User.find({})
  const workouts = await Workout.find({})
  const liftCount = workouts
    .map((workout) =>
      workout.exercises
        .map((exercise) => exercise.sets.map((set) => set.reps))
        .flat()
    )
    .flat()
    .reduce((a, b) => a + b, 0)

    res.json({ userCount: users.length, workoutCount: workouts.length, liftCount })
})

export default router
