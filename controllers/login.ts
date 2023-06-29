import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import express from "express"
import User from "../models/user"
import { parseCredentials } from "../typeParsers"
import { SECRET } from "../util/config"

const router = express.Router()

router.post("/", async (req, res) => {
  const { email, password } = parseCredentials(req.body)

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(401).json({
      error: "Invalid email",
    })
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    return res.status(401).json({
      error: "Invalid password",
    })
  }

  const userForToken = {
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET, {
    expiresIn: 60 * 60 * 24 * 365,
  })

  res.json({
    token,
    username: user.username,
    email: user.email,
    id: user.id,
    measurements: user.measurements,
  })
})

export default router
