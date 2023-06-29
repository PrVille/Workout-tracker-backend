import { Secret } from "jsonwebtoken"
import "dotenv/config"

const DATABASE_URL = process.env.DATABASE_URL!
const SECRET: Secret = process.env.SECRET!
const PORT = process.env.PORT || 3001
const SEED_USER_ID = process.env.SEED_USER_ID!
const DEMO_USER_ID = process.env.DEMO_USER_ID!

export { DATABASE_URL, SECRET, PORT, SEED_USER_ID, DEMO_USER_ID }
