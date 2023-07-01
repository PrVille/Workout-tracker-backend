import express from "express"
import cors from "cors"
import 'express-async-errors'

import { PORT } from "./util/config"
import { connectToDatabase } from "./util/db"
import { userExtractor } from "./util/middleware"

import exercisesRouter from "./controllers/exercises"
import workoutsRouter from "./controllers/workouts"
import statisticsRouter from "./controllers/statistics"
import usersRouter from "./controllers/users"
import loginRouter from "./controllers/login"
import cronRouter from "./controllers/cron"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/ping", (_req, res) => {
  res.send("pong")
})

app.use("/api/exercises", userExtractor, exercisesRouter)
app.use("/api/workouts", userExtractor, workoutsRouter)
app.use("/api/statistics", statisticsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use("/api/cron", cronRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })
}

start()

export default app
