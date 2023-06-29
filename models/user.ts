import { Schema, model } from "mongoose"
import * as types from "../types"

const schema = new Schema<types.UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    measurements: {
      bodyweight: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
)

schema.set("toJSON", {
  virtuals: true,
})

const User = model<types.UserModel>("User", schema)

export default User
