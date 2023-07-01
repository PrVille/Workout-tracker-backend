import express from "express"
import { refreshDemoAccount } from "../util/initializeDb"

const router = express.Router()

router.get("/", async (_req, res) => {
  try {
    await refreshDemoAccount()
    console.log("refreshDemoAccount")
    res.status(200).send("success")
  } catch (error) {
    console.log(error)
    res.status(400)
  }
})

export default router
