import { isString } from "./typeGuards"
import { Credentials } from "./types"

export const parseString = (value: unknown, what: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Value of ${what} incorrect: ${value}`)
  }

  return value
}

export const parseCredentials = (object: unknown): Credentials => {
  if (!object || typeof object !== "object") {
    throw new Error("Data missing or in wrong format")
  }

  if (!("email" in object)) throw new Error("type missing")
  if (!("password" in object)) throw new Error("date missing")

  const credentials = {
    email: parseString(object.email, "email"),
    password: parseString(object.password, "password"),
  }

  return credentials
}
