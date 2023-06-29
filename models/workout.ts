import { Schema, model } from "mongoose"

import * as types from "../types"

const schema = new Schema<types.WorkoutModel>(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notes: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      default: 0,
    },
    exercises: [
      {
        _exercise: {
          type: Schema.Types.ObjectId,
          ref: "Exercise",
          required: true,
        },
        notes: {
          type: String,
        },
        sets: [
          {
            type: {
              type: String,
              enum: ["Warmup", "Working", "AMRAP"],
              required: true,
            },
            reps: {
              type: Number,
              required: true,
            },
            weight: {
              type: Number,
              required: true,
            },
            actualWeight: {
              type: Number,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
)

schema.set("toJSON", {
  virtuals: true,
})

const Workout = model<types.WorkoutModel>("Workout", schema)

export default Workout
