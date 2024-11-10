import { NextFunction, Request, Response } from "express"
import { JwtPayload, verify } from "jsonwebtoken"

export function verifyAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: "Token not found" })
  }

  const token = authorization.replace("Bearer ", "").trim()

  try {
    if (!process.env.SECRET_JWT) {
      return res.status(500).json({ error: "JWT secret not configured" })
    }

    const { id } = verify(token, process.env.SECRET_JWT) as JwtPayload

    if (!id) {
      return res.status(401).json({ error: "Invalid Token" })
    }
    return next()
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" })
  }
}

export function verifyPermission(permitedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(401).json({ error: "Token not found" })
    }

    const token = authorization.replace("Bearer ", "").trim()

    try {
      if (!process.env.SECRET_JWT) {
        return res.status(500).json({ error: "JWT secret not configured" })
      }

      const { role } = verify(token, process.env.SECRET_JWT) as JwtPayload

      if (!permitedRoles.includes(role)) {
        return res.status(403).json({ error: "Unauthorized" })
      }
      return next()
    } catch (error) {
      return res.status(401).json({ error: "Invalid Token" })
    }
  }
}
