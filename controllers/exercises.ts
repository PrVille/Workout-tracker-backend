import express from "express"
import Exercise from "../models/exercise"
import * as types from "../types"
import { SEED_USER_ID } from "../util/config"

const router = express.Router()

router.get("/", async (req, res) => {
  const user = (req as types.RequestWithUser).user

  const systemExercises = await Exercise.find({ user: SEED_USER_ID })
  const exercises = await Exercise.find({ user: user.id })

  res.json([...exercises, ...systemExercises])
})

router.post("/", async (req, res) => {
  const user = (req as types.RequestWithUser).user

  // TODO: parse body to exercise
  const newExercise = await Exercise.create({ ...req.body, user: user.id })

  res.json(newExercise)
})

router.put("/:id", async (req, res) => {
  const user = (req as unknown as types.RequestWithUser).user

  const exerciseToUpdate = await Exercise.findById(req.params.id)

  if (!exerciseToUpdate) {
    return res.status(404).json({
      error: "Exercise not found",
    })
  }

  if (exerciseToUpdate.user.toString() === SEED_USER_ID) {
    return res.status(401).json({
      error: "Trying to edit system exercise",
    })
  }

  if (user.id !== exerciseToUpdate.user.toString()) {
    return res.status(401).json({
      error: "Cannot edit an exercise that is not yours!",
    })
  }

  // TODO: parse body to exercise
  const updatedExercise = await Exercise.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true, context: "query" }
  )

  res.json(updatedExercise)
})

router.delete("/:id", async (req, res) => {
  const user = (req as unknown as types.RequestWithUser).user

  const exerciseToDelete = await Exercise.findById(req.params.id)

  if (!exerciseToDelete) {
    return res.status(404).json({
      error: "Exercise not found",
    })
  }

  if (exerciseToDelete.user.toString() === SEED_USER_ID) {
    return res.status(401).json({
      error: "Trying to remove system exercise",
    })
  }

  if (user.id !== exerciseToDelete.user.toString()) {
    return res.status(401).json({
      error: "Cannot delete an exercise that is not yours!", 
    })
  }

  await exerciseToDelete.deleteOne()

  res.json(exerciseToDelete)
})

export default router
