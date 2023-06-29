import { Schema, model } from "mongoose"
import Workout from "./workout"
import * as types from "../types"

const schema = new Schema<types.ExerciseModel>({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  videoId: {
    type: String,
  },
  muscleGroups: [
    {
      type: String,
      enum: Object.values(types.MuscleGroup),
      required: true,
    },
  ],
  equipment: {
    type: String,
    enum: Object.values(types.Equipment),
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(types.ExerciseType),
    required: true,
  },
  bodyweightFactor: {
    type: Number,
    default: 100,
    min: 0,
    max: 100,
  },
})

schema.set("toJSON", {
  virtuals: true,
})

schema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const exercise = JSON.parse(JSON.stringify(this)) as types.ExerciseModel

    // Remove deleted exercise from workouts
    await Workout.updateMany(
      { "exercises._exercise": exercise.id },
      {
        $pull: {
          exercises: { _exercise: exercise.id },
        },
      }
    )

    // Delete workouts with no exercises
    await Workout.deleteMany({
      "exercises.0": { $exists: false },
    })

    next()
  }
)

const Exercise = model<types.ExerciseModel>("Exercise", schema)

export default Exercise
