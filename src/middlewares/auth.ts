import { env } from "@/env"
import { NextFunction, Request, Response } from "express"
import { JwtPayload, verify } from "jsonwebtoken"
import AppError from "@/errors/AppError"

// Middleware para verificar autenticação
export function verifyAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers

  if (!authorization) {
    return next(new AppError("Token not found", 401))
  }

  const token = authorization.replace("Bearer ", "").trim()

  try {
    if (!env.SECRET_JWT) {
      return next(new AppError("JWT secret not configured", 500))
    }

    const { id } = verify(token, env.SECRET_JWT) as JwtPayload

    if (!id) {
      throw new AppError("Invalid Token", 401)
    }

    return next()
  } catch (error) {
    next(new AppError("Invalid Token", 401))
  }
}

// Middleware para verificar permissões
export function verifyPermission(permitedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization) {
      return next(new AppError("Token not found", 401))
    }

    const token = authorization.replace("Bearer ", "").trim()

    try {
      if (!env.SECRET_JWT) {
        return next(new AppError("JWT secret not configured", 500))
      }

      const { role } = verify(token, env.SECRET_JWT) as JwtPayload

      if (!permitedRoles.includes(role)) {
        throw new AppError("Unauthorized", 403)
      }

      return next()
    } catch (error) {
      next(new AppError("Invalid Token", 401))
    }
  }
}
