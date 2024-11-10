import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

class LoginController {
  public async login(req: Request, res: Response) {
    const { email, password } = req.body
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }

      const passwordMatch = await bcrypt.compareSync(password, user.password)

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" })
      }

      const payload = { id: user.id, name: user.name, role: user.role }

      if (!process.env.SECRET_JWT) {
        return res.status(500).json({ error: "Internal server error" })
      }

      const token = jwt.sign(payload, process.env.SECRET_JWT, {
        expiresIn: "1h",
      })

      return res.status(200).json({ data: payload, token })
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
}

export default LoginController
