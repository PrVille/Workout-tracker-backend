import bcrypt from "bcrypt"
import express from "express"
import User from "../models/user"
import Workout from "../models/workout"
import Exercise from "../models/exercise"
import * as types from "../types"

import { userExtractor } from "../util/middleware"
import { SEED_USER_ID, DEMO_USER_ID } from "../util/config"

const router = express.Router()

router.get("/username/:username", async (req, res) => {
  const existingUser = await User.findOne(
    { username: req.params.username },
    { username: 1 }
  )

  res.json(existingUser)
})

router.get("/email/:email", async (req, res) => {
  const existingUser = await User.findOne(
    { email: req.params.email },
    { email: 1 }
  )

  res.json(existingUser)
})

router.post("/", async (req, res) => {
  // TODO: parse body to new user, validate pw
  const { email, username, password } = req.body

  const existingEmail = await User.findOne({ email })

  if (existingEmail) {
    return res.status(400).json({
      error: "Email already exists!",
    })
  }

  const existingUsername = await User.findOne({ username })

  if (existingUsername) {
    return res.status(400).json({
      error: "Username already exists!",
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = await User.create({
    email,
    username,
    passwordHash,
  })

  const createdUser = await User.findById(newUser.id, { passwordHash: 0 })

  res.json(createdUser)
})

router.put("/:id", userExtractor, async (req, res) => {
  const user = (req as unknown as types.RequestWithUser).user

  if (user.id !== req.params.id) {
    return res.status(401).json({
      error: "Cannot update other user!",
    })
  }

  if (req.params.id === SEED_USER_ID) {
    return res.status(401).json({
      error: "Trying to edit seed user!",
    })
  }

  if (req.params.id === DEMO_USER_ID) {
    return res.status(401).json({
      error: "Cannot edit demo user!",
    })
  }

  // TODO: parse body to user

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: "query",
    select: { passwordHash: 0 },
  })

  if (!updatedUser) {
    return res.status(404).json({
      error: "User not found",
    })
  }

  res.json({ ...updatedUser.toJSON(), token: req.body.token })
})

router.put("/:id/password", userExtractor, async (req, res) => {
  const user = (req as unknown as types.RequestWithUser).user

  if (user.id !== req.params.id) {
    return res.status(401).json({
      error: "Cannot update other user!",
    })
  }

  if (req.params.id === SEED_USER_ID) {
    return res.status(401).json({
      error: "Trying to edit seed user!",
    })
  }

  if (req.params.id === DEMO_USER_ID) {
    return res.status(401).json({
      error: "Cannot edit demo user!",
    })
  }

  // TODO: parse pw

  const newPassword = req.body.password

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(newPassword, saltRounds)

  await User.findByIdAndUpdate(
    req.params.id,
    { passwordHash },
    {
      new: true,
      runValidators: true,
      context: "query",
      select: { passwordHash: 0 },
    }
  )

  res.json({ message: "Success" })
})

router.delete("/:id", userExtractor, async (req, res) => {
  const user = (req as unknown as types.RequestWithUser).user

  if (user.id !== req.params.id) {
    return res.status(401).json({
      error: "Cannot delete other user!",
    })
  }

  if (req.params.id === SEED_USER_ID) {
    return res.status(401).json({
      error: "Trying to remove seed user",
    })
  }

  if (req.params.id === DEMO_USER_ID) {
    return res.status(401).json({
      error: "Cannot delete demo user!",
    })
  }

  const userToDelete = await User.findById(req.params.id)

  if (!userToDelete) {
    return res.status(404).json({
      error: "User not found",
    })
  }

  await Workout.deleteMany({ user: userToDelete.id })
  await Exercise.deleteMany({ user: userToDelete.id })
  await userToDelete.deleteOne()

  res.json(userToDelete)
})

export default router