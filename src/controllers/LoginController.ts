import { Request, Response, NextFunction } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"
import AppError from "@/errors/AppError"
import { env } from "@/env"
import { LoginSchema } from "@/schemas/LoginSchema"

class LoginController {
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = LoginSchema.parse(req.body)

      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        throw new AppError("User not found", 404)
      }

      const passwordMatch = bcrypt.compareSync(password, user.password)

      if (!passwordMatch) {
        throw new AppError("Invalid credentials", 401)
      }

      const payload = { id: user.id, name: user.name, role: user.role }

      if (!env.SECRET_JWT) {
        throw new AppError("Internal server error", 500)
      }

      const token = jwt.sign(payload, env.SECRET_JWT, {
        expiresIn: "1h",
      })

      return res.status(200).json({ data: payload, token })
    } catch (error) {
      next(error)
    }
  }
}

export default LoginController
