import { Request } from "express"
import { Types } from "mongoose"
import { JwtPayload } from "jsonwebtoken"

export interface RequestWithUser extends Request {
  user: SafeUser
}

export interface UserForToken {
  id: string
}

export type JwtPayloadWithUserToken = JwtPayload & UserForToken

export interface Measurements {
  bodyweight: number
}

export interface UserModel {
  id: string
  email: string
  username: string
  passwordHash: string
  measurements: Measurements
}

export type SafeUser = Omit<UserModel, "passwordHash">

export interface Credentials {
  password: string
  email: string
}

export enum ExerciseType {
  repsAndKg = "Reps&Kg",
  repsAndBw = "Reps&Bw",
  repsAndPlusKg = "Reps&+Kg",
  repsAndMinusKg = "Reps&-Kg",
}

export enum Equipment {
  barbell = "Barbell",
  dumbbell = "Dumbbell",
  kettlebell = "Kettlebell",
  machine = "Machine",
  plate = "Plate",
  band = "Band",
  none = "None",
  other = "Other",
}

export enum MuscleGroup {
  chest = "Chest",
  delts = "Delts",
  quads = "Quads",
  glutes = "Glutes",
  hamstrings = "Hamstrings",
  upperBack = "Upper Back",
  lats = "Lats",
  biceps = "Biceps",
  triceps = "Triceps",
  calves = "Calves",
  abs = "Abs",
}

export interface ExerciseModel {
  id: string
  name: string
  user: Types.ObjectId
  videoId?: string
  muscleGroups: MuscleGroup[]
  equipment: Equipment
  type: ExerciseType
  bodyweightFactor: number
}

export interface FormExercise {
  name: string
  videoId?: string
  muscleGroups: MuscleGroup[]
  equipment: Equipment
  type: ExerciseType
  bodyweightFactor?: number
}

export enum SetType {
  warmup = "Warmup",
  working = "Working",
  amrap = "AMRAP",
}

export interface Set {
  type: SetType
  reps: number
  weight: number
  actualWeight: number
}

export interface WorkoutExercise {
  _exercise: Types.ObjectId
  notes: string
  sets: Set[]
}

export interface PopulatedWorkoutExercise {
  _exercise: ExerciseModel | null
  notes: string
  sets: Set[]
}

interface BaseWorkout {
  name: string
  notes: string
  date: Date
  id: string
  duration: number
  user: Types.ObjectId
}

export interface WorkoutModel extends BaseWorkout {
  exercises: WorkoutExercise[]
}

export interface PopulatedWorkout extends BaseWorkout {
  exercises: PopulatedWorkoutExercise[]
}
