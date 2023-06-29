import { verify } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { SECRET } from "./config"
import * as types from "../types"
import User from "../models/user"

const userExtractor = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorization = request.get("authorization")

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const decodedToken = verify(
        authorization.substring(7),
        SECRET
      ) as types.JwtPayloadWithUserToken

      if (decodedToken) {
        ;(request as types.RequestWithUser).user = (await User.findById(
          decodedToken.id,
          { passwordHash: 0 }
        ))!
      }
    } catch (error) {
      return response.status(401).json({ error: "Token expired" })
    }
  }

  next()
}

export { userExtractor }
