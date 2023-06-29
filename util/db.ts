import { connect } from "mongoose"
import { DATABASE_URL } from "./config"

const connectToDatabase = async () => {
  connect(DATABASE_URL)
    .then(() => {
      console.log("connected to MongoDB")
    })
    .catch((error) => {
      console.log("error connection to MongoDB:", error.message)
    })
}



export { connectToDatabase }
