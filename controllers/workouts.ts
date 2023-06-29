import Workout from "../models/workout"
import express from "express"
import * as types from "../types"

const router = express.Router()

router.get("/", async (req, res) => {
  const user = (req as types.RequestWithUser).user

  const workouts = await Workout.find({
    user: user.id,
  }).populate("exercises._exercise")

  res.json(workouts)
})

router.post("/", async (req, res) => {
  const user = (req as types.RequestWithUser).user

  // TODO: parse body to workout

  const newWorkout = await Workout.create({
    ...req.body,
    user: user.id,
  })

  const newPopulatedWorkout = await Workout.findById(newWorkout.id).populate(
    "exercises._exercise"
  )

  res.json(newPopulatedWorkout)
})

router.put("/:id", async (req, res) => {
  const user = (req as unknown as types.RequestWithUser).user

  const workoutToUpdate = await Workout.findById(req.params.id)

  if (!workoutToUpdate) {
    return res.status(404).json({
      error: "Workout not found",
    })
  }

  if (user.id !== workoutToUpdate.user.toString()) {
    return res.status(401).json({
      error: "Cannot edit an exercise that is not yours!",
    })
  }

  // TODO: parse body to workout

  const updatedWorkout = await Workout.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  ).populate("exercises._exercise")

  res.json(updatedWorkout)
})

router.delete("/:id", async (req, res) => {
  const user = (req as unknown as types.RequestWithUser).user

  const workoutToDelete = await Workout.findById(req.params.id)

  if (!workoutToDelete) {
    return res.status(404).json({
      error: "Workout not found",
    })
  }

  if (user.id !== workoutToDelete.user.toString()) {
    return res.status(401).json({
      error: "Cannot delete a workout that is not yours!",
    })
  }

  await workoutToDelete.deleteOne()
  res.json(workoutToDelete)
})

export default router
